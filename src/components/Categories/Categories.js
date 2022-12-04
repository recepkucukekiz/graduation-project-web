import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./categories.css";

const Categories = ({data}) => {
    const cat = [];

    data.forEach((category) => {
        cat.push(<div className="category_item">
            {category}
        </div>)
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