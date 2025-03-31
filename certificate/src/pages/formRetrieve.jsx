import axios from "axios";
import { useEffect, useState } from "react"
import { downloadFile, getCertificate } from "../provider/ContractProvider";
import './UploadForm.css'
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

const FormRetrieve = () => {
    // eslint-disable-next-line no-unused-vars
    const [auth,setAuth]=useAuth()
    const [org,setOrg]=useState()
    const [isLoading,setIsLoading]=useState(false)
    // eslint-disable-next-line no-unused-vars
    const [block,setBlock]=useState([])
    const [entities,setEntities]=useState(null)
    const [formData,setFormData]=useState({
        email:"",
        dob:"",
        type:"",
        organisation:""
    });
    let blockAddress="";
    useEffect(()=>{
      const fetchOrganisation=async()=>{
        try {
          const {data}=await axios.get(`/api/auth/user`)
          if(data.success){
            setOrg(data.university);
          }
        } catch (error) {
          console.log(error)
          toast.error(error?.response?.data?.message)
        }
      }
      fetchOrganisation();
  },[])
    useEffect(()=>{
      const fetchTypes=async()=>{
        try {
          const {data}=await axios.get(`/api/auth/types/${formData.organisation}`)
          if(data.success){
            setEntities(data.types);
          }
        } catch (error) {
          console.log(error)
          // toast.error(error?.response?.data?.message)
        }
      }
      fetchTypes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[formData.organisation])
    const handleChange = (e) => {
        const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        }
    const handleSubmit=async(e)=>{
        setIsLoading(true)
        e.preventDefault()
        try {
            const {data}=await axios.post('/api/auth/certificate',{email:auth?.user?.email,dob:formData.dob,type:formData.type});
            if(data.success){
                blockAddress=data.certificate.block
            }
            if(blockAddress){
                const reciept=await getCertificate(blockAddress);
                setBlock(reciept)
                if(reciept[1]===auth?.user?.email){
                toast.loading("Downloading your certificate securely",{duration:2000})
                downloadFile(reciept[0])
                }
                else{
                    console.log("Invalid email for retrieving certifcate")
                    toast.error("Invalid credential to get the certificate")
                }
            }
        } catch (error) {
            console.log(error.response?.data?.message)
            toast.error("Error while fetching the assets")
        }
        finally{
            setIsLoading(false)
        }
    }

  return (
    <div className="signup-container">
      <div className="form-img">
        <img src="/retrieve.jpg" alt="Sign-up Image" className="signup-image" />
      </div>
      <div className="form-container">
        <div className="form-subcontainer">
          <h1 className="form-heading">Download Digital Certificates</h1>
          <br />
          <form onSubmit={handleSubmit}>
          <label>Email Associated</label>
          <div className="input-group">
              <input
                type="text"
                name="email"
                value={auth?.user?.email}
                disabled
                placeholder="Enter Holder's Email"
              />
            </div>
            <label>Select your Organisation</label>
          <div className="input-group entity-dropdown-container">
                <select 
                  name="organisation" 
                  value={formData.organisation || ''} 
                  onChange={handleChange}
                  className="entity-select"
                  required
                >
                  <option value="" default>Select Organisation</option>
                  {org?.map((o) => (
                    <option key={o.name} value={o._id}>
                      {o.name}
                    </option>
                  ))}
                </select>
            </div>
            <label>Date of Birth</label>
            <div className="input-group">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                required
                placeholder="Enter holder Date of birth"
              />
            </div>
            <label>Select Entity to fetch</label>
            <div className="input-group entity-dropdown-container">
                <select 
                  name="type" 
                  value={formData.type || ''} 
                  onChange={handleChange}
                  className="entity-select"
                  required
                >
                  <option value="" default>Select Entity</option>
                  {entities?.map((entity) => (
                    <option key={entity.name} value={entity._id}>
                      {entity.name}
                    </option>
                  ))}
                </select>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Getting your certificate..." : "Retrieve"}
            </button>
          </form>
          <p className="help-txt">Can&#39;t able to retrieve the entity?{" "}Go to {" "}
          <Link className="link" to="/help">
                  Contact Support
                </Link>{" "}
               From Here
          </p>
        </div>
      </div>
    </div>
  )
}

export default FormRetrieve