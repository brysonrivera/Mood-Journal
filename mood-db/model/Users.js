const mongoose = require('mongoose').mongoose
const logSchema = require('./Logs')


const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateAccountOpenedOn: Date,
    logs: [logSchema]

})

const User = mongoose.model("User", userSchema)

module.exports = User 