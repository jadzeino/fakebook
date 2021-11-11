import "./messenger.css"
import TopBar from "../../components/topBar/TopBar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import {useContext, useEffect, useRef, useState} from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {io} from "socket.io-client"
export default function Messenger(){
    const [conversations,setConversations] = useState([])
    const [currentChat,setCurrentChat] = useState(null)
    const [messages,setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [talkTo, setTalkTo] = useState(null);
    const socket = useRef()
    const {user} = useContext(AuthContext)
    const scrollRef = useRef()

    useEffect(()=>{
        socket.current=io("ws://localhost:8900")
        socket.current.on("getMessage",data =>{
            setArrivalMessage({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now()
            })
        })
    },[])

    useEffect(()=>{
        arrivalMessage &&
         currentChat?.members.includes(arrivalMessage.sender) &&
         setMessages(prev=>[...prev,arrivalMessage])
    },[arrivalMessage,currentChat])

    useEffect(()=>{
        socket.current.emit("addUser",user._id)
        socket.current.on("getUsers",users=>{
            console.log(users)
            setOnlineUsers(user.followings.filter(f=>users.some(u=>u.userId===f)))
            console.log("onLine ",onlineUsers)
        })
    },[user])

    useEffect(()=>{
        const getConversations = async ()=>{
            try{
                const res = await axios("/conversations/"+user._id)
                console.log("convers res  ",res)
                setConversations(res.data)
            }catch (error){
                console.log(error)
            }
        }
        getConversations()
    },[user._id])

    useEffect(()=>{
        const getMessage = async ()=>{
            try{
                const res = await axios.get("/messages/"+currentChat?._id)
                setMessages(res.data)
            }catch (error){
                console.log(error)
            }
        }
        getMessage()
    },[currentChat])


    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])
    console.log("currentChat ",currentChat)
    useEffect(()=>{
        const fetchUser = async()=>{
            const friendId = currentChat.members.find((m)=> m !== user._id)
            try{
                const res = await axios.get("/users?userId="+friendId)
                setTalkTo(res.data)
            }catch (error){
                console.log(error)
            }
        }
        if(currentChat && currentChat.members){
            fetchUser()
        }

    },[user?._id,currentChat?.members])

    const handleSubmit = async (e)=> {
        e.preventDefault()
        const message = {
            sender:user._id,
            text:newMessage,
            conversationId:currentChat._id
        }
        const receiverId = currentChat.members.find(member=>member!==user._id)
        console.log("senderId  ",user._id)
        console.log("receiverId  ",receiverId)
        console.log("message  ",newMessage)
        socket.current.emit("sendMessage",{
            senderId:user._id,
            receiverId:receiverId,
            text:newMessage
        })
        try{
            const res = await axios.post("/messages",message)
            setMessages([...messages,res.data])
            setNewMessage("")

        }catch (error){
            console.log(error)
        }
    }
    return (
        <>
            <TopBar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {
                            conversations.map(conversation=>(
                                <div onClick={()=>{ setCurrentChat(conversation)}} key={conversation._id}>
                                <Conversation  conversation={conversation} currentUser={user}/>
                                </div>)
                            )
                        }
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                                (<>
                                    <div className="chatBoxTop">
                                        {messages.map((m) => (
                                            <div key={m._id} ref={scrollRef}>
                                                <Message message={m} own={m.sender === user._id} pic={(m.sender === user._id) ?  user?.profilePicture : talkTo?.profilePicture}/>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea
                                            className="chatMessageInput"
                                            placeholder="write something..."
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            value={newMessage}
                                        ></textarea>
                                        <button className="chatSubmitButton" onClick={handleSubmit}>
                                            Send
                                        </button>
                                    </div>
                                </>) :
                                (
                                <span className="noConversationText">
                                    Open a conversation to start a chat.
                                </span>
                            )
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline
                             onlineUsers={onlineUsers}
                             currentId={user?._id}
                             setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}