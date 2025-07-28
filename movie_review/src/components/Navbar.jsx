import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/Navbar.css";

function NavBar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
            <div className="user-section">
              <span className="user-email">{user.email}</span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          </>
        ) : (
          <Link to="/auth" className="nav-link">Sign In</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;