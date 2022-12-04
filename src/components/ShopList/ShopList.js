import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./shoplist.css";

const ShopList = ({data}) => {
    const cat = [];

    data.forEach((category) => {
        cat.push(<div className="shoplist_item">
            {category}
        </div>)
    })

    return (
        <>
        <div className="app__shoplist">
            {cat}
        </div>
        </>
    );
};

export default ShopList