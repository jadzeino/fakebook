import "./closeFriend.css"
export default function CloseFriend({user}){
    return (<li className="sideBarFriend">
        <img className="sideBarFriendImg" src={user.profilePicture} alt="" />
        <span className="sideBarFriendName">{user.username}</span>
    </li>)
}