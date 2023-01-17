import React, { useState, useEffect } from "react";
import { getServiceByShopId, createWorker } from "../../../services/shopservice";

const AddWorker = () => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const shopId = JSON.parse(localStorage.getItem('user')).shopId;
    const [worker, setWorker] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        shopId: shopId,
        services: []
    });
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [newService, setNewService] = useState("");
    var options = [];

    useEffect(() => {
        getServiceByShopId(shopId).then((response) => {
            setServices(response);
        })
    }, []);

    const errors = {
        name: "invalid name",
        phone: "invalid phone",
        email: "invalid email",
        services: "invalid services"
    };

    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();
        worker.services = selectedServices;
        console.log(worker);
        console.log(selectedServices);

        createWorker(worker)
            .then((response) => {
                console.log(response);
                setIsSubmitted(true);
            }
            )
            .catch((error) => {
                console.log(error);
                setErrorMessages(error);
            }
            )

    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) => {
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );
    }

    const renderServiceBox = () => {
        if (services !== null) {
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
                    <select
                        onChange={(e) => {
                            setNewService(e.target.value);
                        }}
                    >
                        <option value="">Select a service</option>
                        {options}
                    </select>
                </div>
            </div>
        )
    }

    // JSX code for login form
    const renderForm = () => {
        return (<>
            <div className="form">
                <form>
                    <div className="input-container">
                        <label>Name </label>
                        <input
                            type="text"
                            defaultValue={worker.name}
                            onChange={(e) => {
                                setWorker({ ...worker, name: e.target.value });
                            }}
                            required
                        />
                        {renderErrorMessage("name")}
                    </div>
                    <div className="input-container">
                        <label>Username </label>
                        <input
                            type="text"
                            defaultValue={worker.username}
                            onChange={(e) => {
                                setWorker({ ...worker, username: e.target.value });
                            }}
                            required
                        />
                        {renderErrorMessage("phone")}
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input
                            type="password"
                            defaultValue={worker.password}
                            onChange={(e) => {
                                setWorker({ ...worker, password: e.target.value });
                            }}
                            required
                        />
                        {renderErrorMessage("phone")}
                    </div>
                    <div className="input-container">
                        <label>Email </label>
                        <input
                            type="text"
                            defaultValue={worker.email}
                            onChange={(e) => {
                                setWorker({ ...worker, email: e.target.value });
                            }}
                            required
                        />
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
                                <button
                                    className='btn btn-light'
                                    type="button"
                                    onClick={() => {
                                        if (selectedServices.includes(newService)) {
                                            alert("Service already added");
                                            return;
                                        } else if (newService === "") {
                                            alert("Please select a service");
                                            return;
                                        } else {
                                            setSelectedServices([...selectedServices, newService]);
                                        }
                                    }}
                                >
                                    Add
                                </button>
                            </div>


                        </div>
                    </div>
                    <div className="button-container">
                        <input
                        type="submit"
                        onClick={handleSubmit}
                        />
                    </div>
                </form>
            </div>
            </>);
    };

    return (
        <div className="login">
            <h1>Add Worker</h1>
            {isSubmitted ? <div className="success">Worker added successfully</div> : null}
            {errorMessages.message ? <div className="error">{errorMessages.message}</div> : null}
            {renderForm()}
        </div>
    );
};

export default AddWorker;
