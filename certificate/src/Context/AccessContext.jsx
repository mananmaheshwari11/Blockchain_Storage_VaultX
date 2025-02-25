import axios from "axios"
import { useAuth } from "./AuthContext"
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import LoadingSpinner from "../Components/Spinner";

const AccessContext = () => {
    const [auth,setAuth]=useAuth()
    const [ok,setOk]=useState(false)
    useEffect(()=>{
        const getAccess=async()=>{
            try {
            const {data}=await axios.get('/api/auth/check')
            if(data.ok){
                setAuth({
                    ...auth,
                    user:data
                })
                setOk(true)
            }
            } catch (error) {
                console.log(error.response?.data?.message)
            }
        }
    if (auth?.token){
        getAccess()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[auth?.token]);
    
  return ok? <Outlet/>:<LoadingSpinner/>
}

export default AccessContext