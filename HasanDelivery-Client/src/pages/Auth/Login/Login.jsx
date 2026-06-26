import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../../hooks/UseAuth";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const [logging, setLogging]= useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { SigninUser, ResetPassMail } = UseAuth();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  // sign in form handle function
  const SigninOnSubmit =  (data) => {
    console.log(data);
    setLogging(true)
    SigninUser(data.email, data.password)
      .then((result) => {
        // console.log("User signed in:", result.user);

        // ✅ email verification check
        if (!result.user.emailVerified) {
          alert("Please verify your email first");
          return;
        }
        // navigate after verification
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      })
      .finally(()=>{
        setLogging(false);
      })
  };

  // forget password handle
  const handleForgetPass = () => {
    //get email from form
    const email = watch("email");

    if (!email) {
      alert("Please enter your email first");
      return;
    }
    ResetPassMail(email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl pt-5">
      <h1 className="text-center text-3xl font-bold text-center">
        Wellcome Back 😊
      </h1>
      <p className="text-center text-gray-600">Login with Hasvery</p>
      <div className="card-body">
        <form onSubmit={handleSubmit(SigninOnSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+\.\S+$/,
              })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="text-red-500">Please enter a valid email</p>
            )}
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            <div>
              <a onClick={handleForgetPass} className="link link-hover">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              disabled={logging}
              className="btn btn-neutral mt-4"
            >
              {logging ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </fieldset>
          <p className="text-sm text-gray-600 mt-3 text-center">
            New to HasVery?{" "}
            <Link
              state={location.state}
              to="/auth/register"
              className="text-blue-500 font-medium hover:text-blue-700 hover:underline transition"
            >
              Sign up
            </Link>
          </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
