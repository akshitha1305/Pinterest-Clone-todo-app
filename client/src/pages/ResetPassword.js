// ResetPassword.js
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { resetPassword } from "../actions/session";
import { useLocation } from "react-router-dom";
import "../components/FormLayout.css"; // Ensure this file has the necessary styles

const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const query = new URLSearchParams(useLocation().search);
    const token = query.get("token");

    const handlePasswordReset = (data) => {
        dispatch(resetPassword({ token, newPassword: data.newPassword, confirmPassword: data.confirmPassword }))
            .then(response => {
                console.log(response);
                alert(response.data.message);
            })
            .catch(error => {
                alert("Password reset failed: ");
            });
    };

    return (
        <form onSubmit={handleSubmit(handlePasswordReset)} className="form">
            <input
                type="password"
                placeholder="Enter new password"
                {...register("newPassword", { required: true })}
                className={errors.newPassword ? "form__input--error" : "form__input"}
            />
            {errors.newPassword && <p className="form__error">Password is required</p>}

            <input
                type="password"
                placeholder="Confirm new password"
                {...register("confirmPassword", { required: true })}
                className={errors.confirmPassword ? "form__input--error" : "form__input"}
            />
            {errors.confirmPassword && <p className="form__error">Confirm password is required</p>}

            <button type="submit" className="form__btn form__btn--submit">Reset Password</button>
        </form>
    );
};

export default ResetPassword;
