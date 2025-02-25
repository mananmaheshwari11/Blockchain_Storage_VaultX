import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./auth.styles.css";
import toast from "react-hot-toast";

const Signup = () => {
  const [userType, setUserType] = useState("organisation");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cfmpwd: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleTypeChange = (type) => {
    setUserType(type);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (formData.password !== formData.cfmpwd) {
        setError("Password mismatch");
        setIsLoading(false);
        return;
      }
      // Create the payload based on user type
      if(userType==="individual"){
      const { data } = await axios.post(`/api/auth/individual`,{email:formData.email,password:formData.password});
      if (data.success) {
        toast.success(data.message, { duration: 1000 });
        setSuccessMessage(`Registered successfully!`);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        setError(data.message);
      }
    }
    else{
      const { data } = await axios.post(`/api/auth`,{name:formData.name,email:formData.email,password:formData.password,location:formData.location});
      if (data.success) {
        toast.success(data.message, { duration: 1000 });
        setSuccessMessage(`Registered successfully!`);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        setError(data.message);
      }
    }
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || `Error registering ${userType}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="form-img">
        <img 
          src={"/signup.avif"} 
          alt="Sign-up Image" 
          className="signup-image"
        />
      </div>
      <div className="form-container">
        <div className="form-subcontainer">
          <div className="user-type-selector">
            <button 
              type="button" 
              className={`type-btn ${userType === "organisation" ? "active" : ""}`}
              onClick={() => handleTypeChange("organisation")}
            >
              Organisation
            </button>
            <button 
              type="button" 
              className={`type-btn ${userType === "individual" ? "active" : ""}`}
              onClick={() => handleTypeChange("individual")}
            >
              Individual
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={userType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="form-heading">
                {userType === "organisation" 
                  ? "Signup your Organisation" 
                  : "Signup as Individual"}
              </h1>
              <h3 className="form-subheading">
                {userType === "organisation"
                  ? "Register your organisation for one-step solution"
                  : "Register for personal access to VaultX"}
              </h3>
            </motion.div>
          </AnimatePresence>

          <div className="form-content">
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={userType}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {userType === "organisation" ? (
                    <>
                      <div className="input-group">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Name of the Organisation"
                        />
                      </div>
                      <div className="input-group">
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          placeholder="Location of the Organisation"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                    </>
                  )}

                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={userType === "organisation" ? "Organisation Email" : "Email Address"}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Set your Password"
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="password"
                      name="cfmpwd"
                      value={formData.cfmpwd}
                      onChange={handleChange}
                      required
                      placeholder="Confirm Password"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {error && <div className="error-message">{error}</div>}
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
              
              <button type="submit" disabled={isLoading} className="submit-btn">
                {isLoading ? "Registering..." : "Register"}
              </button>
              
              <p className="login-text">
                Already have an account?{" "}
                <Link className="link" to="/signin">
                  Login
                </Link>{" "}
                Here
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;