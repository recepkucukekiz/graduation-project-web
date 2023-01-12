import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./navbar.css";

const CustomLink = ({ to, pageName }) => {
  const resolved = useResolvedPath(to);
  const isActive = useMatch({ path: resolved.pathname, end: true });
  return (
    <li className={`item ${isActive ? "active" : ""}`}>
      <Link to={to}>{pageName}</Link>
    </li>
  );
};

const Navbar = () => {
    const isLoggedin = () => {
        if (localStorage.getItem("user") != null) {
            return <li className={`item`}>
            <span
                onClick={() => {
                    localStorage.removeItem("user");
                    window.location.reload();
                }}
            >
                Logout
            </span>
          </li>
        } else {
            return <CustomLink to="/login" pageName="Login" />
        }
    }
  return (
    <nav className="app__navbar">
      <Link className="app__header" to="/">
        Bitirme
      </Link>
      <ul className="nav__list">
        <CustomLink to="/about" pageName="About" />
        <CustomLink to="/login" pageName="Login" />
        <CustomLink to="/signup" pageName="Sign Up" />
        <CustomLink to="/dashboard" pageName="Dashboard" />
        { isLoggedin() }
      </ul>
    </nav>
  );
};

export default Navbar;
