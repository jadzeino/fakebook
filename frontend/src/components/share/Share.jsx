import "./share.css"
import {PermMedia,Label,Room,EmojiEmotions,Cancel} from "@material-ui/icons"
import {useContext, useRef, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {PF} from "../../constants/constants";
import axios from "axios";
const imageList = [
    "imageList/1.jpg",
    "imageList/2.jpg",
    "imageList/3.jpg",
    "imageList/4.jpg",
    "imageList/5.jpg",
    "imageList/6.jpg",
    "imageList/7.jpg",
    "imageList/8.jpg",
    "imageList/9.jpg",

]
export default function Share(){
    const {user} = useContext(AuthContext)
    const [file,setFile] = useState()
    const desc = useRef()
    const handleFile = (e)=>{
        setFile(e.target.files[0])
    }
    const cancelImg = (e)=>{
        e.preventDefault()
        setFile(null)
    }
    const submitHandler = async(e)=>{
        e.preventDefault()
        //just for now
        const image = imageList.pop()
        setFile(image)
        const newPost = {
            userId:user._id,
            desc:desc.current.value,
            img:file
        }
        try{
            await axios.post("/posts",newPost )
        }catch (error){
            console.log(error)
        }

    }
    return (<div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img src={user.profilePicture ? (PF + user.profilePicture) : (PF+"person/noAvatar.png")} alt="" className="shareProfileImg"/>
                <input placeholder={`What is in your mind ${user.username}?`} className="shareInput" ref={desc}/>
            </div>
            <hr className="shareHr"/>
            {file && (<div className="shareImgContainer">
                <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                <Cancel className={"shareCancelImg"} onClick={cancelImg}></Cancel>
            </div>)}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Photo or Video</span>
                        <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={handleFile}/>
                    </label>
                    <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareButton" type="submit">Share</button>
            </form>
        </div>
    </div>)
}