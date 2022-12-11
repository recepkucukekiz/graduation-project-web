import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./categories.css";

const Categories = ({shops, rawShops}) => {
    const cat = [];
    const categories = shops.map((item) => item.category);

    categories.forEach((category) => {
        cat.push(
            <div
                className="category_item"
                onClick={() => {
                    shops = rawShops.filter((item) => item.category == category);
                    console.log(shops);
                }}
            >
                {category}
            </div>
        )
    })

    return (
        <>
            <div className="app__categories">
                {cat}
            </div>
        </>
    );
};

export default Categories
