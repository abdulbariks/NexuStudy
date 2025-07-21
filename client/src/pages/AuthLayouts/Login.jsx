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
      <div className="card bg-[#F4EDEA] w-11/12 mx-auto md:w-8/12 lg:w-6/12 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold text-center text-indigo-500">
            Please Login
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label font-bold">Enter Your Email</label>
              <input
                type="email"
                {...register("email")}
                className="input w-full"
                placeholder="Enter Your Email"
              />

              <label className="label font-bold">Enter Your Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                className="input w-full"
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
                  className="link link-hover font-bold"
                >
                  Forgot password?
                </Link>
              </div>

              <button className="btn btn-primary text-white mt-4">Login</button>
            </fieldset>
            <p className="text-center text-xl">
              <small>
                New to this website?{" "}
                <Link state={{ from }} className="font-bold" to="/register">
                  Register
                </Link>
              </small>
            </p>
          </form>
          <GoogleSignIn></GoogleSignIn>
        </div>
      </div>
    </div>
  );
};

export default Login;
