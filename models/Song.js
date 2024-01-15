const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
    {
        songTitle: {
            type: String,
            required: true,
            max: 50
        },
        artistName: {
            type: String,
            required: true,
            max: 50
        },
        releaseDate: {
            type: Date,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        publicUrl: {
            type: String,
            required: false,
            default: ""
        },
        userId: {
            type: String,
            required: true
        }
    }
)

const Song = mongoose.model("Song", SongSchema);

module.exports = Song;