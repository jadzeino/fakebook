import "./sideBar.css"
import {RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School} from "@material-ui/icons"
import {Users} from "../../dummyData";
import Online from "../online/Online";
import CloseFriend from "../closeFriend/CloseFriend";
export default function SideBar(){
    return (<div className="sideBar">
        <div className="sideBarWrapper">
            <ul className="sideBarList">
                <li className="sideBarListItem">
                    <RssFeed className="sideBarIcon"/>
                    <span className="sideBarListItemText">Feed</span>
                </li>
                <li className="sideBarListItem">
                    <Chat className="sideBarIcon"/>
                    <span className="sideBarListItemText">Chat</span>
                </li>
                <li className="sideBarListItem">
                    <PlayCircleFilledOutlined className="sideBarIcon"/>
                    <span className="sideBarListItemText">Videos</span>
                </li>
                <li className="sideBarListItem">
                    <Group className="sideBarIcon"/>
                    <span className="sideBarListItemText">Group</span>
                </li>
                <li className="sideBarListItem">
                    <Bookmark className="sideBarIcon"/>
                    <span className="sideBarListItemText">Bookmarks</span>
                </li>
                <li className="sideBarListItem">
                    <HelpOutline className="sideBarIcon"/>
                    <span className="sideBarListItemText">Questions</span>
                </li>
                <li className="sideBarListItem">
                    <WorkOutline className="sideBarIcon"/>
                    <span className="sideBarListItemText">Jobs</span>
                </li>
                <li className="sideBarListItem">
                    <Event className="sideBarIcon"/>
                    <span className="sideBarListItemText">Events</span>
                </li>
                <li className="sideBarListItem">
                    <School className="sideBarIcon"/>
                    <span className="sideBarListItemText">Courses</span>
                </li>
            </ul>
            <button className="sideBarButton">Show More</button>
            <hr className="sideBarHr"/>
            <ul className="sideBarFriendList">
                {Users.map(user=><CloseFriend user={user}/>)}
            </ul>
        </div>
    </div>)
}