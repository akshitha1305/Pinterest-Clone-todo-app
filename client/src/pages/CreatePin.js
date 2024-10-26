import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createPin } from "../actions/pin"; // Assuming there is a relevant action for pin creation
import NavBar from "../components/NavBar";
import "../components/ChangePass.css"; // Ensure the CSS file is named appropriately

const CreatePin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const sessionError = useSelector((state) => state.sessionError);

  const handleCreatePin = (pinData) => {
    dispatch(createPin(pinData));
  };

  return (
    <>
      <NavBar />
      <div className="form-container">
        <form onSubmit={handleSubmit(handleCreatePin)} className="create-pin-form">
          <input
            type="text"
            placeholder="Enter Pin Title"
            className={`form__input ${errors.title ? "form__input--error" : ""}`}
            {...register("title", { required: true })}
          />
          {errors.title && <p className="form__error">Title is required</p>}

          <input
            type="url"
            placeholder="Enter Image URL"
            className={`form__input ${errors.imageUrl ? "form__input--error" : ""}`}
            {...register("imageUrl", { required: true, pattern: { value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i, message: "Invalid URL" } })}
          />
          {errors.imageUrl && <p className="form__error">Valid image URL is required</p>}


          <button type="submit" className="form__btn form__btn--submit">
            Create Pin
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePin;
