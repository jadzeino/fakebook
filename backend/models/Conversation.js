const mongoose = require("mongoose")

//create Conversation schema
const ConversationSchema = new mongoose.Schema({
        members:{
            type:Array
        }
    },{timestamps:true}
)

module.exports = mongoose.model("Conversation",ConversationSchema)
