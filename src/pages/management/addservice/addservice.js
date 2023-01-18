import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { createService } from "../../../services/shopservice";

const AddService = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const shopId = JSON.parse(localStorage.getItem('user')).shopId;

    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();
        console.log(name, price, duration, shopId);
        createService({
            name: name,
            price: price,
            duration: duration,
            shopId: shopId
        }).then((response) => {
            console.log(response);
            toast.success("Service added successfully!");
        }).catch((error) => {
            console.log(error);
            toast.error("Service could not be added!");
        });
    }

    return (
        <><div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Add Service</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input type="text" className="form-control" id="price" placeholder="Enter price" onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="duration">Duration</label>
                            <input type="text" className="form-control" id="duration" placeholder="Enter duration" onChange={(e) => setDuration(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div><ToastContainer /></>
    );
}

export default AddService;
