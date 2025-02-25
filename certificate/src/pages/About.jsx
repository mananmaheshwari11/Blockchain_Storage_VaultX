import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Check, Award, Zap, Database } from 'lucide-react';
import './About.css';

const AboutVaultX = () => {
  useEffect(() => {
    // For intersection observer animations
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="about-container">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="page-title"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
        >
          About VaultX
        </motion.h1>
        <motion.div 
          className="tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Your Digital Certificates, Secured Forever
        </motion.div>
      </motion.div>

      <div className="content-section">
        <div className="two-column-grid">
          <motion.div 
            className="image-column"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
          >
            <div className="image-container">
              <div className="image-bg-shape"></div>
              <motion.img 
                src="/logo_2.webp" 
                alt="VaultX Security" 
                className="main-image"
                animate={{ 
                  y: [0, -10, 0], 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="floating-icon icon-1"
                animate={{ 
                  y: [0, -15, 0], 
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5,
                  ease: "easeInOut"
                }}
              >
                <Shield size={40} />
              </motion.div>
              <motion.div 
                className="floating-icon icon-2"
                animate={{ 
                  y: [0, 15, 0], 
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4.5,
                  ease: "easeInOut", 
                  delay: 0.5
                }}
              >
                <Database size={40} />
              </motion.div>
              <motion.div 
                className="floating-icon icon-3"
                animate={{ 
                  y: [0, 10, 0], 
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3.5,
                  ease: "easeInOut", 
                  delay: 1
                }}
              >
                <Lock size={40} />
              </motion.div>
            </div>
          </motion.div>

          <div className="text-column">
            <div className="animate-on-scroll">
              <h2 className="section-title">Secure Digital Certificate Storage</h2>
              <p className="section-text">
                VaultX is a cutting-edge platform designed to securely store, manage, and verify 
                your digital certificates using advanced encryption and blockchain technology. 
                Our solution ensures that your important credentials remain tamper-proof and 
                easily accessible whenever you need them.
              </p>
            </div>

            <div className="flag-container animate-on-scroll">
              <div className="flag">
                <span className="flag-label">Innovative</span>
              </div>
              <div className="flag">
                <span className="flag-label">Secure</span>
              </div>
              <div className="flag">
                <span className="flag-label">Reliable</span>
              </div>
            </div>

            <div className="advantages-container animate-on-scroll">
              <h3 className="advantages-title">Why Choose VaultX?</h3>
              <ul className="advantages-list">
                <li className="advantage-item">
                  <Check className="check-icon" />
                  <div>
                    <h4>Unbreakable Security</h4>
                    <p>Military-grade encryption protects your sensitive data from unauthorized access.</p>
                  </div>
                </li>
                <li className="advantage-item">
                  <Check className="check-icon" />
                  <div>
                    <h4>Instant Verification</h4>
                    <p>Verify the authenticity of certificates in seconds with our verification system.</p>
                  </div>
                </li>
                <li className="advantage-item">
                  <Check className="check-icon" />
                  <div>
                    <h4>Seamless Sharing</h4>
                    <p>Share your credentials with employers and institutions with just a click.</p>
                  </div>
                </li>
                <li className="advantage-item">
                  <Check className="check-icon" />
                  <div>
                    <h4>Permanent Storage</h4>
                    <p>Never lose important certificates again with our distributed storage system.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section animate-on-scroll">
        <h2 className="features-title">Featured Benefits</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Award className="feature-icon" />
            <h3>Premium Security</h3>
            <p>Cutting-edge encryption keeps your certificates safe.</p>
          </div>
          <div className="feature-card">
            <Zap className="feature-icon" />
            <h3>Lightning Fast</h3>
            <p>Upload and access your certificates in seconds.</p>
          </div>
          <div className="feature-card">
            <Database className="feature-icon" />
            <h3>Unlimited Storage</h3>
            <p>Store all your certificates in one secure location.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutVaultX;