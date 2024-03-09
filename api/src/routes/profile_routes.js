const express = require('express');
const profileController = require('../controllers/profile_controller');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const profileRouter = express.Router();
const crypto = require('crypto');
const {extname} = require("path");
require('dotenv').config();



MONGODB_URI = process.env.MONGODB_URI

// creating storage engine
const storage = new GridFsStorage({
    url: MONGODB_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({storage});

profileRouter.get('/:id', profileController.getProfileBasedOnId);
profileRouter.post('/:id', profileController.createProfile);
profileRouter.put('/:id/update/picture', upload.single('profile_pic'), profileController.updateProfilePicture);

module.exports = {
    profileRouter:profileRouter
}