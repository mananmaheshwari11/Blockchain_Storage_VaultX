import { useEffect, useState } from 'react';
import './UploadForm.css';
import { connectMetaMask, uploadCertificate, uploadFile } from '../provider/ContractProvider';
import contract from '../provider/Contract';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../Context/AuthContext';
const UpdateForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    dob: "",
    type:"",
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [blockaddress,setBlockAddress]=useState(null);
  const [entities,setEntities]=useState(null)
  // eslint-disable-next-line no-unused-vars
  const [auth,setAuth]=useAuth()

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files && files[0]) {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      formData.email &&
      emailRegex.test(formData.email) &&
      formData.dob &&
      formData.file &&
      formData.type &&
      formData.file.type === 'application/pdf'
    );
  };

useEffect(()=>{
    const fetchTypes=async()=>{
      try {
        const {data}=await axios.get(`/api/auth/types/${auth?.user?._id}`)
        if(data.success){
          setEntities(data.types);
        }
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
      }
    }
    fetchTypes();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

useEffect(() => {  // Ensure contract is available

  // eslint-disable-next-line no-unused-vars
  const handleCertificateCreated = async(blockNumber, uniqueHash, email, pdfHash, dob, issuer) => {
    setBlockAddress(blockNumber);
  };

  contract.on("CertificateCreated", handleCertificateCreated);

  return () => {
      contract.off("CertificateCreated", handleCertificateCreated); // Cleanup listener on unmount
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [contract]); 

useEffect(() => {
    console.log("humare pass blockAddress hai",blockaddress)
  if (blockaddress) { // Run only when blockaddress is updated
    console.log("axios start ho rha hai")
    axios.put(`/api/auth/user`, {
      email: formData.email,
      dob: formData.dob,
      block: blockaddress,
      type: formData.type
    })
    .then(({ data }) => {
      if (data.success) {
        toast.success(data.message,{duration:2000})
      }
    else{
        toast.error(data.message,{duration:3000})
    }
    setFormData({
        email:"",
        dob:"",
        file:null,
        type:""
      })
    setBlockAddress(null)
    })
    .catch(error => {
    console.log('Upload failed:', error);
    toast.error(error?.response?.data?.message)
  });
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [blockaddress]);

  const handleSubmit = async (e) => {
    console.log("started the work")
    e.preventDefault();
    console.log("started the work again")
    if (!validateForm()) return;
    setIsLoading(true);
    await connectMetaMask()
    try {
      const response = await uploadFile(formData.file);
      // eslint-disable-next-line no-unused-vars
      const reciept=await uploadCertificate(formData.email,response.data.Hash);
    } catch (error) {
      console.log('Upload failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="form-img">
        <img src="/upload.jpg" alt="Sign-up Image" className="signup-image" />
      </div>
      <div className="form-container">
        <div className="form-subcontainer">
          <h1 className="form-heading">Update Certificates</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter Email on which update required"
              />
            </div>
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
            <div className="input-group entity-dropdown-container">
                <select 
                  name="type" 
                  value={formData.type || ''} 
                  onChange={handleChange}
                  className="entity-select"
                  required
                >
                  <option value="" default>Select Entity which has to update</option>
                  {entities?.map((entity) => (
                    <option key={entity.name} value={entity._id}>
                      {entity.name}
                    </option>
                  ))}
                </select>
            </div>
            <div className="file-input-container">
              <input
                type="file"
                id="file"
                name="file"
                accept=".pdf,.docx"
                onChange={handleChange}
              />
              <div className="file-input-label">
                {formData.file ? formData.file.name : "Choose Updated File"}
              </div>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update file"}
            </button>
          <label>Only for file updation. Once updated previous record vanish forever</label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;