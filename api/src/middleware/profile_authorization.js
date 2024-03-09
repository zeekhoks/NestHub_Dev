const bcrypt = require('bcrypt');
const userService = require('../services/user_service');
const profileService = require('../services/profile_service');
const {request, response} = require("express");

const profileExtractor = async(request, response, next) => {
    const user = request.user;
    const profile = await profileService.getProfileById(request.params.id);
}


module.exports = {
    userExtractor:userExtractor
}