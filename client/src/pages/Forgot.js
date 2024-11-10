// ForgotPassword.js
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "../components/FormLayout.css";
import { requestPasswordReset } from "../actions/session";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const sessionError = useSelector((state) => state.sessionError);

  const handlePasswordReset = (data) => {
    dispatch(requestPasswordReset(data.username))
      .then(response => {
        const resetUrl = response.data.resetUrl;
        window.alert(response.data.message);

        // Copy reset link to clipboard
        navigator.clipboard.writeText(resetUrl)
          .then(() => {
            window.alert("Password reset link copied to clipboard!");
          })
          .catch(err => {
            console.error("Failed to copy: ", err);
          });
      })
      .catch(error => {
        alert("Password reset failed.");
      });
  };

    return (
    <form onSubmit={handleSubmit(handlePasswordReset)}>
      <input
        type="text"
        placeholder="Enter your username"
        className={`form__input ${errors.username ? "form__input--error" : ""}`}
        {...register("username", { required: true })}
      />

      {errors.username && <p className="form__error">Username field cannot be empty</p>}
      {sessionError && <p className="form__error">{sessionError}</p>}

      <button type="submit" className="form__btn form__btn--submit">
        Send Password Reset Link
      </button>
    </form>
  );
};
