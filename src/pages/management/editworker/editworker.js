import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import data from '../../../const';
import './editworker.css';

const EditWorker = () => {
    let params = useParams();
    var worker = data.filter(shop => shop.id == 1)[0].workers.filter(worker => worker.id == params.id)[0];
    // worker = worker[0];
    
    console.log(worker);

    const navigate = useNavigate();
    const [name, setName] = useState(worker.name);
    const [surname, setSurname] = useState(worker.surname);
    const [email, setEmail] = useState(worker.email);
    const [phone, setPhone] = useState(worker.phone);
    const [services, setServices] = useState(worker.services);
    const [newService, setNewService] = useState("");

    function handleUpdate() {
        console.log("update");
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
            <div className='col-lg-9'>
                <div className='shape_box flex-column'>
                    <div className='d-flex justify-content-between w-100'>
                        <h5>Worker Information</h5>
                        <button

                            className='btn btn-light'
                            onClick={() => {
                                handleUpdate();
                            }
                            }>
                            Edit
                        </button>
                    </div>
                    <div className='d-flex justify-content-between w-100'>
                        <div className='d-flex flex-column worker-input'>
                            <label>Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='d-flex flex-column worker-input'>
                            <label>Surname</label>
                            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                        </div>
                    </div>
                    <div className='d-flex justify-content-between w-100'>
                        <div className='d-flex flex-column worker-input'>
                            <label>Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='d-flex flex-column worker-input'>
                            <label>Phone</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div className='d-flex justify-content-between w-100'>
                        <div className='d-flex flex-column worker-input'>
                            <label>Services</label>
                            {/* <input type="text" value={services} onChange={(e) => setServices(e.target.value)} /> */}
                            <select name="Services" size="5">
                                {services.map((service) => {
                                    return (
                                        <option value={service}>{service}</option>
                                    )}
                                )}
                            </select>
                        </div>
                        <div className='d-flex flex-column worker-input'>
                            <label>Add Services</label>
                            <div>
                                <input type="text" value={newService} onChange={(e) => setNewService(e.target.value)} />
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
                </div>
            </div>
        </div>
    )
}

export default EditWorker;
