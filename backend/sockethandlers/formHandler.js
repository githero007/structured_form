
const FormHandler = (io, socket, client) => {
    let formId;
    socket.on("joinForm", ({ formId }) => {
        socket.join(formId);
    });
    socket.on('editField', async (changes) => {
        socket.to(formId).emit('realChanges', changes);
    });
    socket.on('lockField', async (questionId) => {
        const fieldStatus = await client.get(questionId);
        if (fieldStatus == null) {
            console.log('the socket has been locked already');
            socket.to(formId).emit("fieldlocked", 'the field has been locked by')//username)
            return;
        }
        const lock = await client.set(questionId, socket.id);
        await client.expire(questionId, 360);

    })
    socket.on('releaseField', async (questionId) => {
        try {
            await client.del(questionId);
            socket.to(formId).emit('unlock', questionId);
            return;
        } catch (error) {
            console.log('some error has occured');
        }
    })
}
module.exports = FormHandler;