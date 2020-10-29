const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const routes = require("./routes/routes")
const checkOrigin = require("./middlewares/checkOrigin")


// configure environment variables
dotenv.config()


const app = express()
const PORT = process.env.PORT || 8080


// connect to mongodb database
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, err => {
    if (err){
        return console.log(err)
    }
    
    // listen to port
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}...`)
    })
})


// apply middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})
app.use("/*", checkOrigin)


// handle routes
app.use("/", routes)


// handle errors
app.use((err, req, res, next) => {
    if (err){
        return res
        .status(err.status)
        .json(err.error)
    }
})