const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["text", "email", "number", "dropdown"]
        },
        options: {
            type: [String],
            required: false,
        },
        answer:
        {
            type: mongoose.Schema.Types.Mixed,
            required: false,
            default: ""
        }
    }
)
const formSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    fields: [questionSchema],
})
const Form = mongoose.model('Form', formSchema);
module.exports = Form;