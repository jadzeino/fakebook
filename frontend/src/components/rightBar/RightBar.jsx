import "./rightBar.css"
import {Users} from "../../dummyData"
import Online from "../online/Online";
import {PF} from "../../constants/constants";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {Add,Remove} from "@material-ui/icons"
const relationShipMap = new Map([
    [1,"Single"],
    [2,"Married"],
    [3,"N/A"]
])
export default function RightBar({ user }) {
    const [friends,setFriends] = useState([])
    const {user:currentUser,dispatch} = useContext(AuthContext)
    const [followed,setFollowed] = useState(false)

    useEffect(()=>{
        const fetchFriends = async ()=>{
            try{
                const res = await axios.get("/users/friends/"+user._id)
                setFriends(res.data)
            }catch(error){
                console.log("fail to fetch user friends ",error)
            }
        }
        if(user && user._id){
            fetchFriends()
            setFollowed(currentUser.followings.includes((user._id)))

        }


    },[user])
    /*useEffect(()=>{
        setFollowed(currentUser.followings.includes((user?.id)))
    },[currentUser,user])*/

    const followHandler = async(e)=>{
        //e.preventDefault()
        //if i follow this user i should follow otherwise unfollow
        try{
            if(followed){
                await axios.put("/users/"+user._id+"/unfollow",{userId:currentUser._id})
                dispatch({
                    type:"UNFOLLOW",
                    payload:user._id
                })
            }else{
                await axios.put("/users/"+user._id+"/follow",{userId:currentUser._id})
                dispatch({
                    type:"FOLLOW",
                    payload:user._id
                })
            }
            setFollowed(!followed)
        }catch (error){
            console.log(error)
        }
    }

    const HomeRightBar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={ PF + "gift.png"} alt="" />
                    <span className="birthdayText">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
                    </span>
                </div>
                <img className="rightBarAd" src={ PF + "ad.png"} alt="" />
                <h4 className="rightBarTitle">Online Friends</h4>
                <ul className="rightBarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        );
    };

    const ProfileRightBar = () => {
        return (
            <>
            {user.username !== currentUser.username && (
                <button className="rightBarFollowButton" onClick={followHandler}>
                    {followed ? "Unfollow": "Follow"}
                    {followed ? <Remove/> : <Add/>}
                </button>
            )}
                <h4 className="rightBarTitle">User information</h4>
                <div className="rightBarInfo">
                    <div className="rightBarInfoItem">
                        <span className="rightBarInfoKey">City:</span>
                        <span className="rightBarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightBarInfoItem">
                        <span className="rightBarInfoKey">From:</span>
                        <span className="rightBarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightBarInfoItem">
                        <span className="rightBarInfoKey">Relationship:</span>
                        <span className="rightBarInfoValue">{relationShipMap.get(user.relationship)}</span>
                    </div>
                </div>
                <h4 className="rightBarTitle">User friends</h4>
                <div className="rightBarFollowings">
                    {
                        friends.map(friend=>(
                            <Link key={friend._id} to={`/profile/${friend.username}`} style={{textDecoration:"none"}}>
                                <div key={friend._id} className="rightBarFollowing">
                                    <img
                                        src={friend.profilePicture ? (PF + friend.profilePicture) :  (PF + "person/noAvatar.png")}
                                        alt=""
                                        className="rightBarFollowingImg"
                                    />
                                    <span className="rightBarFollowingName">{friend.username}</span>
                                </div>
                            </Link>))
                    }
                </div>
            </>
        );
    };
    return (
        <div className="rightBar">
            <div className="rightBarWrapper">
                {user ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div>
    )
}