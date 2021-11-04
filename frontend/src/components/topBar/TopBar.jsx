import "./topbar.css"
import {Search,Person,Chat,Notifications} from "@material-ui/icons"
import {Link} from "react-router-dom"
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {PF} from "../../constants/constants";
export default function TopBar(){
    const {user} = useContext(AuthContext)
    return (
        <div className="topBarContainer">
            <div className="topBarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">FakeBook</span>
                </Link>
            </div>
            <div className="topBarCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search for friend, post or video" className="searchInput"/>
                </div>
            </div>
            <div className="topBarRight">
                <div className="topBarLinks">
                    <span className="topBarLink">HomePage</span>
                    <span className="topBarLink">Timeline</span>
                </div>
                <div className="topBarIcons">
                    <div className="topBarIconItem">
                        <Person/>
                        <span className="topBarIconBadge">1</span>
                    </div>
                    <div className="topBarIconItem">
                        <Chat/>
                        <span className="topBarIconBadge">1</span>
                    </div>
                    <div className="topBarIconItem">
                        <Notifications/>
                        <span className="topBarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? (PF + user.profilePicture) : (PF +"person/noAvatar.png")} alt="" className="topBarImg"/>
                </Link>
            </div>
        </div>
    )
}