const {Address} = require('../models/address');
const {Profile} = require("../models/user");

const getAddressById = async (id) => {
    return await Address.findOne({
        address_id: id
    })
}

const createAddress = async (addressData) => {

    const address = new Address({
        street_name: addressData.street_name,
        apartment_number: addressData.apartment_number,
        city: addressData.city,
        state: addressData.state,
        zipcode: addressData.zipcode
    });
    return await address.save();
}

const updateAddress = async (addressData, id) => {

    const address = await Address.findOneAndUpdate({address_id: id}, {
        street_name: addressData.street_name,
        apartment_number: addressData.apartment_number,
        city: addressData.city,
        state: addressData.state,
        zipcode: addressData.zipcode
    });
    return address;
}

module.exports = {
    getAddressById: getAddressById,
    createAddress: createAddress,
    updateAddress: updateAddress
}