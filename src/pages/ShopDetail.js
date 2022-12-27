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
        <>
            <div className="d-flex">
                <div className="col-lg-6">
                    <div className="d-flex justify-content-around flex-wrap itembox_frame">
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
                                    }}
                                >
                                    <img src="https://www.pngitem.com/pimgs/b/188-1884281_barber-shop-logo-png.png" alt="shop logo" className="service_worker_logo" />
                                    {item}
                                </div>);
                        })}
                    </div>
                </div>
            
                <div className="col-lg-6">
                    <div className="d-flex justify-content-around flex-wrap itembox_frame">
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
                                }}
                            >
                                <img src="https://www.pngitem.com/pimgs/b/188-1884281_barber-shop-logo-png.png" alt="shop logo" className="service_worker_logo" />
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
        </div>
        </>
    );

    return (
        <>
            <div className="d-flex justify-content-between align-items-center shop_header">
                <div className="d-flex align-items-center">
                    <img src="https://www.pngitem.com/pimgs/b/188-1884281_barber-shop-logo-png.png" alt="shop logo" className="shop_logo" />
                    <div className="d-flex flex-column align-items-start">
                        {/* <h3>{params.id}</h3> */}
                        <h4>{shop.name}</h4>
                        <p>{shop.category}</p>
                    </div>
                </div>
                <div>

                    <p>{shop.working_hours}</p>
                    <p>{shop.city} / {shop.district}</p>

                </div>
            </div>
            
            {isWorkerServicePicked ? <AvailabilityPicker worker={selectedWorker} service={selectedService} /> :
                <div className="row">
                    {serviceWorkerPicker}
                    {/* {isWorkerServicePicked ? <AvailabilityPicker worker={selectedWorker} service={selectedService} /> : "Select Service and Worker to see availability"} */}
                    {/* {selectedService!="" && selectedWorker!=0 ? <AvailabilityPicker worker={selectedWorker} service={selectedService} /> : <p className="itembox_frame" style={{color:"white"}}>Select Service and Worker to see availability</p>} */}
                    
                </div>
            }

            <div>
                <button
                    className="btn button danger"
                    onClick={() => {
                        setServices(shop.services);
                        setWorkers(shop.workers);
                        setSelectedWorker(0);
                        setSelectedService("");
                    }}
                >
                    Clear
                </button>
                
                <button
                    className="btn button"
                    onClick={() => {
                        if (selectedWorker && selectedService) {
                            console.log(selectedService + " " + selectedWorker);
                            toast("service and worker selected");
                            setIsWorkerServicePicked(true);
                        }
                        else {
                            toast("Please select a worker and a service");
                        }
                    }}
                >
                    Book
                </button>

                <button
                    className="btn button"
                    onClick={() => {
                        setIsWorkerServicePicked(false);
                    }}
                >
                    Back
                </button>
            </div>

            <ToastContainer />
        </>
    );
};

export default ShopDetail;
