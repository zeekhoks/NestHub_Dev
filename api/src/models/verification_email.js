const mongoose = require("mongoose")
const uuid = require("uuid");

const verificationEmailSchema = new mongoose.Schema({
    verification_email: {
        type: String,
        required: true
    },
    verification_hash: {
        type: String,
        required: true
    }
})

const transformJSON = (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
}

verificationEmailSchema.set("toJSON", {transform: transformJSON});

const VerificationEmail = mongoose.model("VerificationEmail", verificationEmailSchema);

module.exports = {
    VerificationEmail: VerificationEmail
}
