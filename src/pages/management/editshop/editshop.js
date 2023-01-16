import React, { useEffect, useState } from "react";
import { getShopById, updateShop } from '../../../services/shopservice';
const Edit = () => {

    const [shop, setShop] = useState(null);
    var shopId = JSON.parse(localStorage.getItem('user')).shopId;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [phone, setPhone] = useState('');
    const [workingTime, setWorkingTime] = useState('');


    useEffect(() => {
        console.log(shopId);

        async function fetchData() {
            const response = await getShopById(shopId);
            setShop(response);
        }

        fetchData();
    }, []);

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        // setShop({
        //     ...shop,
        //     name: name,
        //     description: description,
        //     address: address,
        //     city: city,
        //     province: province,
        //     phone: phone,
        //     workingTime: workingTime
        //     });


        shop.name = name !== '' ? name : shop.name;
        shop.description = description !== '' ? description : shop.description;
        shop.address = address !== '' ? address : shop.address;
        shop.city = city !== '' ? city : shop.city;
        shop.province = province !== '' ? province : shop.province;
        shop.phone = phone !== '' ? phone : shop.phone;
        shop.workingTime = workingTime !== '' ? workingTime : shop.workingTime;

        async function fetchData() {
            await updateShop(shopId, shop);
        }

        fetchData();
    };

    const renderForm = () => {
        if (shop == null) {
            return (<div>Loading...</div>)
        } else {
            return (<>
                <div>Home</div>
                <div className="form">
                    <form onSubmit={handleSubmit}>

                        <div className="input-container">
                            <label>Name </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={shop.name}
                                onChange={
                                    (e) => setName(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="input-container">
                            <label>Description </label>
                            <input
                                type="text"
                                name="description"
                                defaultValue={shop.description}
                                onChange={
                                    (e) => setDescription(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="input-container">
                            <label>Address </label>
                            <input
                                type="text"
                                name="address"
                                defaultValue={shop.address}
                                onChange={
                                    (e) => setAddress(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="input-container">
                            <label>City </label>
                            <input
                                type="text"
                                name="city"
                                defaultValue={shop.city}
                                onChange={
                                    (e) => setCity(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="input-container">
                            <label>Province </label>
                            <input
                                type="text"
                                name="province"
                                defaultValue={shop.province}
                                onChange={
                                    (e) => setProvince(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="input-container">
                            <label>Phone </label>
                            <input
                                type="text"
                                name="phone"
                                defaultValue={shop.phone}
                                onChange={
                                    (e) => setPhone(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="input-container">
                            <label>Working Time </label>
                            <input
                                type="text"
                                name="workingTime"
                                defaultValue={shop.workingHours}
                                onChange={
                                    (e) => setWorkingTime(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="button-container">
                            <input type="submit" />
                        </div>
                    </form>
                </div>
            </>)
        }
    };

    return (
        <div>
            {renderForm()}
        </div>
    );
}

export default Edit;
