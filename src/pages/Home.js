import React from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Categories from '../components/Categories/Categories';
import 'bootstrap/dist/css/bootstrap.css';
import ShopList from '../components/ShopList/ShopList';
import FilterBox from '../components/FilterBox/FilterBox';
import data from '../const';
import './home.css';

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
    const [shops, setShops] = React.useState(data);
    const [rawShops, setRawShops] = React.useState(data);
    const categories = rawShops.map((item) => item.category);
    const categoryBox = [];

    categories.forEach((category) => {
        categoryBox.push(
            <div
                className="category_item"
                onClick={() => {
                    setShops(rawShops.filter((item) => item.category == category));
                }}
            >
                {category}
            </div>
        )
    })

    return (
        <>
            <div className='row'>
                <div className='col-lg-3'>
                    <div className="app__categories">
                        <button
                            className="category_item"
                            onClick={() => {
                                setShops(rawShops);
                            }}
                        > All </button>
                        { categoryBox }
                    </div>
                </div>
                <div className='col-lg-9'>
                    {/* <CustomLink to="/projects" pageName="Projects" /> */}
                    <FilterBox />
                    <ShopList shops={shops} />
                </div>
            </div>
        </>
    )
}

export default Home
