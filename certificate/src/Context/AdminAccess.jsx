import { Outlet } from "react-router-dom"
import { useAuth } from "./AuthContext"
import LoadingSpinner from "../Components/Spinner"
import { useEffect, useState } from "react"

const AdminAccess = () => {
    // eslint-disable-next-line no-unused-vars
    const [auth,setAuth]=useAuth()
    const [ok,setOk]=useState(false)
    useEffect(() => {
        if (auth.user && auth.user.role === 1) {
            setOk(true);
        } else {
            setOk(false);
        }
    }, [auth.user]);  

    return ok ? <Outlet /> : <LoadingSpinner />;
}

export default AdminAccess