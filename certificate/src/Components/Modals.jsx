import { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import './Modals.styles.css';
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast';
// eslint-disable-next-line react/prop-types
const ModalForm = ({ isOpen, onClose }) => {
  const [entityName, setEntityName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [auth,setAuth]=useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data}=await axios.post(`/api/auth/types/${auth?.user?._id}`, { name:entityName });
      if(data.success){
        toast.success(data.message,{duration:1000});
      }
      onClose();
      setEntityName('');
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
          <h2 className="modal-title">Create your Entity Type</h2>
          
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
              Create your Entity
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;