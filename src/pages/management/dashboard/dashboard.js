import React from 'react'
import { useState } from 'react';
import "./dashboard.css";
import data from '../../../const';
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import DeleteConfirmation from '../../../components/DeleteConfirm/DeleteConfirmation';
import { Modal, Button } from "react-bootstrap";

const Dashboard = () => {
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);

    const navigate = useNavigate();

    // Hide the modal
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    // Handle the actual deletion of the item
    const submitDelete = (abcdef) => {
        console.log(abcdef);
    };

    const showDeleteModal = () => {

        setDisplayConfirmationModal(true);
    };

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

                    {/* <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} message={"abcdef"} id={item.id} /> */}

                    <button
                        className='btn btn-danger'
                        onClick={
                            () => {
                                submitDelete(item.id)
                            }
                        }
                    >
                        Delete
                    </button>

                    {/* <Modal show={displayConfirmationModal} onHide={hideConfirmationModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>Delete Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><div className="alert alert-danger">{"jsagjsbc"}</div></Modal.Body>
                        <Modal.Footer>
                        <Button variant="default" onClick={hideConfirmationModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => submitDelete(item.name) }>
                            Delete
                        </Button>
                        <button
                            onClick={() => submitDelete(item.name) }
                        >Delete
                        </button>
                        </Modal.Footer>
                    </Modal> */}

                    <button
                        className='btn btn-success'
                        onClick={() => {
                            console.log(item.id);
                            navigate(`/calendernew/${item.id}`);
                        }}
                    >Show Calendar</button>
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
