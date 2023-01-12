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
  return (
    <nav className="app__navbar">
      <Link className="app__header" to="/">
        Bitirme
      </Link>
      <ul className="nav__list">
        <CustomLink to="/about" pageName="About" />
        <CustomLink to="/calendar" pageName="Calendar" />
        <CustomLink to="/calendarv2" pageName="CalendarV2" />
        <CustomLink to="/login" pageName="Login" />
        <CustomLink to="/signup" pageName="Sign Up" />
        <CustomLink to="/dashboard" pageName="Dashboard" />
        <CustomLink to="/calendernew" pageName="New Calendar" />
      </ul>
    </nav>
  );
};

export default Navbar;
