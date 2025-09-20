import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import useAxios from "../../hooks/useAxios";
import useTitle from "../../hooks/useTitle";
import GoogleSignIn from "../../components/SocialLogin/GoogleSignIn";
import { imageUpload } from "../../hooks/imageUpload";
import Swal from "sweetalert2";

const Register = () => {
  useTitle("Register | NexuStudy ");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = use(AuthContext);
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = async (data) => {
    const image = data.image[0];
    const imageUrl = await imageUpload(image);

    createUser(data.email, data.password)
      .then(async () => {
        // save user info in db
        const userInfo = {
          name: data.name,
          email: data.email,
          image: imageUrl,
        };

        await axiosInstance.post("/users", userInfo);

        // update firebase profile
        const userProfile = {
          displayName: data.name,
          photoURL: imageUrl,
        };
        updateUserProfile(userProfile)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Student Created!",
              text: "Your Student Account was successfully created.",
              timer: 2000,
              toast: true,
              showConfirmButton: false,
              position: "top-end",
            });
            navigate(from);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center items-center my-5">
      <div className="card bg-[#F4EDEA] dark:bg-gray-900 dark:border dark:border-gray-700 w-11/12 mx-auto md:w-8/12 lg:w-6/12 shadow-2xl mt-16">
        <div className="card-body">
          <h1 className="text-5xl font-bold text-center text-indigo-500 dark:text-indigo-400">
            Create Account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              {/* name field */}
              <label className="label font-bold text-gray-800 dark:text-gray-200">
                Enter Your Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input w-full dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                placeholder="Enter Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}

              {/* image field */}
              <label className="label font-bold text-gray-800 dark:text-gray-200">
                Select Your Profile Picture
              </label>
              <input
                type="file"
                {...register("image", { required: true })}
                accept="image/*"
                className="file-input w-full dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              />

              {/* email field */}
              <label className="label font-bold text-gray-800 dark:text-gray-200">
                Enter Your Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input w-full dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                placeholder="Enter Your Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}

              {/* password field */}
              <label className="label font-bold text-gray-800 dark:text-gray-200">
                Enter Your Password
              </label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input w-full dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                placeholder="Enter Your Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer
                </p>
              )}

              <div>
                <Link
                  to={"/forgot-password"}
                  className="link link-hover font-bold dark:text-indigo-400"
                >
                  Forgot password?
                </Link>
              </div>

              <button className="btn btn-primary text-white mt-4">
                Register
              </button>
            </fieldset>

            <p className="text-center text-xl dark:text-gray-300">
              <small>
                Already have an account?{" "}
                <Link className="font-bold dark:text-indigo-400" to="/login">
                  Login
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

export default Register;
