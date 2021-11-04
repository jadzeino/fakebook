import "./closeFriend.css"
import {PF} from "../../constants/constants";
export default function CloseFriend({user}){
    return (<li className="sideBarFriend">
        <img className="sideBarFriendImg" src={PF + user.profilePicture} alt="" />
        <span className="sideBarFriendName">{user.username}</span>
    </li>)
}