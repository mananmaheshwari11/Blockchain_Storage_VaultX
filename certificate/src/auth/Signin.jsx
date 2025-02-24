import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./auth.styles.css";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Signin = () => {
  const [auth,setAuth]=useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location=useLocation()
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
      const { data } = await axios.post("/api/auth/user", {
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
          navigate(location.state || "/vault", { replace: true })
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
        <img src="/signin.avif" alt="Sign-up Image" className="sognup-image" />
      </div>
      <div className="form-container">
        <div className="form-subcontainer">
          <h1 className="form-heading">Signin to your Account</h1>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your Email"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Signin"}
            </button>
            <p>
              New to VaultX?  
              <Link className="link" to="/signup">
                Register
              </Link>
               Here
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
