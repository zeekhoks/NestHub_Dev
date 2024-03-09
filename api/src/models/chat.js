const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    from_email: {
        type: String,
        required: true
    },
    to_email: {
        type: String,
        required: true
    },
    timestamp : {
        type: Date,
        default: Date.now()
    },
    message: {
        type: String,
        required: true
    }
})

const transformJSON = (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
}

chatSchema.set("toJSON", {transform: transformJSON});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = {
    Chat: Chat
}