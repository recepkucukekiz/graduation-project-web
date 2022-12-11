import React from "react";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import "./shoplist.css";

const ShopList = ({shops}) => {
    const shopView = [];

    const navigate = useNavigate();
    shops.forEach((shop) => {
        shopView.push(
            <div className="shoplist_item" onClick={() => {
                console.log("clicked" + shop.id)
                navigate("/shop/" + shop.id)
            }}>
                <div className="d-flex flex-column mx-2 align-items-start">
                    <p>{shop.name}</p>
                    <p>
                        {
                            shop.services.map((service) => {
                                return (
                                    <span className="shoplist_item_service">{service} </span>
                                )
                            })
                        }
                    </p>
                </div>
                <div className="d-flex flex-column mx-2">
                    <p>{shop.working_hours}</p>
                    <p>{shop.city} / {shop.district}</p>
                </div>
            </div>
        )
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
