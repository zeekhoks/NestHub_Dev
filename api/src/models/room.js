const mongoose = require("mongoose")
const {Address} = require("./address");

const roomSchema = new mongoose.Schema({
    room_img : {
        data: Buffer,
        contentType: String
    },
    location: {
        type: 'Point',
        coordinates: [longitude, latitude]
    },
    room_type: {
        type: String,
        required: true,
    },
    rent: {
        type: Number,
        required: true
    },
    address: {
        type: Address.schema,
        required: true
    },
    distance_from_uni: {
        type: Number,
        required: true,
    },
    nearby_grocery_stores: {
        type: String,
        required: true
    },
    red_eye_accessibility: {
        type: Boolean,
        required: true,
    },
    transport_options:[
        {
            type: String,
            required: true,
        }
    ]

})

const transformJSON = (document, returnedObject) =>{
    delete returnedObject._id;
    delete returnedObject.__v;
}
roomSchema.set("toJSON", { transform: transformJSON });

const Room = mongoose.model("Room", roomSchema);

module.exports = {
    Room: Room
}


