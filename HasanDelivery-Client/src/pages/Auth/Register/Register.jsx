import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../hooks/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  // const [loading, setLoading]=useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const axiosInstance = useAxiosSecure();
  const { RegisterUser, UpdateUserProfile, SendVerificationMail, Logout } =
    UseAuth();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const registeronSubmit = async (data) => {
    try {
      const profileImage = data.photo?.[0];

      // 1. Firebase register user
      const userCredential = await RegisterUser(data.email, data.password);

      const user = userCredential.user;

      // 2. Send verification email
      await SendVerificationMail();

      // 3. Upload image to imgbb
      const formData = new FormData();
      formData.append("image", profileImage);

      const imageApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_host}`;

      const imgRes = await axios.post(imageApiUrl, formData);
      const imageUrl = imgRes.data.data.display_url;

      // 4. IMPORTANT: Check email verification before DB save
      // if (!user.emailVerified) {
      //   alert("Please verify your email before continuing.");

      //   // optional: logout user
      //   await Logout();

      //   return;
      // }

      // 5. Save user in backend database
      const dbRes = await axiosInstance.post("/users", {
        name: data.name,
        email: data.email,
        photo: imageUrl,
      });

      console.log("DB saved:", dbRes.data);

      // 6. Update Firebase profile
      const UserProfile = {
        displayName: data.name,
        photoURL: imageUrl,
      };

      await UpdateUserProfile(UserProfile);

      // 7. Redirect
      navigate(from, { replace: true });
    } catch (error) {
      console.log("Register error:", error.message);
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl pt-5">
      <h1 className="text-center text-3xl font-bold text-center">
        Create an account
      </h1>
      <p className="text-center text-gray-600">Register in Hasvery</p>
      <div className="card-body">
        <form onSubmit={handleSubmit(registeronSubmit)}>
          <fieldset className="fieldset">
            {/* Name field */}
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
            {/* photo field */}
            <label className="label">Photo</label>
            <input
              type="file"
              className="file-input "
              placeholder="Photo"
              {...register("photo", { required: true })}
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500">Photo is required</p>
            )}

            {/* Email field */}
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

            {/* password field */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be at least 6 characters
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-neutral mt-4"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Signing up...
                </>
              ) : (
                "Register"
              )}
            </button>
          </fieldset>
          <p className="text-sm text-gray-600 mt-3 text-center">
            Already have an account?{" "}
            <Link
              state={location.state}
              to="/auth/login"
              className="text-blue-500 font-medium hover:text-blue-700 hover:underline transition"
            >
              Sign in
            </Link>
          </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
