const mongoose = require('mongoose');
const uuid = require("uuid");


const addressSchema = new mongoose.Schema({
    address_id: {
        type: String,
        default: uuid.v4
    },
    street_name: {
        type: String,
        required: true
    },
    apartment_number: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    }
})

const transformJSON = (document, returnedObject) =>{
    delete returnedObject._id;
    delete returnedObject.__v;
}

addressSchema.set("toJSON", { transform: transformJSON });

const Address = mongoose.model("Address", addressSchema);
module.exports = {
    Address: Address
}
