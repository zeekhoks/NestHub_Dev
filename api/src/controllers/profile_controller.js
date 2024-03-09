const profileService = require('../services/profile_service');
const userService = require('../services/user_service');

const mongoose = require('mongoose');
const {request, response} = require("express");
const url = process.env.MONGODB_URI;

const connect = mongoose.createConnection(url, {useNewUrlParser: true, useUnifiedTopology: true});

let gfs;

connect.once('open', () => {
    // initialize stream
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "uploads"
    });
});
const getProfileBasedOnId = async (request, response) => {
    const key = request.params.id;
    try {
        const profile = await profileService.getProfileById(key);
        if (profile) {
            response.status(200).json(profile);
        } else {
            response.status(404).json({"errorMessage": "Profile cannot be found."});
        }
    } catch (error) {
        response.status(503).json({"errorMessage": "Service currently unavailable"});

    }
}

// The route for create profile => /profile/userid
const createProfile = async (request, response) => {
    const userId = request.params.id;
    const body = request.body;
    const addressFromBody = {
        street_name: body.address.street_name,
        apartment_number: body.address.apartment_number,
        city: body.address.city,
        state: body.address.state,
        zipcode: body.address.zipcode
    }
    try {
        const profile = await profileService.createProfile(userId,
            addressFromBody
            ,
            {
                first_name: body.first_name,
                last_name: body.last_name,
                address: addressFromBody,
                phone: body.phone,
                gender: body.gender,
                dob: body.dob,
                img_filename: "default"
            })
        response.status(201).json(profile);
    } catch (error) {
        console.log(error);
        response.status(503).json({"errorMessage": "Service currently unavailable"});
    }
}

const updateProfilePicture = async(request, response) => {
    const userId = request.params.id;
    const body = request.body;
    try {
        const user = await userService.getUserById(userId);
        const updatedProfilePicture = await profileService.updateProfilePicture(user.profile.profile_id, request.file.filename);
        if(updatedProfilePicture!==null){
            response.status(200).json({"message":"Profile picture updated!"});
        }
    } catch (error) {
        console.log(error);
        response.status(503).json({"errorMessage": "Service currently unavailable"});
    }
}

module.exports = {
    getProfileBasedOnId: getProfileBasedOnId,
    createProfile: createProfile,
    updateProfilePicture:updateProfilePicture
}