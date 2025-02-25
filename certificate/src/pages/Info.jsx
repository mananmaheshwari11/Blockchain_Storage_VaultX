// InfoPage.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

function Info() {
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useAuth()
  const [org,setOrg]=useState()
  const [isEditing, setIsEditing] = useState(false);
  const [name,setName]=useState("")
  const [location,setLocation]=useState("")

  useEffect(()=>{
    const fetchOrganisation=async()=>{
      try {
        const {data}=await axios.get(`/api/auth/user/${auth?.user?._id}`)
        if(data.success){
            toast.loading(data.message,{duration:1000})
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
    setName(org?.name)
    setLocation(org?.location)
    },[org])
  
  const handleUpdate = async() => {
    if (isEditing) {
      try {
        const {data}=await axios.put(`/api/auth/user/${auth?.user?._id}`,{name:name,location:location})
        if(data.success){
            toast.success(data.message,{duration:2000})
            setOrg(data.university)
        }
        else{
            toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
    setIsEditing(!isEditing);
  };

  // Styles
  const styles = {
    vaultInfoContainer: {
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
      width: '90%',
      maxWidth: '1200px',
      height: '90vh',
      maxHeight: '700px',
      padding: '30px',
      position: 'relative',
      overflow: 'hidden',
      background: 'white',
      margin: '0 auto',
    },
    vaultInfoContainerBefore: {
      content: '""',
      position: 'absolute',
      top: '-50px',
      right: '-50px',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(46, 204, 113, 0.1) 100%)',
      zIndex: 0,
    },
    vaultInfoContainerAfter: {
      content: '""',
      position: 'absolute',
      bottom: '-50px',
      left: '-50px',
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.1) 0%, rgba(241, 196, 15, 0.1) 100%)',
      zIndex: 0,
    },
    vaultInfoHeading: {
      fontSize: '2.2rem',
      color: '#2c3e50',
      marginBottom: '30px',
      position: 'relative',
      zIndex: 1,
      fontWeight: 700,
      borderBottom: '4px solid #3498db',
      display: 'inline-block',
      paddingBottom: '5px',
      fontFamily: '"Poppins", sans-serif',
    },
    vaultInfoContent: {
      display: 'grid',
      gridTemplateColumns: '25% 75%',
      gap: '30px',
      height: 'calc(100% - 80px)',
      position: 'relative',
      zIndex: 1,
    },
    vaultInfoLeftColumn: {
      background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
      borderRadius: '15px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '30px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    },
    vaultInfoRightColumn: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '15px',
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    },
    vaultInfoSvgIcon: {
      width: '80%',
      height: 'auto',
      marginBottom: '30px',
    },
    vaultInfoIndividualIcon: {
      color: '#3498db',
    },
    vaultInfoOrgIcon: {
      color: '#2ecc71',
    },
    vaultInfoToggleButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: '"Poppins", sans-serif',
    },
    vaultInfoUpdateButton: {
      backgroundColor: '#27ae60',
      color: 'white',
      border: 'none',
      padding: '12px 30px',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: 600,
      cursor: 'pointer',
      alignSelf: 'flex-start',
      transition: 'all 0.3s ease',
      marginTop: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: '"Poppins", sans-serif',
    },
    vaultInfoInfoItem: {
      marginBottom: '25px',
    },
    vaultInfoLabel: {
      display: 'block',
      fontSize: '1rem',
      fontWeight: 600,
      color: '#7f8c8d',
      marginBottom: '8px',
      fontFamily: '"Poppins", sans-serif',
    },
    vaultInfoValue: {
      fontSize: '1.2rem',
      color: '#2c3e50',
      padding: '10px 0',
      borderBottom: '2px solid #ecf0f1',
      fontFamily: '"Poppins", sans-serif',
    },
    vaultInfoFormGroup: {
      marginBottom: '20px',
    },
    vaultInfoInput: {
      width: '100%',
      padding: '12px 15px',
      border: '2px solid #ecf0f1',
      borderRadius: '8px',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
      fontFamily: '"Poppins", sans-serif',
    },
    vaultInfoImageContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20px',
    },
    vaultInfoImage: {
      maxWidth: '100%',
      maxHeight: '300px',
      borderRadius: '15px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    },
    vaultInfoForm: {
      flex: 1,
    },
    vaultInfoDisplay: {
      flex: 1,
    },
  };
  
  return (
    <div style={styles.vaultInfoContainer}>
      <div style={styles.vaultInfoContainerBefore}></div>
      <div style={styles.vaultInfoContainerAfter}></div>
      
      <h1 style={styles.vaultInfoHeading}>
        {auth?.user?.role === 0 ? "Individual Info" : "Organisation Info"}
      </h1>
      
      <div style={styles.vaultInfoContent}>
        <motion.div 
          style={styles.vaultInfoLeftColumn}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {auth.user.role === 0 ? (
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{...styles.vaultInfoSvgIcon, ...styles.vaultInfoIndividualIcon}}
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{ 
                fill: ['rgba(52, 152, 219, 0)', 'rgba(52, 152, 219, 0.2)', 'rgba(52, 152, 219, 0)'],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </motion.svg>
          ) : (
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{...styles.vaultInfoSvgIcon, ...styles.vaultInfoOrgIcon}}
              whileHover={{ scale: 1.1, rotate: -5 }}
              animate={{ 
                fill: ['rgba(46, 204, 113, 0)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0)'],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </motion.svg>
          )}
          
        </motion.div>
        
        <motion.div 
          style={styles.vaultInfoRightColumn}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {auth.user.role === 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {isEditing ? (
                <div style={styles.vaultInfoForm}>
                  <div style={styles.vaultInfoFormGroup}>
                    <label style={styles.vaultInfoLabel}>Name</label>
                    <input 
                      style={styles.vaultInfoInput}
                      type="text" 
                      name="name" 
                      value={name} 
                      onChange={(e)=>{setName(e.target.value)}} 
                    />
                  </div>
                  
                  <div style={styles.vaultInfoFormGroup}>
                    <label style={styles.vaultInfoLabel}>Location</label>
                    <input 
                      style={styles.vaultInfoInput}
                      type="text" 
                      name="location" 
                      value={location} 
                      onChange={(e)=>{setLocation(e.target.value)}} 
                    />
                  </div>
                  
                  <div style={styles.vaultInfoFormGroup}>
                    <label style={styles.vaultInfoLabel}>Email</label>
                    <input 
                      style={styles.vaultInfoInput}
                      type="email" 
                      name="email" 
                      value={org.email} 
                      disabled
                    />
                  </div>
                </div>
              ) : (
                <div style={styles.vaultInfoDisplay}>
                  <div style={styles.vaultInfoInfoItem}>
                    <label style={styles.vaultInfoLabel}>Name</label>
                    <p style={styles.vaultInfoValue}>{org?.name}</p>
                  </div>
                  
                  <div style={styles.vaultInfoInfoItem}>
                    <label style={styles.vaultInfoLabel}>Location</label>
                    <p style={styles.vaultInfoValue}>{org?.location}</p>
                  </div>
                  
                  <div style={styles.vaultInfoInfoItem}>
                    <label style={styles.vaultInfoLabel}>Email</label>
                    <p style={styles.vaultInfoValue}>{org?.email}</p>
                  </div>
                </div>
              )}
              
              <motion.button 
                style={styles.vaultInfoUpdateButton}
                onClick={handleUpdate}
                whileHover={{ scale: 1.05, backgroundColor: "#219653" }}
                whileTap={{ scale: 0.95 }}
              >
                {isEditing ? "Save" : "Update"}
              </motion.button>
            </div>
          ) : (
            <div style={{ height: '100%' }}>
              <div style={styles.vaultInfoInfoItem}>
                <label style={styles.vaultInfoLabel}>Email</label>
                <p style={styles.vaultInfoValue}>{auth?.user?.email}</p>
              </div>
              
              <motion.div 
                style={styles.vaultInfoImageContainer}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.img 
                  src="/logo.webp" 
                  alt="Individual" 
                  style={styles.vaultInfoImage}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
                  }}
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    y: { 
                      duration: 3, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }
                  }}
                />
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Info;