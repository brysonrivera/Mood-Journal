const mongoose = require('mongoose').mongoose

const logsSchema = new mongoose.Schema({
    entry: String,
    quote: String,
    gif: String,
    sentiment: Number,
    mood: String,
    dateSubmitted: Date
})

module.exports = logsSchema