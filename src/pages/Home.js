import React from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Categories from '../components/Categories/Categories';
import 'bootstrap/dist/css/bootstrap.css';

const CustomLink = ({ to, pageName }) => {
  const resolved = useResolvedPath(to);
  const isActive = useMatch({ path: resolved.pathname, end: true });
  return (
    <li className={`item ${isActive ? "active" : ""}`}>
      <Link to={to}>{pageName}</Link>
    </li>
  );
};

const Home = () => {
  return (
    <>
      <div className='row'>
        <div className='col-lg-3'>
          <Categories data="test" />
        </div>
        <div className='col-lg-9'>
          <CustomLink to="/projects" pageName="Projects" />
        </div>
      </div>
    </>
  )
}

export default Home