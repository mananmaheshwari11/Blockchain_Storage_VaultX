import  { useState, useEffect } from 'react';
import { Loader2, X } from 'lucide-react';
import './Spinner.styles.css';
import { useNavigate } from 'react-router-dom';

const LoadingSpinner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <div className="spinner-wrapper">
          <Loader2 className="spinner" />
          <span className="loading-text">Loading...</span>
        </div>
      ) : (
        <div className="error-card">
          <div className="error-icon-wrapper">
            <X className="error-icon" />
          </div>
          <span className="error-text">Unauthorized Authorization</span>
    <button className='error-btn' onClick={()=>{navigate('/signin')}}>Login to Start</button>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;