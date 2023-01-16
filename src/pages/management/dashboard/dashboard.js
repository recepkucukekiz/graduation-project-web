import React, { useEffect } from 'react'
import { useState } from 'react';
import "./dashboard.css";
import data from '../../../const';
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import DeleteConfirmation from '../../../components/DeleteConfirm/DeleteConfirmation';
import { Modal, Button } from "react-bootstrap";
import { getByShopId, getShopById, deleteWorker } from '../../../services/shopservice';

const Dashboard = () => {
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [workers, setWorkers] = useState([]);
    const [shop, setShop] = useState(null);
    const [selectedWorkerId, setSelectedWorkerId] = useState(null);
    const isLogin = localStorage.getItem("user") != null;

    useEffect(() => {
        getShopById(user.shopId).then((response) => {
            setShop(response);
        }).then(() => {
            getByShopId(user.shopId).then((response) => {
                setWorkers(response);
            })
        })
    }, [])

    const navigate = useNavigate();

    // Hide the modal
    const hideConfirmationModal = () => {
        setSelectedWorkerId(null);
        setDisplayConfirmationModal(false);
    };

    // Handle the actual deletion of the item
    const submitDelete = () => {
        deleteWorker(selectedWorkerId).then(() => {
            getByShopId(user.shopId).then((response) => {
                setWorkers(response);
            })
        })
        hideConfirmationModal();
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
        workers.forEach((item) => {
            arr.push(
                <div className='shape_box justify-content-between align-items-center' key={item.id}>
                    <h5>{item.name}</h5>
                    <p>{item.email}</p>
                    <button className='btn btn-primary'
                        onClick={() => {
                            navigate(`/editworker/${item.id}`);
                        }}
                    >Edit</button>

                    {/* <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} message={""} id={item.id} /> */}

                    <button
                        className='btn btn-danger'
                        onClick={
                            () => {
                                setSelectedWorkerId(item.id);
                                showDeleteModal();
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
                            navigate(`/calendernew/${item.id}`);
                        }}
                    >Show Calendar</button>
                </div>
            );
        });
        return arr;
    }

    const checkIsLogged = () => {
        if (isLogin) {
            return (
                <><div className={displayConfirmationModal ? 'row filter' : 'row'}>
                    <div className='col-lg-3'>
                        <div className='shape_box fd-column'>
                            <div className='d-flex justify-content-end w-100'>
                                {/* <img src="https://img.icons8.com/ios/50/null/pencil--v1.png" /> */}
                                <button
                                    className='btn btn-light'
                                    onClick={() => {
                                        navigate("/edit");
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                            <img src="https://www.transparentpng.com/thumb/shopping/hR31Wp-shopping-markets-vector-image.png" className='w-100 p-5' />
                            <h5>{shop.name}</h5>
                            <p>{shop.address}</p>
                            <p>{shop.province}</p>
                            <p>{shop.phone}</p>
                            <p>{shop.workingHours}</p>
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        <div className='d-flex justify-content-between
                         p-4'>
                            <h3>Workers</h3>
                            <button
                                className='btn btn-primary ml-3'
                                onClick={() => {
                                    navigate("/addworker");
                                }}
                            >
                                Add Worker
                            </button>

                        </div>
                        <div>
                            {workerList()}
                        </div>
                    </div>
                </div>
                    {displayConfirmationModal && (
                        <div className='popup'>
                            <p>Are you sure about delete worker?</p>
                            <button
                                onClick={() => submitDelete()}
                            >Delete
                            </button>
                            <button
                                onClick={() => hideConfirmationModal()}
                            >Cancel
                            </button>
                        </div>
                    )
                    }
                </>
            )
        } else {
            window.location.href = "/login";
        }
    }

    return (
        <>
            {
                isLogin ? (
                    shop && checkIsLogged()
                ) : (
                    window.location.href = "/login"
                )
            }
        </>
    )
}

export default Dashboard
