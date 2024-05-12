"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";
import { registerValidate } from "../../lib/validate";
import { auth } from "../firebaseConfig";

export default function Register() {
  const signup = async (values) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      // Redirect to login page after successful user creation
      window.location = "/";
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error if user creation fails
    }
  };
  const [show, setShow] = useState({ password: false, cpassword: false });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
    },
    validate: registerValidate,
    onSubmit: signup,
  });
  return (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md lg:w-3/5 w-5/6">
        <section className="lg:w-1/2 md:w-2/3 w-5/6 mx-auto flex flex-col gap-10 backdrop-blur-lg justify-evenly py-10 text-center">
          <div className="title">
            <h1 className="text-gray-800 md:text-4xl text-2xl font-bold py-4">
              Register
            </h1>
          </div>

          {/* form */}
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <div
              className={`flex border rounded-xl relative${
                formik.errors.email && formik.touched.email
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full md:py-4 py-1 md:px-6 px-2 border rounded-xl bg-slate-50 outline-none border-none"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email ? (
                <span className="text-rose-500 text-xs my-auto">
                  {formik.errors.email}
                </span>
              ) : (
                <></>
              )}
              <span className="icon flex items-center px-4">
                <HiAtSymbol size={25} />
              </span>
            </div>
            <div
              className={`flex border rounded-xl relative ${
                formik.errors.password && formik.touched.password
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <input
                type={`${show.password ? "text" : "password"}`}
                name="password"
                placeholder="Password"
                className="w-full md:py-4 py-1 md:px-6 px-2 border rounded-xl bg-slate-50 outline-none border-none"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password ? (
                <span className="text-rose-500 text-xs my-auto">
                  {formik.errors.password}
                </span>
              ) : (
                <></>
              )}
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow({ ...show, password: !show.password })}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>

            <div
              className={`flex border rounded-xl relative ${
                formik.errors.cpassword && formik.touched.cpassword
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <input
                type={`${show.cpassword ? "text" : "password"}`}
                name="cpassword"
                placeholder="Confirm Password"
                className="w-full md:py-4 py-1 md:px-6 px-2 border rounded-xl bg-slate-50 outline-none border-none"
                {...formik.getFieldProps("cpassword")}
              />
              {formik.errors.cpassword && formik.touched.cpassword ? (
                <span className="text-rose-500 text-xs my-auto">
                  {formik.errors.cpassword}
                </span>
              ) : (
                <></>
              )}

              <span
                className="icon flex items-center px-4"
                onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
            <div className="input-button">
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md md:py-3 py-2 text-gray-50 text-lg transition-colors duration-300 hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700 hover:border"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center text-gray-400 ">
            Have an account?
            <a href="login" className="text-blue-700">
              Sign In
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
