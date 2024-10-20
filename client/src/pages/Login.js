import React from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../components/FormLayout.css";
import { login } from "../actions/session";

const LoginFormLayout = () => {
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
      <form onSubmit={handleSubmit(handleLogin)}>
        <input
          type="text"
          placeholder="Enter your username"
          className={`form__input ${
            errors.username ? "form__input--error" : ""
          }`}
          {...register("username", { required: true })}
        />
        {errors.username && <p className="form__error">Username field cannot be empty</p>}
        <input
          type="password"
          placeholder="Enter your password"
          className={`form__input ${
            errors.password ? "form__input--error" : ""
          }`}
          {...register("password", { required: true })}
        />
        {errors.password && <p className="form__error">Password field cannot be empty</p>}
        {sessionError && <p className="form__error">{sessionError}</p>}
        <button type="submit" className="form__btn form__btn--submit">
          Signin Now
        </button>
      </form>
      <Link to="/signup">No account yet? Sign Up Now</Link>
    </>
  );
};

export default LoginFormLayout;
