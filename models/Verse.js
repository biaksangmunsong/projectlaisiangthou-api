const mongoose = require("mongoose")

const VerseSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    book: {
        type: Number,
        min: 1,
        max: 66,
        required: true
    },
    chapter: {
        type: Number,
        min: 1,
        max: 150,
        required: true
    },
    verse: {
        type: Number,
        min: 1,
        max: 176,
        required: true
    },
    verse_text: {
        type: String,
        required: true
    }
}, { _id: false })

const Verse = mongoose.model("verses", VerseSchema)

module.exports = Verse