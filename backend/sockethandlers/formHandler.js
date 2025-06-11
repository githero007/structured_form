
const FormHandler = (io, socket, client) => {
    let formID;
    socket.on("joinForm", ({ formId }) => {
        console.log('a client has joined');
        formID = formId
        socket.join(formId);
    });
    socket.on('editField', async (changes, index) => {
        console.log(changes);
        socket.to(formID).emit('realChanges', changes, index);
    });
    socket.on('lockField', async (questionId) => {
        const fieldStatus = await client.get(questionId);
        if (fieldStatus == null) {
            console.log('the socket has been locked already');
            socket.to(formID).emit("fieldlocked", 'the field has been locked by')//username)
            return;
        }
        const lock = await client.set(questionId, socket.id);
        await client.expire(questionId, 360);

    })
    socket.on('releaseField', async (questionId) => {
        try {
            await client.del(questionId);
            socket.to(formID).emit('unlock', questionId);
            return;
        } catch (error) {
            console.log('some error has occured');
        }
    })
}
module.exports = FormHandler;