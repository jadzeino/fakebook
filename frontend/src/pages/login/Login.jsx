import "./login.css"
import {useContext, useRef} from "react";
import {loginCall} from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext";
import {CircularProgress} from "@material-ui/core"
export default function Login() {
    const {user ,isFetching,error,dispatch} = useContext(AuthContext)
    const email = useRef()
    const password = useRef()
    const handleClick = (e)=>{
        e.preventDefault()
        loginCall({email:email.current.value,password:password.current.value},dispatch)
        console.log("clicked ",email.current.value)
        console.log("clicked ",password.current.value)
    }
    console.log("user  ",user)
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
                        <input placeholder="Email" type="email" className="loginInput" ref={email} required/>
                        <input placeholder="Password" type="password" className="loginInput"  ref={password} required minLength="6"/>
                        <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="20px"/> : "Log In"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">
                            {isFetching ? <CircularProgress color="white" size="20px"/> : "Create a New Account"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}