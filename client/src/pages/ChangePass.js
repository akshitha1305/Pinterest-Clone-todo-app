import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/session";
import NavBar from "../components/NavBar";
import "../components/ChangePass.css"

const ChangePass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const sessionError = useSelector((state) => state.sessionError);

  const handleLogin = (userData) => {
    dispatch(login(userData));
  };

  return (
    <>
      <NavBar />
      <div className="form-container"> {/* Centering container */}
        <form onSubmit={handleSubmit(handleLogin)} className="change-pass-form">
          <input
            type="password"
            placeholder="Enter your current password"
            className={`form__input ${errors.current_password ? "form__input--error" : ""}`}
            {...register("current_password", { required: true })}
          />
          {errors.current_password && <p className="form__error">Password field cannot be empty</p>}
          <input
            type="password"
            placeholder="Enter your new password"
            className={`form__input ${errors.new_password ? "form__input--error" : ""}`}
            {...register("new_password", { required: true })}
          />
          {errors.new_password && <p className="form__error">Password field cannot be empty</p>}
          {sessionError && <p className="form__error">{sessionError}</p>}
          <button type="submit" className="form__btn form__btn--submit">
            Change Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePass;
