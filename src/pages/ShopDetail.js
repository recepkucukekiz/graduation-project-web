import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "./shopdetail.css";
import AvailabilityPicker from "../components/calendartest/availabilityPicker";
import { getShopById, getServiceByShopId, getByShopId } from "../services/shopservice";

const ShopDetail = () => {
    let params = useParams();
    const [shop, setShop] = useState(null);
    const [services, setServices] = useState(null);
    const [rawServices, setRawServices] = useState(null);
    const [workers, setWorkers] = useState();
    const [rawWorkers, setRawWorkers] = useState();

    const [selectedWorker, setSelectedWorker] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [isWorkerServicePicked, setIsWorkerServicePicked] = useState(false);

    useEffect(() => {
        async function fetchData(){
            getShopById(params.id).then((response) => {
                console.log(response)
                setShop(response);
            }).then(() => {
                getServiceByShopId(params.id).then((response) => {
                    setServices(response);
                    setRawServices(response);
                    console.log(response);
                }).then(() => {
                    getByShopId(params.id).then((response) => {
                        setWorkers(response);
                        setRawWorkers(response);
                        console.log(response);
                    })
                })
            })
        }
        fetchData();
    }, []);


    const serviceWorkerPicker = () => {
        return (
        <>
            <div className="d-flex">
                <div className="col-lg-6">
                    <div className="d-flex justify-content-around flex-wrap itembox_frame">
                        {services.map((item) => {
                            return (
                                <div
                                    className={selectedService == item.id ? "selected_itembox shopdetail_itembox" : "shopdetail_itembox"}
                                    onClick={() => {
                                        if (selectedWorker == 0) {
                                            // setWorkers(shop.workers.filter(worker => worker.services.includes(item)));
                                            setSelectedService(item.id);
                                        } else {
                                            if (selectedService == item.id) {
                                                console.log("trigger");
                                                setSelectedService(null);
                                            } else {
                                                setSelectedService(item.id);
                                            }
                                        }
                                    }}
                                >
                                    <img src="https://www.pngitem.com/pimgs/b/188-1884281_barber-shop-logo-png.png" alt="shop logo" className="service_worker_logo" />
                                    {item.name}
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
                                        // setServices(item.services);
                                        setSelectedWorker(item.id);
                                    } else {
                                        if (selectedWorker == item.id) {
                                            setSelectedWorker(null);
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
    };

    return (
        <>
            {shop && <div className="d-flex justify-content-between align-items-center shop_header">
                <div className="d-flex align-items-center">
                    <img src="https://www.pngitem.com/pimgs/b/188-1884281_barber-shop-logo-png.png" alt="shop logo" className="shop_logo" />
                    <div className="d-flex flex-column align-items-start">
                        {/* <h3>{params.id}</h3> */}
                        <h4>{shop.name}</h4>
                        <p>{shop.category}</p>
                        <p>{shop.description}</p>
                    </div>
                </div>
                <div>
                    <p>{shop.email}</p>
                    <p>{shop.workingHours}</p>
                    <p>{shop.city} / {shop.province}</p>

                </div>
            </div>}


            {workers && (isWorkerServicePicked ? <AvailabilityPicker worker={selectedWorker} service={selectedService} workingTime={shop.workingHours} /> :
                <div className="row">
                    {serviceWorkerPicker()}
                </div>)
            }

            <div>
                {isWorkerServicePicked
                    ? <><button
                        className="btn button"
                        onClick={() => {
                            setIsWorkerServicePicked(false);
                            setSelectedService(null);
                            setSelectedWorker(null);
                            setServices(rawServices);
                            setWorkers(rawWorkers);
                        }}
                    >
                        Back
                    </button></>
                    : <><button
                        className="btn button danger"
                        onClick={() => {
                            setServices(rawServices);
                            setWorkers(rawWorkers);
                            setSelectedWorker(null);
                            setSelectedService(null);
                        }}
                    >
                        Clear
                    </button><button
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
                            Check Availability
                        </button></>
                }


            </div>

            <ToastContainer />
        </>
    );
};

export default ShopDetail;
