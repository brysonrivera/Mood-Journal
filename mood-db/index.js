require('dotenv').config();
const express = require('express');
const connectToMongoDBAtlas = require('./config/mongoose').connectToMongoDBAtlas;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const User = require('./model/Users')

const uri = process.env.EXPRESS_APP_MONGODB_URI

app.get('/', (req, res) => {
    res.send("Hello")
})

app.post("/create-user", async (req, res) => {
    const user = req.body
    user.dateAccountOpenedOn = new Date()
    try {
        const foundUser = await User.findOne({ email: user.email }).exec()
        if (foundUser === null) {
            const addedUser = new User(user)
            await addedUser.save()
            res.status(201).send(addedUser)
        }
        res.status(500).send({ err: "User with the same email has already been found" })
    } catch (error) {
        res.status(500).send({ err: error })
    }
})

app.post("/log-entry", (req, res) => {
    const { email, ...entry } = req.body
    entry.dateSubmitted = new Date()
    User.findOneAndUpdate(
        { email: email },
        { $push: { logs: entry } }, async (err, user) => {
            if (err) {
                res.status(500).send({ err: err })
            } else {
                await user.save()
                res.status(201).send({ user: user })
            }
        }
    )
});

app.post("/delete-entry", async (req, res) => {
    const { email, _id } = req.body
    try {
        const user = await User.findOne({ email: email }).exec();
        user.logs.id(_id).remove();
        user.save();
        res.status(201).send({ user: user });
    } catch (error) {
        res.status(500).send({ error: error })
    }
});

app.get("/user-entries", async (req, res) => {
    const email = req.query.email
    try {
        const user = await User.findOne({ email: email }).exec();
        res.send({ items: user.logs })
    } catch (error) {
        console.log(error)
        res.status(500).send({ err: err })
    }
})

const startServer = () => {
    try {
        connectToMongoDBAtlas(uri)
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

startServer();
