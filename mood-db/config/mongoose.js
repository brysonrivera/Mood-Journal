const mongoose = require('mongoose');
require("dotenv").config();

const connectToMongoDBAtlas = (uri) => {
    try {
        return mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    connectToMongoDBAtlas,
    mongoose

}