import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
const Navbar = () => {
    const [auth,setAuth]=useAuth();
  const navigate = useNavigate();
    const handleLogout = () => {
        toast.success("Logout Successfully");
        localStorage.removeItem("token");
        setAuth({
          ...auth,
          token:"",
          user:null
        })
        navigate("/");
      };
  return (
    <nav className="navbar">
    <div className="brand">
      <h1>VaultX</h1>
    </div>
    <div className="nav-buttons">
      <Link to="/about" className="nav-btn">About</Link>
      <Link to="/help" className="nav-btn">
        Help
        </Link>
      {auth?.user ? (
        <>
        {auth?.user?.role==1?(
          <>
          <Link to="/vault/org/entities" className="nav-btn">Entities</Link>
          <div className="dropdown">
            <button className="dropdown-btn">Organisation</button>
            <div className="dropdown-content">
              <Link to="/vault/info">Organisation Info</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          </>):(
            <>
             <div className="dropdown">
            <button className="dropdown-btn">Profile</button>
            <div className="dropdown-content">
              <Link to="/vault/info">Profile Info</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
            </>)}
          
        </>
      ) : (
        <>
          <Link to="/signin" className="nav-btn signin">
            Sign In
          </Link>
        </>
      )}
    </div>
  </nav>

  )
}

export default Navbar