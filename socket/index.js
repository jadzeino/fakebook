const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
})
let users = []
const addUser = (userId,socketId)=>{
    !users.some((user)=>user.userId===userId) &&
        users.push({userId,socketId})
}
const removeUser = (socketId)=>{
    users = users.filter((user)=>user.socketId!==socketId)
}
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection",(socket)=>{
    //when connect
    console.log("a user was connected.")
    //take userId and socketId from user
    socket.on("addUser",userId=>{
        console.log("addUser  ",userId)
        addUser(userId,socket.id)
        console.log("after adding user , the users are  ",users)
        io.emit("getUsers",users)
    })

    //send  and get message
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        console.log(".....send")
        console.log("receiverId  ",receiverId)
        const user = getUser(receiverId)
        console.log("user  ",user)
        if(user){
            io.to(user.socketId).emit("getMessage",{
                senderId,
                text
            })
        }else{
            console.log("cant find user ")
        }

    })

    //when disconnect
    socket.on("disconnect",()=>{
        console.log("a user disconnected!")
        removeUser(socket.id)
        io.emit("getUsers",users)
    })
    //io.emit("welcome","This is socket server")
    //io.to(si).emit("welcome","This is socket server") send for a specific user
})