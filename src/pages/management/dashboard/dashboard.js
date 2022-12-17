import React from 'react'
import "./dashboard.css";
import data from '../../../const';

const Dashboard = () => {

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
                    <button className='btn btn-primary'>Edit</button>
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
                        <img src="https://www.transparentpng.com/thumb/shopping/hR31Wp-shopping-markets-vector-image.png" className='w-100 p-5' />
                        <h5>Suha berber</h5>
                        <p>İbo Osman Cad. 70095 Sk. No:6</p>
                        <p>Seyhan/Adana</p>
                        <p>Telefon: 0 (322) 123 45 67</p>
                        <p>08:00 - 16:00</p>
                    </div>
                </div>
                <div className='col-lg-9'>
                    <div className='shape_box justify-content-between'>
                        <span>kfuhgvdkfj</span>
                        <span>kfuhgvdkfj</span>
                    </div>
                    <h3>workers</h3>
                    <div>
                        {workerList()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard