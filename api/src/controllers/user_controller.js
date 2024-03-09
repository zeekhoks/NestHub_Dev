const userService = require('../services/user_service');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const sha256 = require('js-sha256').sha256;
const emailVerificationService = require('../services/verification_email_service');
const emailController = require('../controllers/email_controller');
require('dotenv').config();

const stringHashingFunction = (inputString) => {
    return sha256(inputString);
}
const verificationHandler = async (request, response) => {
    console.log("verification handler");
    const email = request.query.email;
    const hash = request.query.token;
    try{
        const verificationIntermediate = await emailVerificationService.getHashByEmail(email);
        if(verificationIntermediate && verificationIntermediate.verification_hash === hash){
            await userService.updateUserActiveStatus(email);
            await emailVerificationService.deleteHash(verificationIntermediate.verification_email);
            response.status(200).json({"message":"Verification successful!"});
        } else {
            response.status(400).json({"errorMessage":"Bad request, please try again."});
        }
    }catch (error){
        console.log(error);
        response.status(503).json({"errorMessage": "Service currently unavailable"});
    }
}
const getUserById = async (request, response) => {
    const key = request.params.id;
    try {
        const data = await userService.getUserById(key);
        if (data) {
            response.status(200).json(data);
        } else {
            response.status(404).json({"errorMessage": "User cannot be found"});
        }
    } catch (error) {
        response.status(503).json({"errorMessage": "Service currently unavailable"});

    }
}

const getAllUsers = async (request, response) => {
    try {
        const data = await userService.getUsers();
        response.status(200).json(data);
    } catch (error) {
        response.status(503).json({"errorMessage": "Service currently unavailable"});
    }
}
const createUser = async (request, response) => {
    const body = request.body;

    try {
        const userExists = await userService.getUserByEmail(body.email);
        console.log(userExists);
        if (userExists) {
            response.status(400).json({"errorMessage": "User already exists"});
        } else {
            bcrypt.hash(body.password, saltRounds, async function (err, hash) {
                const data = await userService.saveUser({
                    email: body.email,
                    password: hash
                });

                const responseData = JSON.parse(JSON.stringify(data));
                const verificationString = process.env.RANDOM_STRING + responseData.email + responseData.user_id;
                const hashedString = stringHashingFunction(verificationString);
                console.log(hashedString);
                const verificationEmail = await emailVerificationService.storeHash(responseData.email, hashedString);
                const url = process.env.VERIFICATION_URL + "?email=" + responseData.email
                    + "&uuid=" + responseData.user_id + "&token=" + hashedString;
                const mailOptions = {
                    from: "khokawalazainab@gmail.com",
                    to: responseData.email,
                    subject: "NestHub Verification Email",
                    text: "Please click on the following link to verify your email - " + url
                }
                emailController.sendEmail(mailOptions);
                response.status(201).json(data);
            })
            // const responseData = JSON.parse(JSON.stringify(data));
            // delete responseData.password;
            // console.log(responseData);
        }
    } catch (error) {
        console.log(error);
        response.status(503).json({"errorMessage": "Service currently unavailable"});
    }
}

const deleteUserEntry = async (request, response) => {
    const key = request.params.id;
    try {
        const userExists = await userService.getUserById(key);
        if (userExists) {
            const data = await userService.deleteUser(key);
            response.status(204).json(data);
        } else {
            response.status(404).json({"errorMessage": "User cannot be found"});
        }
    } catch (error) {
        console.log(error);
        response.status(503).json({"errorMessage": "Service currently unavailable"});
    }
}

const updateUserEntry = async (request, response) => {
    const key = request.params.id;
    const body = request.body;
    try {
        const userExists = await userService.getUserById(key);
        if (userExists) {
            bcrypt.hash(body.password, saltRounds, async function (err, hash) {
                const data = await userService.updateUserPassword({
                    password: hash
                }, key);
                response.status(200).json(data)
            })
        } else {
            response.status(404).json({"errorMessage": "User cannot be found"});
        }

    } catch (error) {
        console.log(error);
        response.status(503).json({"errorMessage": "Service currently unavailable"});
    }
}

const userLogin = async (request, response) => {
    const {password, email} = request.body;
    try {
        const user = await userService.getUserByEmail(email);
        if(await userService.isUserVerified(email)){
            if (user && (email.toLowerCase() === user.email) && bcrypt.compareSync(password, user.password)) {
                response.status(200).json({"message": "User login successful!"});
                await emailVerificationService.deleteHash(email);
            } else {
                response.status(401).json({"errorMessage": "User unauthorized"});
            }
        } else {
            response.status(401).json({"errorMessage": "User has not been verified!"});
        }

    } catch (error) {
        console.log(error);
        response.status(503).json({"errorMessage": "Service currently unavailable"});
    }
}


module.exports = {
    createUser: createUser,
    getUserById: getUserById,
    getAllUsers: getAllUsers,
    deleteUserEntry: deleteUserEntry,
    updateUserEntry: updateUserEntry,
    userLogin: userLogin,
    verificationHandler:verificationHandler
}