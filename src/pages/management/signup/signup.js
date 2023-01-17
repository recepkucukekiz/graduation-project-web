import React, { useState } from "react";

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
  const [shopLogo, setShopLogo] = useState("");

  const handleSubmit = () => {
    console.log("Submitted");
  };

  const renderForm = (
    <div className="form">
      <form>
        <div className="input-container">
          <label>Shop name </label>
          <input type="text" name="sname" required />

        </div>
        <div className="input-container">
          <label>E-Mail </label>
          <input type="text" name="email" required />

        </div>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />

        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="input-container">
          <label>Confirm Password </label>
          <input type="password" name="cpass" required />
        </div>
        <div className="button-container">
          <input
            type="button"
            value="Next"
            className="btn btn-primary"
            onClick={() => setIsFirstFormCompleted(true)}
          />
        </div>
      </form>
    </div>
  );

  const renderSecondForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Shop Address </label>
          <input type="text" name="saddress" required />
        </div>
        <div className="input-container">
          <label>Shop Phone </label>
          <input type="text" name="sphone" required />
        </div>
        <div className="input-container">
          <label>Shop Description </label>
          <input type="text" name="sdesc" required />
        </div>
        <div className="input-container">
          <label>Shop Logo </label>
          <input type="file" name="slogo" required />
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
      </form>
    </div>
  );

  return (
    <div className="row signup-page">
      <div className="signup-form col-lg-4">
        <div className="title">Sign Up</div>
        {isFirstFormCompleted ? renderSecondForm : renderForm}
      </div>
    </div>
  );
}

export default Signup;
