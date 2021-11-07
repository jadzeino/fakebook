import "./post.css"
import {MoreVert} from "@material-ui/icons"
/*import {Users} from "../../dummyData"*/
import {useContext, useEffect, useState} from "react";
import {PF} from "../../constants/constants";
import axios from "axios";
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext";

export default function Post({post}){
    console.log("post  ",post)
    const [like,setLike] = useState(post.likes.length)
    const [isLiked,setIsLiked] = useState(false)
    const [user,setUser] = useState({})
    const {user:currentUser} = useContext(AuthContext)
    useEffect(()=>{
        const fetchUser = async ()=>{
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    },[post.userId])
    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])
    /*const user = Users.find(user=>user.id===post.userId)*/
    const toggleLike = async ()=>{
        try{
            await axios.put("/posts/"+post._id+"/like",{userId:currentUser._id})
        }
        catch (error){

        }
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }
    console.log("user  ",user)
    return <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                        <img src={user.profilePicture ? (PF + user.profilePicture) : (PF + "person/noAvatar.png")} alt="" className="postProfileImg"/>
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post.desc}</span>
                <img src={PF + post.img} alt="" className="postImg"/>
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={ PF + "like.png"} alt="" className="likeIcon" onClick={toggleLike}/>
                    <img src={ PF + "heart.png"} alt="" className="likeIcon"/>
                    <span className="postLikeCounter">{`${like}  people like this`}</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment ? `${post.comment} comments` : `0 comments`}</span>
                </div>
            </div>
        </div>
    </div>
}

