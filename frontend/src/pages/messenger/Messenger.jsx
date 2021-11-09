import "./messenger.css"
import TopBar from "../../components/topBar/TopBar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import {useContext, useEffect, useRef, useState} from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
export default function Messenger(){
    const {user} = useContext(AuthContext)
    const [conversations,setConversations] = useState([])
    const [currentChat,setCurrentChat] = useState(null)
    const [messages,setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef()

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
    },[currentChat?._id])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    const handleSubmit = async (e)=> {
        e.preventDefault()
        const message = {
            sender:user._id,
            text:newMessage,
            conversationId:currentChat._id
        }
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
                                                <Message message={m} own={m.sender === user._id} />
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

                        {/*{currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                        <div ref={scrollRef}>
                                            <Message message={m} own={m.sender === user._id} />
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
                            </>
                        ) : (
                            <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
                        )}*/}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline
                            // onlineUsers={onlineUsers}
                            // currentId={user._id}
                            // setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        </>
    );
/*    return (
        <>
            <TopBar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                        <div ref={scrollRef}>
                                            <Message message={m} own={m.sender === user._id} />
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
                            </>
                        ) : (
                            <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
                        )}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={user._id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        </>
    );*/
}