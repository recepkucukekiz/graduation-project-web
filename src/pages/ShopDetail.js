import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../const";
import { ToastContainer, toast } from 'react-toastify';
import "./shopdetail.css";
import AvailabilityPicker from "../components/calendartest/availabilityPicker";

const ShopDetail = () => {
    let params = useParams();
    var shop = data.filter(shop => shop.id == params.id);
    shop = shop[0];

    const [selectedWorker, setSelectedWorker] = useState(0);
    const [selectedService, setSelectedService] = useState("");
    const [services, setServices] = useState(shop.services);
    const [workers, setWorkers] = useState(shop.workers);
    const [isWorkerServicePicked, setIsWorkerServicePicked] = useState(false);


    const serviceWorkerPicker = (
        <><div className="d-flex">
            <div className="d-flex justify-content-between w-50 flex-wrap itembox_frame">
                {services.map((item) => {
                    return (
                        <div
                            className={selectedService == item ? "selected_itembox shopdetail_itembox" : "shopdetail_itembox"}
                            onClick={() => {
                                if (selectedWorker == 0) {
                                    setWorkers(shop.workers.filter(worker => worker.services.includes(item)));
                                    setSelectedService(item);
                                } else {
                                    if (selectedService == item) {
                                        console.log("trigger");
                                        setSelectedService("");
                                    } else {
                                        setSelectedService(item);
                                    }
                                }
                            } }
                        >
                            {item}
                        </div>);
                })}
            </div>

            <div className="d-flex justify-content-between w-50 flex-wrap itembox_frame">
                {workers.map(item => (
                    <div
                        className={selectedWorker == item.id ? "selected_itembox shopdetail_itembox" : "shopdetail_itembox"}
                        onClick={() => {
                            if (selectedService == "") {
                                setServices(item.services);
                                setSelectedWorker(item.id);
                            } else {
                                if (selectedWorker == item.id) {
                                    setSelectedWorker(0);
                                } else {
                                    setSelectedWorker(item.id);
                                }
                            }
                        } }
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div><div>
                <p>Selected service is {selectedService}</p>
                <p>Selected worker is
                    {(() => {
                        if (selectedWorker != 0) {
                            return " " + selectedWorker;
                        }
                        else {
                            return "";
                        }
                    })()}
                </p>
            </div><button
                onClick={() => {
                    if (selectedWorker && selectedService) {
                        console.log(selectedService + " " + selectedWorker);
                        toast("service and worker selected");
                        setIsWorkerServicePicked(true);
                    }
                    else {
                        toast("Please select a worker and a service");
                    }
                } }
            >
                Book
            </button><button
                onClick={() => {
                    setServices(shop.services);
                    setWorkers(shop.workers);
                    setSelectedWorker(0);
                    setSelectedService("");
                } }
            >
                Clean
            </button></>
    );

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

            {isWorkerServicePicked ? <AvailabilityPicker /> : serviceWorkerPicker}

            <ToastContainer />
        </>
    );
};

export default ShopDetail;
