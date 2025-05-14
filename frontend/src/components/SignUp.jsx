import React from "react";
import { useForm } from "react-hook-form";
import {SignUpUser } from "./api/api";

function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await SignUpUser(data.name, data.email, data.password);
      //   console.log("Login successful");
      alert("SignUp successful");
      console.log("User data:", data);
    } catch (error) {
      console.error("SignUp Error:", error);
      alert("SignUp failed. Please check your credentials.");
    } finally {
      reset();
    }
  };
  return (
    <>
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Name</label>

        <input
          type="name"
          name="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.email && (
          <span style={{ color: "red" }}>
            {errors.name.message || "name is required"}
          </span>
        )}
        <br />
        <br />

        <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span style={{ color: "red" }}>
            {errors.email.message || "Email is required"}
          </span>
        )}
        <br />
        <br />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.email && (
          <span style={{ color: "red" }}>
            {errors.password.message || "Password is required"}
          </span>
        )}
        <br />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignUp;
