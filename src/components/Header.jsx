import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.webp";
import "../ComponentCss/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/">
          <img src={Logo} alt="MovieDB Logo" className="logo" />
        </Link>

        <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
          <Link to="/popular" className="nav-link" onClick={toggleMenu}>
            Popular
          </Link>
          <Link to="/top-rated" className="nav-link" onClick={toggleMenu}>
            Top Rated
          </Link>
          <Link to="/upcoming" className="nav-link" onClick={toggleMenu}>
            Upcoming
          </Link>
        </nav>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
