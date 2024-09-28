import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.webp";
import "../ComponentCss/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate(); // For navigation

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`); // Navigate to the search route with the query
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
