import "./rightBar.css"
export default function RightBar(){
    return (<div className="rightBar">
        <div className="rightBarWrapper">
            <div className="birthdayContainer">
                <img src="/assets/gift.png" alt="" className="birthdayImg"/>
                <span className="birthdayText"><b>Rania Mali</b> and <b>3 friends</b> have birthday today!</span>
            </div>
            <img src="/assets/ad.png" alt="" className="rightBarAd"/>
            <h4 className="rightBarTitle">Online Friends</h4>
            <ul className="rightBarFriendList">
                <li className="rightBarFriend">
                    <div className="rightBarProfileImgContainer">
                        <img src="/assets/person/3.jpeg" alt="" className="rightBarProfileImg"/>
                        <span className="rightBarOnline"></span>
                    </div>
                    <span className="rightBarUsername">John Doe</span>
                </li>
                <li className="rightBarFriend">
                    <div className="rightBarProfileImgContainer">
                        <img src="/assets/person/3.jpeg" alt="" className="rightBarProfileImg"/>
                        <span className="rightBarOnline"></span>
                    </div>
                    <span className="rightBarUsername">John Doe</span>
                </li>
                <li className="rightBarFriend">
                    <div className="rightBarProfileImgContainer">
                        <img src="/assets/person/3.jpeg" alt="" className="rightBarProfileImg"/>
                        <span className="rightBarOnline"></span>
                    </div>
                    <span className="rightBarUsername">John Doe</span>
                </li>
                <li className="rightBarFriend">
                    <div className="rightBarProfileImgContainer">
                        <img src="/assets/person/3.jpeg" alt="" className="rightBarProfileImg"/>
                        <span className="rightBarOnline"></span>
                    </div>
                    <span className="rightBarUsername">John Doe</span>
                </li>
            </ul>
        </div>
    </div>)
}