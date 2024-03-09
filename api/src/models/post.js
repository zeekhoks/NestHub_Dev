const mongoose = require("mongoose")
const {User} = require("./user");

const postSchema = new mongoose.Schema({
    owner: {
        type: User,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    from_date: {
        type: Date,
        required: true
    },
    to_date: {
        type: Date,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true
    },
    details_link: {
        type: String,
        required: true
    },
    applications: [
        {
            type: User,
            required: true,
        }
    ]
})

const transformJSON = (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
}

postSchema.set("toJSON", {transform: transformJSON});

const Post = mongoose.model("Post", postSchema);

module.exports = {
    Post: Post
}