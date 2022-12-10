import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./shoplist.css";

const ShopList = ({data}) => {
    const shopView = [];

    data.forEach((shop) => {
        shopView.push(<div className="shoplist_item">
            {shop}
        </div>)
    })

    return (
        <>
        <div className="app__shoplist">
            {shopView}
        </div>
        </>
    );
};

export default ShopList