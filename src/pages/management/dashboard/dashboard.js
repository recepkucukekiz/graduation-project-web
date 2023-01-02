import React from 'react'
import "./dashboard.css";
import data from '../../../const';
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    function workerServiceList(id) {
        var arr = [];
        data[0].workers.find((worker) => {
            return worker.id == id;
        }).services.forEach((service) => {
            arr.push(
                <span>{service} </span>
            );
        });
        return arr;
    }

    function workerList() {
        var arr = [];
        data[0].workers.forEach((item) => {
            arr.push(
                <div className='shape_box justify-content-between align-items-center'>
                    <h5>{item.name} {item.surname}</h5>
                    <p>{item.email}</p>
                    <p>{item.phone}</p>
                    <div>
                        {workerServiceList(item.id)}
                    </div>
                    <button className='btn btn-primary'
                        onClick={() => {
                            console.log(item.id);
                            navigate(`/editworker/${item.id}`);
                        }}
                    >Edit</button>
                    <button className='btn btn-danger'>Delete</button>
                    <button className='btn btn-success'>Show Calendar</button>
                </div>
            );
        });
        return arr;
    }



    return (
        <>
            <div className='row'>
                <div className='col-lg-3'>
                    <div className='shape_box fd-column'>
                        <div className='d-flex justify-content-end w-100'>
                            {/* <img src="https://img.icons8.com/ios/50/null/pencil--v1.png" /> */}
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
                        <p>Seyhan/Adana</p>
                        <p>Telefon: 0 (322) 123 45 67</p>
                        <p>08:00 - 16:00</p>
                    </div>
                </div>
                <div className='col-lg-9'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='shape_box d-flex justify-content-between'>
                                <h5>Today's Appointments</h5>
                                <p>+8</p>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='shape_box d-flex justify-content-between'>
                                <h5>Haftalık Doluluk Oranı</h5>
                                <p>70%</p>
                            </div>
                        </div>
                        {/* <div className='col-lg-4'>
                            <div className='shape_box'>
                                <h5>Haftalık Doluluk Oranı</h5>
                                <p>70%</p>
                            </div>
                        </div> */}
                    </div>
                    <div className='d-flex justify-item-start p-4'>
                        <h3>Workers</h3>
                    </div>
                    <div>
                        {workerList()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
