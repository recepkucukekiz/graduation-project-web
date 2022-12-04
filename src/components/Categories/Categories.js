import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./categories.css";

const Categories = ({data}) => {
    return (
        <>
        <div className="app__categories">
            <h2>ABC</h2>
            <p>{data}</p>
        </div>
        
        </>
    );
};

export default Categories