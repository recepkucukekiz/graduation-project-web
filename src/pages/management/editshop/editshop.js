import React from "react";

const Edit = () => {

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
    
        // var { uname, pass } = document.forms[0];
    
        // // Find user login info
        // const userData = database.find((user) => user.username === uname.value);
    
        // // Compare user info
        // if (userData) {
        //   if (userData.password !== pass.value) {
        //     // Invalid password
        //     setErrorMessages({ name: "pass", message: errors.pass });
        //   } else {
        //     setIsSubmitted(true);
        //   }
        // } else {
        //   // Username not found
        //   setErrorMessages({ name: "uname", message: errors.uname });
        // }

        console.log("submitted");
      };

    return (
        <>
            <div>Home</div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Shop Name </label>
                        <input type="text" name="sname" required />
                    </div>
                    <div className="input-container">
                        <label>Address </label>
                        <input type="text" name="address" required />
                    </div>
                    <div className="input-container">
                        <label>Il </label>
                        <input type="text" name="il" required />
                    </div>
                    <div className="input-container">
                        <label>Ilce </label>
                        <input type="text" name="ilce" required />
                    </div>
                    <div className="input-container">
                        <label>Phone </label>
                        <input type="text" name="phone" required />
                    </div>
                    <div className="input-container">
                        <label>Working Hours </label>
                        <input type="text" name="whours" required />
                    </div>
                    <div className="button-container">
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}

export default Edit;