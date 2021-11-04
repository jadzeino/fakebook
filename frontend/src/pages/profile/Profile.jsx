import "./profile.css"
import TopBar from "../../components/topBar/TopBar";
import SideBar from "../../components/sideBar/SideBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightBar/RightBar";
import React, {useEffect, useState} from "react";
import {PF} from "../../constants/constants";
import axios from "axios";
import {useParams} from "react-router"
export default function Profile(){
    const [user,setUser] = useState([])
    const username = useParams().username
    useEffect(()=>{
        const fetchUser = async ()=>{
            const res = await axios.get(`/users/?username=${username}`)
            setUser(res.data)
        }
        fetchUser()
    },[username])
    return (
        <>
            <TopBar />
            <div className="profile">
                <SideBar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={ PF + user.coverPicture || PF +"person/noCover.png"}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={ PF + user.profilePicture || PF +"person/noAvatar.png"}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <RightBar user={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}