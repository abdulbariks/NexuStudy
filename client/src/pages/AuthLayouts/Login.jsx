import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import GoogleSignIn from "../../components/SocialLogin/GoogleSignIn";
import axios from "axios";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  useTitle("LogIn | NexuStudy ");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = async (data) => {
    try {
      const result = await signIn(data.email, data.password);
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);
      navigate(from);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center my-5">
      <div className="card bg-[#F4EDEA] dark:bg-gray-900 dark:border dark:border-gray-700 w-11/12 mx-auto md:w-8/12 lg:w-6/12 shadow-2xl mt-16 transition-colors duration-300">
        <div className="card-body">
          <h1 className="text-5xl font-bold text-center text-indigo-500">
            Please Login
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label font-bold text-gray-700 dark:text-gray-200">
                Enter Your Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="input w-full bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                placeholder="Enter Your Email"
              />

              <label className="label font-bold text-gray-700 dark:text-gray-200 mt-4">
                Enter Your Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                className="input w-full bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                placeholder="Enter Your Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password Must be 6 characters or longer
                </p>
              )}

              <div>
                <Link
                  to={"/forgot-password"}
                  className="link link-hover font-bold text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>

              <button className="btn btn-primary text-white mt-4">Login</button>
            </fieldset>
            <p className="text-center text-xl mt-4">
              <small>
                New to this website?{" "}
                <Link
                  state={{ from }}
                  className="font-bold text-indigo-500"
                  to="/register"
                >
                  Register
                </Link>
              </small>
            </p>
          </form>
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
};

export default Login;
