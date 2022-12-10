import React from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Categories from '../components/Categories/Categories';
import 'bootstrap/dist/css/bootstrap.css';
import ShopList from '../components/ShopList/ShopList';
import FilterBox from '../components/FilterBox/FilterBox';

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
          <Categories data={["a","b","c"]} />
        </div>
        <div className='col-lg-9'>
          {/* <CustomLink to="/projects" pageName="Projects" /> */}
          <FilterBox />
          <ShopList />
        </div>
      </div>
    </>
  )
}

export default Home