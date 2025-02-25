import { ThumbsDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="not-found-container">
      <div className="icon-wrapper">
        <ThumbsDown className="thumbs-down" />
      </div>
      <div>
      <h1 className="not-found-text">Page Not Found</h1>
      <button onClick={handleGoBack} className="back-button">
        Go Back
      </button>
      </div>
    </div>
  );
};

export default NotFound;