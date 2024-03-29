const Song = require("../models/Song");
const User = require("../models/User");
const { uploadFile } = require("../middleware/songUpload.js")
const { replaceSpacesWithHyphens } = require("../util/songNamePreparer.js")


async function addSong(req, res) {
    const userId = req.user.userId
    //const userId = '65a38a22b929628dfb89ecd6'
    const { songTitle, artistName, releaseDate, genre} = req.body;
    const songFile = req.files.songFile;
    console.log(songFile)

    if (!songTitle || !artistName || !releaseDate || !genre || !songFile) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {

        const { status, bucketName, gcsFilePath } = await uploadFile(songFile, `${replaceSpacesWithHyphens(songTitle)}-${replaceSpacesWithHyphens(artistName)}-${userId}.mp3`);
        if (status) {
            const newSong = new Song({
                songTitle,
                artistName,
                releaseDate,
                genre,
                userId,
                publicUrl: `https://storage.googleapis.com/${bucketName}/${gcsFilePath}`
            })

            await newSong.save();

            return res.status(201).json({ message: "Song uploaded successfully" });
        } else {
            return res.status(500).json({ message: "Could not upload the song" });
        }
    } catch (error) {
        console.error("Error uploading song to Google Storage: ", error)
        res.status(500).send("Internal Server Error");
    }
}

async function getSongs(req, res) {
    try {
        // Use Mongoose to find all documents in the "Song" collection
        const songs = await Song.find().lean();

        // Return the songs as a JSON response
        return res.json(songs);
    } catch (error) {
        // Handle errors, such as database errors
        console.error('Error fetching songs:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}



module.exports = {
    addSong,
    getSongs
}