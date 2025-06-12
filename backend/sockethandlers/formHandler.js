
const FormHandler = (io, socket, client) => {
    let formID;
    socket.on("joinForm", ({ formId }) => {
        console.log('a client has joined');
        formID = formId
        socket.join(formId);
    });
    socket.on('editField', async (changes, index, questionId, userId) => {
        const isLocked = await client.get(questionId);
        console.log(isLocked);
        if (isLocked == null) {
            console.log(changes);
            socket.to(formID).emit('realChanges', changes, index);
            return;
        }
        else if (isLocked == userId) {
            socket.to(formID).emit('realChanges', changes, index);
        }
        else
            socket.to(formID).emit('lockenable', 'the field has been locked', questionId);

    });
    socket.on('lockField', async (questionId, userId) => {
        if (questionId == null) return ("some error has occured");
        console.log(questionId, 'questionId');
        console.log(userId, 'userId');
        const fieldStatus = await client.get(questionId);
        if (fieldStatus) {
            console.log('the socket has been locked already');
            socket.to(formID).emit("fieldlocked", 'the field has been locked by')//username)
            return;
        }
        const lock = await client.set(questionId, userId);
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