const {User} = require('../models/user');


const getUserById = async (id) => {
    return await User.findOne({
        user_id: id
    })
}

const getUserByEmail = async (email) => {
    return await User.findOne({
        email: email
    })
}
const saveUser = async (userData) => {
    const user = new User({
        email: userData.email,
        password: userData.password
    });
    return await user.save();
}

const getUsers = async () => {
    return await User.find();
}

const updateUserPassword = async (userData, id) => {
    const user = await User.findOneAndUpdate({user_id: id}, {
        password: userData.password
    });
    return user;
}

const deleteUser = async (id) => {
    const deletedUser = await User.deleteOne({
        user_id: id
    })
    return deletedUser;
}


const updateUserActiveStatus = async (email) => {
    const user = await User.findOneAndUpdate({email: email}, {
        active: true
    });
    return user;
}

const updateProfileActiveStatus = async (email) => {
    const user = await User.findOneAndUpdate({email: email}, {
        is_profile_created: true
    });
    return user;
}

const isUserVerified = async (email) => {

    const verificationStatus = await User.findOne({
        email: email
    })
    return verificationStatus.active === true;
}

module.exports = {
    getUserById: getUserById,
    saveUser: saveUser,
    getUsers: getUsers,
    updateUserPassword: updateUserPassword,
    deleteUser: deleteUser,
    getUserByEmail: getUserByEmail,
    updateUserActiveStatus: updateUserActiveStatus,
    isUserVerified: isUserVerified,
    updateProfileActiveStatus: updateProfileActiveStatus
}