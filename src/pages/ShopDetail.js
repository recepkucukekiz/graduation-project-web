import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../const";
import { ToastContainer, toast } from 'react-toastify';
import "./shopdetail.css";
const ShopDetail = () => {
  let params = useParams();
  var shop = data.filter(shop => shop.id == params.id);
  shop = shop[0];

  const [selectedWorker, setSelectedWorker] = useState("");
  const [selectedService, setSelectedService] = useState("");

  return (
    <>
      <h3>{params.id}</h3>
      <p>{shop.name}</p>

      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column mx-2 align-items-start">
          <p>{shop.name}</p>
          <p>{shop.services}</p>
        </div>
        <div className="d-flex flex-column mx-2">
          <p>{shop.working_hours}</p>
          <p>{shop.city} / {shop.district}</p>
        </div>
      </div>

      <div className="d-flex">
        <div className="d-flex justify-content-between w-50 flex-wrap itembox_frame">
          {shop.services.map(item => (
            <div
              className={selectedService == item ? "selected_itembox shopdetail_itembox" : "shopdetail_itembox"}
              onClick={() => {
                if (selectedService == item) {
                  setSelectedService("");
                } else {
                  setSelectedService(item);
                }
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between w-50 flex-wrap itembox_frame">
          {shop.workers.map(item => (
            <div
              className={selectedWorker == item ? "selected_itembox shopdetail_itembox" : "shopdetail_itembox"}
              onClick={() => {
                if (selectedWorker == item) {
                  setSelectedWorker("");
                } else {
                  setSelectedWorker(item);
                }
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div>
        <p>Selected worker is {selectedWorker}</p>
        <p>Selected worker is {selectedService}</p>
      </div>

      <button
        onClick={() => {
          if (selectedWorker && selectedService) {
            console.log("Booked");
            toast("Booked");
          }
          else {
            toast("Please select a worker and a service");
          }
        }}
      >
        Book
      </button>

      <ToastContainer />
    </>
  );
};

export default ShopDetail;
