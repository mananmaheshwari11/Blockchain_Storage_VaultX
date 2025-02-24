import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./auth.styles.css";
import toast from "react-hot-toast";

const Signup = () => {
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
      if (formData.password != formData.cfmpwd) {
        setError("Password mismatch");
        return;
      }
      const { data } = await axios.post("/api/auth/", {
        name: formData.name,
        location: formData.location,
        email: formData.email,
        password: formData.password,
      });
      if (data.success) {
        toast.success(data.message,{duration:1000})
        setSuccessMessage(`Registered successfully!`);
        setTimeout(()=>{
        navigate("/signin");
        },2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Error registering organisation");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="signup-container">
      <div className="form-img">
        <img src="/signup.avif" alt="Sign-up Image" className="sognup-image" />
      </div>
      <div className="form-container">
        <div className="form-subcontainer">
          <h1 className="form-heading">Signup your Organisation</h1>
          <h3 className="form-subheading">
            {" "}
            Register your organisation for one-step solution
          </h3>
          <div className="form-content">
            <form onSubmit={handleSubmit}>
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
              <div className="input-group">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Organisation Email"
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Set your Password"
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="cfmpwd"
                  value={formData.cfmpwd}
                  onChange={handleChange}
                  required
                  placeholder="Confirm Password"
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </button>
              <p>
              New to VaultX?
              <Link className="link" to="/signin">
                Login
              </Link>
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
