const {Profile, User} = require('../models/user');
const AddressService = require('../services/address_service');

const getProfileById = async (id) => {
    return await Profile.findOne({
        profile_id: id
    })
}

const createProfile = async (user_id, addressData, profileData) => {
   const address = await AddressService.createAddress(addressData);
   const profile = await new Profile({
       first_name: profileData.first_name,
       last_name: profileData.last_name,
       address: address,
       phone: profileData.phone,
       gender: profileData.gender,
       dob: profileData.dob,
       img_filename: profileData.img_filename
   });
   await profile.save();
   await User.findOneAndUpdate({user_id: user_id}, {profile: profile, is_profile_created: true});
   return profile;
}

const updateProfile = async (profileData, id, addressData) => {
    return await Profile.findOneAndUpdate({profile_id: id}, {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        address: addressData.address,
        phone: profileData.phone,
        gender: profileData.gender,
        dob: profileData.dob
    });
}

const updateProfilePicture = async(id, filename) =>{
    return await Profile.findOneAndUpdate({profile_id: id}, {
        img_filename: filename
    });
}



module.exports = {
    createProfile: createProfile,
    getProfileById: getProfileById,
    updateProfile: updateProfile,
    updateProfilePicture: updateProfilePicture
}