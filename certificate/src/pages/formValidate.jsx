import axios from "axios";
import { useEffect, useState } from "react"
import { getCertificate } from "../provider/ContractProvider";
import './UploadForm.css'
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { ValidateAsset } from "../provider/Vaildator";
import { GenerateReport } from "../Components/Report";

const FormValidate = () => {
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
        organisation:"",
        file:null
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
          // toast.error(error?.response?.data?.message)
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
          error
        }
      }
      fetchTypes();

  },[formData.organisation])

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => {
        let updatedData = { ...prev, [name]: value };

        if (name === "file" && files && files[0]) {
            updatedData.file = files[0];
        }

        if (name === "type") {
            const selectedEntity = entities?.find((entity) => entity._id === value);
            updatedData.entityName = selectedEntity ? selectedEntity.name : "";
        }

        if (name === "organisation") {
            const selectedOrg = org?.find((o) => o._id === value);
            updatedData.organisationName = selectedOrg ? selectedOrg.name : "";
        }

        return updatedData;
    });
};


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
                toast.loading("Please wait! Verifying the assets",{duration:2000});
                //result
                const result= await ValidateAsset(reciept[0],formData.file)
                if(result.valid){
                  toast.loading("Generating validation report");
                }
                else{
                  toast.loading("Generating issues report")
                }
                const buffer=await formData.file.arrayBuffer()
                //report generation
                GenerateReport({
                  orgName:formData?.organisationName,
                  email:auth?.user?.email,
                  dob:formData.dob,
                  entityType:formData?.entityName,
                  certBuffer:buffer,
                  textSim:result?.textSimilarity,
                  structureSim:result?.imageSimilarity  ,
                  isValid:result?.valid,
                  timestamp: new Date().toLocaleString()
                })
                toast.success("Validation Successfully done",{duration:2000})
                setTimeout(()=>{
                window.location.reload();
                },2000)
                }
                else{
                    console.log("Invalid email for retrieving certifcate")
                    
                }
            }
        } catch (error) {
            console.log(error)
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
          <h1 className="form-heading">Validate Digital Certificates</h1>
          <br />
          <form onSubmit={handleSubmit}>
          <label>Individual Email</label>
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
            <label>Select Entity to validate</label>
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
            <label>Please upload assets (PDF only)</label>
            <div className="file-input-container">
              <input
                type="file"
                id="file"
                name="file"
                accept=".pdf,.docx"
                onChange={handleChange}
              />
              <div className="file-input-label">
                {formData.file ? formData.file.name : "Choose file"}
              </div>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Validating your certificate..." : "Validate Asset"}
            </button>
          </form>
          <p className="help-txt">Can&#39;t able to validate assets?{" "}Go to {" "}
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

export default FormValidate