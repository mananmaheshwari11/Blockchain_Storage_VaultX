import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext=createContext()

// eslint-disable-next-line react/prop-types
const AuthProvider=({children})=>{

    const[auth,setAuth]=useState({
        token:"",
        user:null
    })

    axios.defaults.headers.common['Authorization']=auth?.token

useEffect(()=>{
    const data=localStorage.getItem("token");
    if(data){
    const parseData=JSON.parse(data)
        setAuth({
            ...auth,
            token:parseData
        })
    }
// eslint-disable-next-line
} ,[]);

    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}


const useAuth= () => useContext(AuthContext)

export { useAuth ,AuthProvider };