/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import './Modals.styles.css';
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast';
// eslint-disable-next-line react/prop-types
const UpdateModal = ({ isOpen, onClose , entity }) => {
  const [entityName, setEntityName] = useState('');
  const [id,setId]=useState('')
  // eslint-disable-next-line no-unused-vars
  const [auth,setAuth]=useAuth()
  useEffect(() => {
    if (entity) {
      setEntityName(entity.name || '');
      setId(entity._id)
    }
  }, [entity]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // console.log(entity._id)
      const {data}=await axios.put(`/api/auth/types/${id}`,{name:entityName})
      if(data.success){
        toast.success(data.message,{duration:1000});
      }
      else{
        toast.error(data.message)
      }
      setTimeout(()=>{
        onClose();
        window.location.reload()
      },2000)
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Error occured while creating entity",{duration:1000})
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="unique-entity-close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <div>
          <h2 className="modal-title">Update your Entity</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                placeholder="i.e 1st Year Marksheet"
                className="input-field"
                required
              />
            </div>
            
            <button type="submit" className="submit-button">
              Update your Entity
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;