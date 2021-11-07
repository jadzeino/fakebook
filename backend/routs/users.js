const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt");

//update user
router.put("/:id",async (req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
            const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password,salt)
            }catch (err){
                return res.status(500).json(err)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            })
            console.log("user ",user)
            res.status(200).json("Account has been updated")
        }catch (err){
            res.status(500).json(err)
        }
    }else{
        return res.status(403).json("You can update only your account!")
    }
})
//delete user
router.delete("/:id",async (req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account has been deleted successfully")
        }catch (err){
            res.status(500).json(err)
        }
    }else{
        return res.status(403).json("You can delete only your account!")
    }
})
//get A user
router.get("/",async (req,res)=>{
    const {userId,username} = req.query
    try{
        const user = userId ? await User.findById(userId) : await User.findOne({username:username})
        //to avoid sending all data, u can remove some here
        const {password,updatedAt,...other} = user._doc
        res.status(200).json(other)
    }
    catch (err){
        res.status(500).json(err)
    }
})
/*router.get("/:id",async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        //to avoid sending all data, u can remove some here
        const {password,updatedAt,...other} = user._doc
        res.status(200).json(other)
    }
    catch (err){
        res.status(500).json(err)
    }
})*/
//follow a user
router.put("/:id/follow",async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const toFollowUser = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!toFollowUser.followers.includes(currentUser.id)){
                 await toFollowUser.updateOne({$push: {followers:req.body.userId}})
                 await currentUser.updateOne({$push: {followings:req.params.id}})
                res.status(200).json("user has been followed")
            }else{
                res.status(403).json("you are following this user already")
            }

        }
        catch (err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("You cant follow your self")
    }

})
//unfollow a user
router.put("/:id/unfollow",async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const toFollowUser = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(toFollowUser.followers.includes(currentUser.id)){
                await toFollowUser.updateOne({$pull: {followers:req.body.userId}})
                await currentUser.updateOne({$pull: {followings:req.params.id}})
                res.status(200).json("user has been unfollowed")
            }else{
                res.status(403).json("you are not following this user!")
            }

        }
        catch (err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("You cant follow your self")
    }

})
//get user friends
router.get("/friends/:userId",async (req,res)=>{
    try{
        const user = await User.findById(req.params.userId)
        const friends = await Promise.all(
            user.followings.map((friendId)=>{
                console.log("friendId  ",friendId)
                return User.findById(friendId,'username profilePicture')
            }))
        res.status(200).json(friends)

    }catch (err){
        res.status(500).json(err)
    }

})
//get all user follower
router.get("/:id/followers",async (req,res)=>{

    try{
        const users = await Promise.all(
            req.body.followers.map((userId)=>{
            console.log("userId  ",userId)
            return User.findById(userId,'username profilePicture')
        }))
        console.log("users ",users)
        res.status(200).json(users)

    }catch (err){
        res.status(500).json(err)
    }


    /*if(req.body.userId !== req.params.id){
        try{
            const toFollowUser = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!toFollowUser.followers.includes(currentUser.id)){
                await toFollowUser.updateOne({$push: {followers:req.body.userId}})
                await currentUser.updateOne({$push: {followings:req.params.id}})
                res.status(200).json("user has been followed")
            }else{
                res.status(403).json("you are following this user already")
            }

        }
        catch (err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("You cant follow your self")
    }*/

})


/*router.get("/",(req,res)=>{
    res.send("hey this is user route")
})*/

module.exports = router
