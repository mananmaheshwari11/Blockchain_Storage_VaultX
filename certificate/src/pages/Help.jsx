import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Help.css';
import SupportForm from '../Components/SupportForm';
import axios from 'axios';


const HelpPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [org,setOrg]=useState([])
  const [activeIndex, setActiveIndex] = useState(null);
  const [showSupportForm, setShowSupportForm] = useState(false);

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
  useEffect(() => {
    // In a real app, you would fetch the file
    // This is a simulation of reading the file
    fetch('/faq.txt')
      .then(response => response.text())
      .then(text => {
        const faqEntries = text.split('%%').filter(entry => entry.trim() !== '');
        const parsedFaqs = faqEntries.map(entry => {
          const lines = entry.trim().split('\n');
          const question = lines[0].trim();
          const answer = lines.slice(1).join('\n').trim();
          return { question, answer };
        });
        setFaqs(parsedFaqs);
      })
      .catch(error => {
        console.error('Error loading FAQs:', error);
      });
  }, []);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const handleSupportSubmit = (formData) => {
    console.log('Support request submitted:', formData);
    // Send the data to your backend API
    // axios.post('/api/support', formData);
  };
  return (
    <div className="help-container">
      <motion.div 
        className="header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="gradient-title">VaultX Help Center</h1>
        <p className="subtitle">Find answers to your most common questions</p>
      </motion.div>

      <div className="content-container">
        <motion.div 
          className="faq-column"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2>Frequently Asked Questions</h2>
          {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
            <motion.div 
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div 
                className="faq-question" 
                onClick={() => toggleFaq(index)}
              >
                <h3>{faq.question}</h3>
                <span className="icon">{activeIndex === index ? '−' : '+'}</span>
              </div>
              <motion.div 
                className="faq-answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeIndex === index ? 'auto' : 0,
                  opacity: activeIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <p>{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="faq-column"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2>More Information</h2>
          {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => (
            <motion.div 
              key={index + Math.ceil(faqs.length / 2)}
              className={`faq-item ${activeIndex === (index + Math.ceil(faqs.length / 2)) ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (index + Math.ceil(faqs.length / 2)) * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div 
                className="faq-question" 
                onClick={() => toggleFaq(index + Math.ceil(faqs.length / 2))}
              >
                <h3>{faq.question}</h3>
                <span className="icon">{activeIndex === (index + Math.ceil(faqs.length / 2)) ? '−' : '+'}</span>
              </div>
              <motion.div 
                className="faq-answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeIndex === (index + Math.ceil(faqs.length / 2)) ? 'auto' : 0,
                  opacity: activeIndex === (index + Math.ceil(faqs.length / 2)) ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <p>{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div className="footer">
  <p>
    Can&apos;t find what you&apos;re looking for?{" "}
    <a href="#" onClick={(e) => {
      e.preventDefault();
      setShowSupportForm(true);
    }}>
      Contact Support
    </a>
  </p>
</motion.div>
{showSupportForm && (
  <div className="modal-overlay">
    <SupportForm
      organisations={org}
      onSubmit={handleSupportSubmit}
      onClose={() => setShowSupportForm(false)}
    />
  </div>
)}
    </div>
  );
};

export default HelpPage;