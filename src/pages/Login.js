import React, { useState } from 'react'
import { postApi } from "../utilits/helpers/apiService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({})


    const postData = async (data) => {
        try {
            const response = await postApi("/account/login", data);
            setFormData({
                email: "",
                password: "",
            });
            let successMessage = "Login Successful";
            toast.success(successMessage);
            const token = response.response.token;
            const userId = response.response.user._id;
            const userData = response.response.user;
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("userId", userId);
            localStorage.setItem("token", token);
            window.location.href = "/";
        } catch (error) {
            console.log("Error caught:", error);
            let errorMessage = "An error occurred";
            if (error.response) {
                // Extracting the specific message from the server response
                if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else if (typeof error.response.data === "string") {
                    errorMessage = error.response.data;
                } else {
                    errorMessage = `Error: ${error.response.status} - ${error.response.statusText}`;
                }
            } else if (error.request) {
                errorMessage = "No response received from server";
            } else {
                errorMessage = error.message;
            }

            toast.error(errorMessage);
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        setErrors({
          ...errors,
          [name]: "",
        });
      };


    const loginSubmitHandler = (e) => {
        e.preventDefault();
        // console.log('Form Data:', formData);
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            postData(formData);
            console.log('Form Data:', formData);
        }
    }

    const validate = (data) => {
        const errors = {};
        if (!data.email) errors.email = "Please Enter Email or Phone number";
        if (!data.password) errors.password = "Please Enter the Password";
        return errors;
    };

    return (
        <>
            <section className="p-0 m-0 loginSec">
                <ToastContainer />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 d-flex align-items-center justify-content-center">
                            <div className='text-center'>
                            <div data-test-id="unauth-header-logo" class="zI7 iyn Hsu"><a class="nrl _74 Lfz KhY S9z NtY afV" href="/" rel="" target="_self"><div class="Jea KS5 Zr3 hs0 zI7 iyn Hsu"><svg aria-label="Pinterest" class="g_1 gUZ U9O kVc" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M7.55 23.12c-.15-1.36-.04-2.67.25-3.93L9 14.02a7 7 0 0 1-.34-2.07c0-1.68.8-2.88 2.08-2.88.88 0 1.53.62 1.53 1.8q0 .57-.22 1.28l-.53 1.73q-.15.5-.15.91c0 1.2.92 1.88 2.09 1.88 2.08 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.11-5.06-5.11-3.36 0-5.49 2.19-5.49 5.23 0 1.23.38 2.37 1.11 3.15-.24.4-.5.48-.88.48-1.2 0-2.34-1.7-2.34-4 0-3.99 3.2-7.16 7.68-7.16 4.7 0 7.66 3.28 7.66 7.33 0 4.07-2.88 7.13-5.98 7.13a3.8 3.8 0 0 1-3.07-1.47l-.61 2.5c-.33 1.28-.83 2.5-1.62 3.67A12 12 0 0 0 24 11.99 12 12 0 1 0 7.55 23.12"></path></svg><div class="xvE zI7 iyn Hsu" style={{letterspacing:-1 + 'px'}}><h2 class="lH1 dyH iFc H2s bwj sOY zDA">Pinterest</h2></div></div></a></div>
                            </div>
                        </div>
                        <div className="col-lg-5 rightCol">
                            <div className="card">
                                <div className="container">
                                    <form id='loginForm' name='loginForm' onSubmit={loginSubmitHandler}>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <h4>Login</h4>
                                            </div>
                                            <div className="col-12 mt-5">
                                                <div className="input-group">
                                                    <label htmlFor="email" className="form-label">Email<span className="text-danger">*</span>
                                                    </label>
                                                    <input autoComplete="off" type="text" name="email" id="email" placeholder="Email" onChange={handleChange} value={formData.email} />
                                                    {errors.email && <p className="text-danger">{errors.email}</p>}
                                                </div>
                                            </div>
                                            <div className="col-12 mt-3">
                                                <div className="input-group">
                                                    <label htmlFor="password" className="form-label">Password<span className="text-danger">*</span>
                                                    </label>
                                                    <input autoComplete="off" type="password" name="password" id="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                                                    {errors.password && <p className="text-danger">{errors.password}</p>}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button type='submit' className="allBtns w-100 mt-3">Login</button>
                                            </div>
                                            <div className="col-12 m-2">
                                            Click here to registere <Link className='mt-2' to="/signup">signup</Link>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
