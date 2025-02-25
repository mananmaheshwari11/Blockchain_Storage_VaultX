import { useEffect, useState } from "react"
import { useAuth } from "../Context/AuthContext"
import axios from "axios"
import toast from "react-hot-toast"
import moment from "moment"
import './Entities.styles.css'
import '../Components/Modals.styles.css'
import UpdateEntityModal from "../Components/UpdateModal"

const Entities = () => {
    const [entities,setEntities]=useState([])
    // eslint-disable-next-line no-unused-vars
    const [auth,setAuth]=useAuth()
    const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
    const openModal = (entity) => {
      setSelectedEntity(entity); 
      setModalOpen(true);
    };
    useEffect(()=>{
        const fetchTypes=async()=>{
            try {
                const {data}=await axios.get(`/api/auth/types/${auth?.user?._id}`)
                if(data.success){
                    toast.loading(data.message,{duration:3000});
                  setEntities(data.types);
                }
              } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.message)
              }
            }
        fetchTypes()
    },[])
  return (
    <div className="entity-page-container">
      <h1 className="entity-page-title">Digital Entity</h1>
      
      <div className="table-container">
        <table className="entity-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Entity Name</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entities?.map((entity, index) => (
              <tr key={entity._id}>
                <td>{index + 1}</td>
                <td>{entity.name}</td>
                <td>{moment(entity.createdAt).format("DD-MM-YYYY")}</td>
                <td>
                  <button className="update-button" onClick={()=>{openModal(entity)}}>Update</button>
                </td>
              </tr>
            ))}
            {entities?.length === 0 && (
              <tr>
                <td colSpan="4" className="no-data">No entities found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    <UpdateEntityModal isOpen={isModalOpen} onClose={()=>{setModalOpen(false)}} entity={selectedEntity}/>
    </div>
  )
}

export default Entities