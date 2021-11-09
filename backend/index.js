const express = require("express")
const app = express()

const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")

const userRoute = require("./routs/users")
const authRoute = require("./routs/auth")
const postRoute = require("./routs/posts")
const conversationRoute = require("./routs/conversations")
const messageRoute = require("./routs/messages")

dotenv.config()

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true},()=>{
    console.log("connected to mongo")
})
//body parser middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)
app.use('/api/conversations',conversationRoute)
app.use('/api/messages',messageRoute)

/*app.get("/",(req,res)=>{
    res.send("welcome to homepage")
})
app.get("/users",(req,res)=>{
    res.send("welcome to users page")
})*/

app.listen(8800,()=>{
    console.log("backend server is running!")
})

