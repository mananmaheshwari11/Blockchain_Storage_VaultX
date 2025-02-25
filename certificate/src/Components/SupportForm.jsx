import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SupportForm.css';


// eslint-disable-next-line react/prop-types
const SupportForm = ({ organisations = [], onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    organisation: '',
    problem: '',
    details: '',
    email: '',
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // You can add validation here if needed
    
    if (onSubmit) {
      onSubmit(formData);
    }
    
    // Show success message
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        organisation: '',
        problem: '',
        details: '',
        email: '',
        priority: 'medium'
      });
    }, 3000);
  };

  return (
    <motion.div 
      className="support-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="support-form-header">
        <h2>Contact Support</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form 
            key="form"
            className="support-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="form-group">
              <label htmlFor="organisation">Organisation</label>
              <select 
                id="organisation" 
                name="organisation"
                value={formData.organisation}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select your organisation</option>
                {organisations.length > 0 ? (
                  organisations.map((org, index) => (
                    <option key={index} value={org.id || org.name}>{org.name}</option>
                  ))
                ) : (
                  <>
                    <option value="org1">VaultX Enterprise</option>
                    <option value="org2">SecureVault Inc.</option>
                    <option value="org3">DataSafe Solutions</option>
                  </>
                )}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="details">Detailed Description</label>
              <textarea 
                id="details" 
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Please describe your issue in detail..."
                rows="6"
                required
              ></textarea>
              <div className="character-count">
                {formData.details.length}/500 characters
              </div>
            </div>
            <button type="submit" className="submit-button">
              Submit Support Request
            </button>
          </motion.form>
        ) : (
          <motion.div 
            key="success"
            className="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="success-icon">✓</div>
            <h3>Support Request Submitted</h3>
            <p>Thank you for contacting us. Our support team will get back to you shortly.</p>
            <p className="ticket-reference">Reference: #{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SupportForm;