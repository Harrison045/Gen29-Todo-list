import React from "react";
import { useForm } from "react-hook-form";
import { LoginUser } from "./api/api";

function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await LoginUser(data.email, data.password);
      //   console.log("Login successful");
        alert("Login successful");
      console.log("User data:", data);
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      reset();
    }
  };
  return (
    <>
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit">Sign In</button>
      </form>
    </>
  );
}

export default SignIn;
