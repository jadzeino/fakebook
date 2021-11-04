import "./register.css";
import {useRef} from "react";
import axios from "axios";
import {useHistory} from "react-router"

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const history = useHistory()

    const handleClick = (e)=>{
        e.preventDefault()
        if(password.current.value !== passwordAgain.current.value){
            passwordAgain.current.setCustomValidity("Passwords dont Match!")
        }else{
            const user = {
                username:username.current.value,
                email:email.current.value,
                password:password.current.value
            }
            try{
                const res = axios.post("/auth/register",user)
                history.push("/login")
            }catch (error){
                console.log(error)
            }
        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">FakeBook</h3>
                    <span className="loginDesc">
            Connect with friends and live a happy fake life in the internet.
          </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Username" ref={username} required className="loginInput" />
                        <input placeholder="Email" ref={email} required type="email" className="loginInput" />
                        <input placeholder="Password" ref={password} required type="password" className="loginInput" />
                        <input placeholder="Password Again" ref={passwordAgain} required type="password" className="loginInput" />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <button className="loginRegisterButton">
                            Log into Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}