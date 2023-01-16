import React, { useState, useEffect } from "react";
import { getServiceByShopId } from "../../../services/shopservice";

const AddWorker = () => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [worker, setWorker] = useState({
        name: "",
        phone: "",
        email: "",
        services: []
    });
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const shopId = JSON.parse(localStorage.getItem('user')).shopId;
    var options = [];

    useEffect(() => {
        getServiceByShopId(shopId).then((response) => {
            setServices(response);
        })
    },[]);

    const errors = {
        name: "invalid name",
        phone: "invalid phone",
        email: "invalid email",
        services: "invalid services"
    };

    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) => {
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );
    }

    const renderServiceBox = () => {
        if (services !== null) {
            console.log(services);
            options = services.map((service) => {
                return (
                    <option value={service.id}>{service.name}</option>
                )
            })
        }
        return (
            <div className='d-flex justify-content-between w-100'>
                <div className='d-flex flex-column worker-input'>
                    <label>Services</label>
                    <select>
                        {options}
                    </select>
                </div>
                <div className='d-flex flex-column worker-input'>
                    <button
                        className='btn btn-primary'
                        onClick={() => {
                            selectedServices.push(document.querySelector("select").value);
                        }}
                    >
                        Add
                    </button>
                </div>
            </div>
        )
    }

    // JSX code for login form
    const renderForm = () => {
        return (
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Name </label>
                        <input type="text" name="name" required />
                        {renderErrorMessage("name")}
                    </div>
                    <div className="input-container">
                        <label>Phone </label>
                        <input type="text" name="phone" required />
                        {renderErrorMessage("phone")}
                    </div>
                    <div className="input-container">
                        <label>Email </label>
                        <input type="text" name="email" required />
                        {renderErrorMessage("email")}
                    </div>
                    <div className='d-flex justify-content-between w-100'>
                        <div className='d-flex flex-column worker-input'>
                            <label>Services</label>
                            <select name="Services" size="5">
                                {selectedServices.map((service) => {
                                    return (
                                        <option value={service}>{service}</option>
                                    )
                                }
                                )}
                            </select>
                        </div>
                        <div className='d-flex flex-column worker-input'>
                            <label>Add Services</label>
                            <div>
                                {renderServiceBox()}
                                {/* <button
                                        className='btn btn-light'
                                        onClick={() => {
                                            setServices(services => [...services, newService]);
                                        }}
                                    >
                                        Add
                                    </button> */}
                            </div>


                        </div>
                    </div>
                    <div className="button-container">
                        <input type="submit" />
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className="login">
            <h1>Add Worker</h1>
            {renderForm()}
        </div>
    );
};

export default AddWorker;
