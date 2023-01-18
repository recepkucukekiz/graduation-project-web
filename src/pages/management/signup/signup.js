import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { createShop, getAllCategories } from "../../../services/shopservice";

import "./signup.css";

const Signup = () => {
  const [isFirstFormCompleted, setIsFirstFormCompleted] = useState(false);
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopPhone, setShopPhone] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [shopWorkingHours, setShopWorkingHours] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        console.log("useEffect");
        getAllCategories().then((response) => {
            setCategories(response);
            console.log(response);
        });
    },[]);

  const handleSubmit = () => {
    console.log("Submitted");
    console.log(shopName);
    console.log(email);
    console.log(username);
    console.log(password);
    console.log(confirmPassword);
    console.log(shopAddress);
    console.log(shopPhone);
    console.log(shopDescription);
    console.log(selectedCategory);

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }

    if (shopName === "" || email === "" || username === "" || password === "" || confirmPassword === "" || shopAddress === "" || shopPhone === "" || shopDescription === "" || selectedCategory === "") {
        toast.error("Please fill all fields");
        return;
    }

    createShop({
        name: shopName,
        category: selectedCategory,
        address: shopAddress,
        email: email,
        city: "Istanbul",
        province: "Istanbul",
        phone: shopPhone,
        image: "abc.png",
        description: shopDescription,
        workingHours: shopWorkingHours,
        username: username,
        password: password,
    }).then((response) => {
        toast.success("Shop created successfully");
    }).catch((error) => {
        console.log(error);
        toast.error("Shop creation failed");
    });
  };

  const renderForm = (
    <div className="form">
      <div>
        <div className="input-container">
          <label>Shop name </label>
          <input type="text" defaultValue={shopName} onChange={(e)=> {setShopName(e.target.value)}} />

        </div>
        <div className="input-container">
          <label>E-Mail </label>
          <input type="text" defaultValue={email} onChange={(e)=> {setEmail(e.target.value)}} />

        </div>
        <div className="input-container">
          <label>Username </label>
          <input type="text" defaultValue={username} onChange={(e)=> {setUsername(e.target.value)}} required />

        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" defaultValue={password} onChange={(e)=> {setPassword(e.target.value)}} required />
        </div>
        <div className="input-container">
          <label>Confirm Password </label>
          <input type="password" defaultValue={confirmPassword} onChange={(e)=> {setConfirmPassword(e.target.value)}} required />
        </div>
        <div className="button-container">
          <input
            type="button"
            value="Next"
            className="btn btn-primary"
            onClick={() => {
                setIsFirstFormCompleted(true);
                console.log(shopAddress);
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderSecondForm = (
    <div className="form">
      <div>
        <div className="input-container">
            <label>Shop Category </label>
            <select
                className="form-control"
                onChange={(e) => {
                    setSelectedCategory(e.target.value);
                }}
            >
                <option value="">Select Category</option>
                {categories.map((category) => {
                    return (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    );
                })}
            </select>
        </div>
        <div className="input-container">
          <label>Shop Address </label>
          <input type="text" value={shopAddress} onChange={(e)=> {setShopAddress(e.target.value)}} required />
        </div>
        <div className="input-container">
          <label>Shop Phone </label>
          <input type="text" value={shopPhone} onChange={(e)=> {setShopPhone(e.target.value)}} required />
        </div>
        <div className="input-container">
          <label>Shop Description </label>
          <input type="text" value={shopDescription} onChange={(e)=> {setShopDescription(e.target.value)}} required />
        </div>
        <div className="input-container">
            <label>Working Hours</label>
            <input type="text" value={shopWorkingHours} onChange={(e) => {setShopWorkingHours(e.target.value)}} required />
        </div>
        <div className="button-container">
          <input
            type="button"
            value="Back"
            className="btn btn-danger"
            onClick={() => setIsFirstFormCompleted(false)}
          />
        </div>
        <div className="button-container">
          <input
            type="button"
            className="btn btn-success"
            value="Submit"
            onClick={() => {
              handleSubmit()
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="row signup-page">
      <div className="signup-form col-lg-4">
        <div className="title">Sign Up</div>
        {isFirstFormCompleted ? renderSecondForm : renderForm}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
