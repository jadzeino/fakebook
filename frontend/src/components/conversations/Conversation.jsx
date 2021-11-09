import "./conversation.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {PF} from "../../constants/constants";
export default function Conversation({conversation,currentUser}){
    const [user,setUser] = useState(null)
    useEffect(()=>{
        const friendId = conversation.members.find((m)=> m !== currentUser._id)
        const fetchUsers = async()=>{
            try{
                const res = await axios.get("/users?userId="+friendId)
                setUser(res.data)
            }catch (error){
                console.log(error)
            }
        }
        fetchUsers()
    },[])
    //if(!user) return (<div>Loading...</div>)//azeino
    return (<div className="conversation">
        <img className={"conversationImg"} alt={""} src={user?.profilePicture ? (PF + user.profilePicture) : (PF+"person/noAvatar.png")}/>
        <span className="conversationName">{user?.username}</span>
    </div>)
}