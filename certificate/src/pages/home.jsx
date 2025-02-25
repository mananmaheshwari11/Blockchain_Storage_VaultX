import { useNavigate } from "react-router-dom";
import "./home.styles.css";
import Navbar from "../components/Navbar";
import ModalForm from "../Components/Modals";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const HomePage = () => {
  // eslint-disable-next-line no-unused-vars
  const [auth,setAuth]=useAuth();
  const navigate = useNavigate();
  const [modal,setModal]=useState(false)
  return (
    <div className="home-container">
      <Navbar/>
      {/* Hero Section */}
      {auth?.user ? (
        <>
          <section className="hero-section">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="main-heading">
                  Secure Digital Certificates
                  <span className="sub-brand">by VaultX</span>
                </h1>
                <p className="sub-heading">
                  Get storage, retrieval and verification solution in one app
                </p>
          {auth.user?.role==1?
          (<>
          <button
                  className="get-started-btn"
                  onClick={() => {
                    setModal(true)
                    navigate('/vault')
                  }}
                >
                  Create Digital Entity
                </button>
                <button
                  className="get-started-btn"
                  onClick={() => {
                    navigate("/vault/org/upload");
                  }}
                >
                  Upload Digital Assets
                </button>
                <button
                  className="get-started-btn"
                  onClick={() => {
                    navigate("/vault/org/update");
                  }}
                >
                  Update Digital Assets
                </button>
            </>
        ):(
          <>
          <button 
           className="get-started-btn"
           onClick={() => {
             navigate("/vault/retrieve");
           }}
         >
           Get Digital Assets
         </button>
          </>
        )}
                
              </div>
              <div className="hero-image">
                <img
                  src="/credBlock.jpg"
                  alt="Digital Certificates"
                />
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="hero-section">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="main-heading">
                  Secure Digital Certificates
                  <span className="sub-brand">by VaultX</span>
                </h1>
                <p className="sub-heading">
                  Get storage, retrieval and verification solution in one app
                </p>
                <button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="get-started-btn"
                >
                  Get Started with VaultX
                </button>
              </div>
              <div className="hero-image">
                <img
                  src="/credBlock.jpg"
                  alt="Digital Certificates"
                />
              </div>
            </div>
          </section>
          <section className="features-section">
            <h2 className="features-heading">Why Choose VaultX?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon shield"></div>
                <h3>Secure & Immutable</h3>
                <p>
                  Certificates are stored on the blockchain, making them
                  tamper-proof and permanently verifiable.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon verify"></div>
                <h3>Instant Verification</h3>
                <p>
                  Verify certificates instantly without any intermediaries or
                  manual processes.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon integration"></div>
                <h3>Easy Integration</h3>
                <p>
                  Simple integration with existing university systems and
                  workflows.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
      <ModalForm isOpen={modal} onClose={()=>{setModal(false)}}/>
    </div>
  );
};

export default HomePage;
