const {VerificationEmail} = require('../models/verification_email');

const storeHash = async (email, hash) => {
    const verification = new VerificationEmail({
        verification_email: email,
        verification_hash: hash
    });
    return await verification.save();
}

const getHashByEmail = async(email) => {
    return await VerificationEmail.findOne({
        verification_email: email
    })
}

const deleteHash = async(email) => {
    return await VerificationEmail.deleteOne({
        verification_email: email
    });
}


module.exports = {
    getHashByEmail: getHashByEmail,
    storeHash: storeHash,
    deleteHash: deleteHash
}