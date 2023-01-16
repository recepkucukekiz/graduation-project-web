import React, { useState } from "react";
import { login } from "../../../services/shopservice";
import "./login.css";

const Login = () => {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = await login(uname.value, pass.value);
        console.log(userData);
        // Compare user info
        if (userData.status === "OK") {
            localStorage.setItem('user', JSON.stringify(userData));
            setIsSubmitted(true);
            window.location.reload();
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    const checkIsLogged = () => {
        if (localStorage.getItem('user') != null) {
            window.location.href = "/home";
        } else {
            return renderForm;
        }
    }

    return (
        <>{checkIsLogged()}</>
    );
}

export default Login;
