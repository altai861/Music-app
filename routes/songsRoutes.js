const express = require("express");
const router = express.Router();
const songControllers = require("../controllers/songControllers");
const { authenticateUser } = require("../middleware/authenticateUser");
const fileUpload = require("express-fileupload")
const { fileSizeLimiter } = require("../middleware/fileSizeLimiter.js");
const { filesPayloadExists } = require("../middleware/filesPayloadExists.js");

router.use(authenticateUser);

router.route('/')
    .post(
        fileUpload({ createParentPath: true }),
        songControllers.addSong
    )
    .get(songControllers.getSongs)


module.exports = router;