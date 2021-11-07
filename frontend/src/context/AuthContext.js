import {createContext, useReducer} from "react";
import AuthReducer from "./AuthReducer";
/*{
    _id: "618436da6d82e3d275973dc9",
        username: "Ahmed",
    email: "ahmad@gmail.com",
    profilePicture: "person/0.jpeg",
    coverPicture: "cover/1.jpeg",
    followers: [
    "618439b75c00875d209be8be"
],
    followings: [
    "618439b75c00875d209be8be"
],
    isAdmin: false,
    createdAt: "2021-11-04T19:39:06.715Z",
    relationship: 2,
    desc: "Learn Something New Everyday!",
    city: "Amman",
    from: "Jordan"
}*/
const INITIAL_STATE = {
    user:null,
    isFetching:false,
    error:false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE)
    return (<AuthContext.Provider
        value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch
        }}>
        {children}
    </AuthContext.Provider>)
}
