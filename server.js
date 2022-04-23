const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const PORT = 4000;
const userRouter = require('./routes/user');

const server = express();
server.use(bodyparser.json());
server.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"]
}));

//img
server.use("/uploads/images", express.static(path.join("uploads", "images")));


server.get('/', (req, res) => {
    res.send("hello wolrd!")
})

server.use('/user', userRouter);

mongoose.connect("mongodb+srv://admin:admin@cluster0.4mlbj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() => {
    server.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    })
}).catch((error) => console.log("DB error: " + error))


