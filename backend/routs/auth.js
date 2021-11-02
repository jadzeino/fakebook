const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
//REGISTER
router.post("/register",async (req,res)=>{
    const {username,email,password} = req.body
    try{
        //generate new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        //create new user
        const newUser = new User({
            username:username,
            email:email,
            password:hashedPassword
        })
        //save user and respond
        const user = await newUser.save()
        res.status(200).json(user)
    }
    catch (err){
        console.log(err)
        res.status(500).json(err)
    }
})

//LOGIN
router.post("/login",async (req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({email:email})
        !user && res.status(404).json("user not found")

        const validPassword = await bcrypt.compare(password,user.password)
        !validPassword && res.status(404).json("wrong password")

        res.status(200).json(user)

    }catch (err){
        console.log(err)
        res.status(500).json(err)
    }


})

module.exports = router