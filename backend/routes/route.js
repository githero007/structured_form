const express = require('express');
const router = express.Router();
const Form = require('../models/form');

router.post('/createForm', async (req, res) => {
    try {
        const { userId, title, fields } = req.body;
        console.log(userId, title, fields);
        if (!userId || !title || !fields) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newForm = new Form({
            ownerId: userId,
            title,
            fields,
        });

        await newForm.save();

        res.status(201).json({ message: "Form created successfully", form: newForm.id });
    } catch (error) {
        console.log(error)
    }
});
router.post('/getform', async (req, res) => {
    try {
        const { formId } = req.body;
        console.log(formId);
        const form = await Form.findById(formId);
        if (!formId) {
            return res.status(400).json({ error: "looks like the room you requested has been deleted" });
        }
        res.status(201).json({ form: form });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }

})
router.post('/submit', async (req, res) => {
    const { formId, form } = req.body;
    console.log(req.body);

    try {
        const updatedForm = await Form.findOneAndReplace({ _id: formId }, form);
        if (!updatedForm) {
            return res.status(400).json({ error: " the form isnot available it has been deleted or expired" })
        }
        res.status(200).json({ success: "the form has been submitted and sent to Database" })
    } catch (error) {
        console.log(error, 'the following error has occured');
        res.status(500).json({ error: "the required operation couldnt be perfomed" })
    }

}
)
module.exports = router;
