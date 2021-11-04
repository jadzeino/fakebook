import "./online.css"
import {PF} from "../../constants/constants";
export default function Online({user}) {
    return (<li className="rightBarFriend">
        <div className="rightBarProfileImgContainer">
            <img src={PF + user.profilePicture} alt="" className="rightBarProfileImg"/>
            <span className="rightBarOnline"></span>
        </div>
        <span className="rightBarUsername">{user.username}</span>
    </li>)
}