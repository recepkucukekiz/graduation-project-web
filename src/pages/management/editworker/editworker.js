import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import data from '../../../const';
import './editworker.css';
import { getWorkerById, updateWorker, getShopById } from '../../../services/shopservice';

const EditWorker = () => {
    let params = useParams();
    let workerId = params.id;

    const navigate = useNavigate();
    const [worker, setWorker] = useState(null);
    const [shop, setShop] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [newService, setNewService] = useState("");
    var options = [];

    useEffect(() => {
        console.log(workerId);

        // async function fetchData() {
        //     getWorkerById(workerId).then((response) => {
        //         console.log(response);
        //         setWorker(response);
        //         setServices(response.services);
        //     });
        // }

        // fetchData();

        getWorkerById(workerId)
            .then((response) => {
                console.log(response);
                setWorker(response);
                setServices(response.services);
                setError(null);

                getShopById(response.shopId)
                    .then((response) => {
                        console.log(response);
                        setShop(response);
                        setError(null);
                    })
                    .catch((error) => {
                        console.log(error);
                        setError(error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });

            })
            .catch((error) => {
                console.log(error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });

        // getShopById(worker.shopId)
        //     .then((response) => {
        //         console.log(response);
        //         setShop(response);
        //         setError(null);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         setError(error);
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });
    }, []);

    function handleUpdate(event) {
        event.preventDefault();
        console.log("update");

        worker.name = name !== '' ? name : worker.name;
        worker.email = email !== '' ? email : worker.email;
        worker.services = services;

        async function fetchData() {
            await updateWorker(workerId, worker);
        }

        fetchData();
    }

    const renderServiceBox = () => {
        if (shop !== null) {
            options = shop.services.map((service) => {
                return (
                    <option value={service}>{service}</option>
                )
            })
        }
        return (
            <div className='d-flex justify-content-between w-100'>
                <div className='d-flex flex-column worker-input'>
                    <label>Service</label>
                    <select
                        onChange={
                            (e) => setNewService(e.target.value)
                        }
                    >
                        {options}
                    </select>
                </div>
            </div>
        )
    }


    const renderForm = () => {
        if (worker == null) {
            return (<div>Loading...</div>)
        }
        else {
            return (<div className='col-lg-9'>
                <div className='shape_box flex-column'>
                    <form onSubmit={handleUpdate}>
                        <div className='d-flex justify-content-between w-100'>
                            <h5>Worker Information</h5>
                        </div>
                        <div className='d-flex justify-content-between w-100'>
                            <div className='d-flex flex-column worker-input'>
                                <label>Name</label>
                                <input
                                    type="text"
                                    defaultValue={worker.name}
                                    onChange={
                                        (e) => setName(e.target.value)
                                    }
                                />
                            </div>
                            {/* <div className='d-flex flex-column worker-input'>
                            <label>Surname</label>
                            <input
                                type="text"
                                defaultValue={worker.surname}
                                onChange={
                                    (e) => setSurname(e.target.value)
                                }
                            />
                        </div> */}
                        </div>
                        <div className='d-flex justify-content-between w-100'>
                            <div className='d-flex flex-column worker-input'>
                                <label>Email</label>
                                <input
                                    type="text"
                                    defaultValue={worker.email}
                                    onChange={
                                        (e) => setEmail(e.target.value)
                                    }
                                />
                            </div>
                            {/* <div className='d-flex flex-column worker-input'>
                            <label>Phone</label>
                            <input
                                type="text"
                                defaultValue={worker.phone}
                                onChange={
                                    (e) => setPhone(e.target.value)
                                }
                            />
                        </div> */}
                        </div>
                        <div className='d-flex justify-content-between w-100'>
                            <div className='d-flex flex-column worker-input'>
                                <label>Services</label>
                                <select name="Services" size="5">
                                    {services.map((service) => {
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
                                        onClick={() => {
                                            setServices(services => [...services, newService]);
                                        }}
                                    >
                                        Add
                                    </button>
                                </div>


                            </div>
                        </div>
                        <div className="button-container">
                            <input type="submit" />
                        </div>
                    </form>
                </div>
            </div>)
        }
    }

    return (
        <div className='row'>
            <div className='col-lg-3'>
                <div className='shape_box fd-column'>
                    <div className='d-flex justify-content-end w-100'>
                        <button
                            className='btn btn-light'
                            onClick={() => {
                                navigate("/edit/")
                            }}
                        >
                            Edit
                        </button>
                    </div>
                    <img src="https://www.transparentpng.com/thumb/shopping/hR31Wp-shopping-markets-vector-image.png" className='w-100 p-5' />
                    <h5>Suha berber</h5>
                    <p>İbo Osman Cad. 70095 Sk. No:6</p>
                    <p>
                        <span className='mr-2'>Monday</span>
                        <span>10:00 - 18:00</span>
                    </p>
                    <p>
                        <span className='mr-2'>Tuesday</span>
                        <span>10:00 - 18:00</span>
                    </p>
                    <p>
                        <span className='mr-2'>Wednesday</span>
                        <span>10:00 - 18:00</span>
                    </p>
                    <p>
                        <span className='mr-2'>Thursday</span>
                        <span>10:00 - 18:00</span>
                    </p>
                    <p>
                        <span className='mr-2'>Friday</span>
                        <span>10:00 - 18:00</span>
                    </p>
                    <p>
                        <span className='mr-2'>Saturday</span>
                        <span>10:00 - 18:00</span>
                    </p>
                    <p>
                        <span className='mr-2'>Sunday</span>
                        <span>10:00 - 18:00</span>
                    </p>
                </div>
            </div>
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {worker && services && renderForm()}
        </div>
    )
}

export default EditWorker;
