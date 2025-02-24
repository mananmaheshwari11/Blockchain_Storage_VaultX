import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/home"
import Signup from "./auth/Signup"
import Signin from "./auth/Signin"
import UploadForm from "./pages/UploadForm"
import FormRetrieve from "./pages/FormRetrieve"
import AccessContext from "./Context/AccessContext"
import AdminAccess from "./Context/AdminAccess"
import NotFound from "./pages/NotFound"
import { Toaster } from "react-hot-toast"
import Entities from "./pages/Entities"
import AboutVaultX from "./pages/About"

function App() {

  return (
    <>
    <Toaster position="top-right"/>
    <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/about" element={<AboutVaultX/>}/>
    <Route path="*" element={<NotFound/>}/>
    <Route path="vault" element={<AccessContext/>}>
    <Route path="/vault" element={<Homepage/>}/>
    <Route path="org" element={<AdminAccess/>}>
    <Route path="entities" element={<Entities/>}/>
    <Route path="upload" element={<UploadForm/>}/>
    </Route>
    <Route path="retrieve" element={<FormRetrieve/>}/>
    </Route>
   
    </Routes>
    </>
  )
}

export default App
