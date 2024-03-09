const mongoose = require("mongoose")
const {Address} = require("./address");
const uuid = require('uuid');

const profileSchema = new mongoose.Schema({
    profile_id: {
        type: String,
        default: uuid.v4
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    address: {
        type: Address.schema,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    img_filename: {
        type: String,
        required: true
    }

})

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        default: uuid.v4
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false,
        required: true
    },
    is_profile_created: {
        type: Boolean,
        default: false,
        required: true
    },
    profile: {
        type: profileSchema,
        default: null,
        required: false
    },
})


const preferencesSchema = new mongoose.Schema({
    user: {
        type: userSchema,
        required: false
    },
    gender: {
        type: String,
        required: true
    },
    dietary_preferences: {
        type: String,
        required: true
    },
    smoking_preferences: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    room_type: {
        type: String,
        required: true
    }
})

preferencesSchema.index({location: '2dsphere'});
const transformJSON = (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
}

const transformUserJSON = (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
}

userSchema.methods.activate = function () {
    this.active = true;
}

profileSchema.set("toJSON", {transform: transformJSON});
userSchema.set("toJSON", {transform: transformUserJSON});
preferencesSchema.set("toJSON", {transform: transformJSON});

const Profile = mongoose.model("Profile", profileSchema);
const User = mongoose.model("User", userSchema);
const Preferences = mongoose.model("Preferences", preferencesSchema);

module.exports = {
    Profile: Profile,
    User: User,
    Preferences: Preferences
}
