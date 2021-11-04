import "./rightBar.css"
import {Users} from "../../dummyData"
import Online from "../online/Online";
import {PF} from "../../constants/constants";
const relationShipMap = new Map([
    [1,"Single"],
    [2,"Married"],
    [3,"N/A"]
])
export default function RightBar({ user }) {
    const HomeRightBar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={ PF + "gift.png"} alt="" />
                    <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
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
                    <div className="rightBarFollowing">
                        <img
                            src={ PF + "person/1.jpeg"}
                            alt=""
                            className="rightBarFollowingImg"
                        />
                        <span className="rightBarFollowingName">John Carter</span>
                    </div>
                    <div className="rightBarFollowing">
                        <img
                            src={ PF + "person/2.jpeg"}
                            alt=""
                            className="rightBarFollowingImg"
                        />
                        <span className="rightBarFollowingName">John Carter</span>
                    </div>
                    <div className="rightBarFollowing">
                        <img
                            src={ PF + "person/3.jpeg"}
                            alt=""
                            className="rightBarFollowingImg"
                        />
                        <span className="rightBarFollowingName">John Carter</span>
                    </div>
                    <div className="rightBarFollowing">
                        <img
                            src={ PF + "person/4.jpeg"}
                            alt=""
                            className="rightBarFollowingImg"
                        />
                        <span className="rightBarFollowingName">John Carter</span>
                    </div>
                    <div className="rightBarFollowing">
                        <img
                            src={ PF + "person/5.jpeg"}
                            alt=""
                            className="rightBarFollowingImg"
                        />
                        <span className="rightBarFollowingName">John Carter</span>
                    </div>
                    <div className="rightBarFollowing">
                        <img
                            src={ PF + "person/6.jpeg"}
                            alt=""
                            className="rightBarFollowingImg"
                        />
                        <span className="rightBarFollowingName">John Carter</span>
                    </div>
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