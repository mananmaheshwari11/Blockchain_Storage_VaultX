import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./auth.styles.css";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";

const Signin = () => {
  const [userType, setUserType] = useState("organisation");
  const [formData, setFormData] = useState({
    email:"",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [auth,setAuth]=useAuth()

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
  try {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    const { data } = await axios.post(`/api/auth/${userType==="individual"?"individual/login":"/user"}`, {
      email: formData.email,
      password: formData.password,
    });
    if (data.success) {
      toast.success(data.message,{duration:1000});
      setSuccessMessage(data.message);
      localStorage.setItem("token", JSON.stringify(data.token));
      setAuth({
        ...auth,
        token:data.token
      })
      console.log(auth)
      setTimeout(() => {
        navigate("/vault", { replace: true })
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    setError(error?.response?.data?.message);
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
                  Signin to VaultX 
              </h1>
              <h3 className="form-subheading">
                {userType === "organisation"
                  ? "Signin to your organisation VaultX"
                  : "Signin to personal  VaultX"}
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
                </motion.div>
              </AnimatePresence>

              {error && <div className="error-message">{error}</div>}
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
              
              <button type="submit" disabled={isLoading} className="submit-btn">
                {isLoading ? "Logging you in..." : "Login"}
              </button>
              
              <p className="login-text">
                Already have an account?{" "}
                <Link className="link" to="/signup">
                  Register
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

export default Signin;