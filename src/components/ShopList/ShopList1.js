import React from "react";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import "./shoplist.css";

const ShopList1 = ({shops}) => {
    const shopView = [];

    const navigate = useNavigate();
    shops.map((shop, index) => {
        shopView.push(
            <div className="shoplist_item"
                onClick={() => {
                    navigate("/shop/" + shop.shopId)
                }}
            >
                <div className="d-flex flex-column mx-2 align-items-center">
                    <img src="https://www.pngitem.com/pimgs/b/188-1884281_barber-shop-logo-png.png" alt="shop logo" className="shoplist_item_logo"/>
                    <p>{shop.name}</p>
                    <p>
                        {/* {
                            shop.services.map((service, index) => {
                                return (
                                    <span className="shoplist_item_service">{service} </span>
                                )
                            })
                        } */}
                    </p>
                </div>
                <div className="d-flex justify-content-between mx-2">
                    <p>{shop.workingTime}</p>
                    <p>{shop.address.city} / {shop.address.district}</p>
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

export default ShopList1
