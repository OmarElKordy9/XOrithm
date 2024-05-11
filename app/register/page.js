"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";
import { registerValidate } from "../../lib/validate";
import { useRouter } from "next/navigation";
import { auth } from "../firebaseConfig";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const router = useRouter(); // Initialize useRouter

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });
  return (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4">
        <section className="w-1/2 mx-auto flex flex-col gap-10 backdrop-blur-lg justify-evenly py-10 text-center">
          <div className="title">
            <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
          </div>

          {/* form */}
          <form className="flex flex-col gap-5">
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
                className="w-full py-4 px-6 border rounded-xl bg-slate-50 outline-none border-none"
                onChange={(e) => setEmail(e.target.value)}
                // {...formik.getFieldProps("email")}
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
                className="w-full py-4 px-6 border rounded-xl bg-slate-50 outline-none border-none"
                onChange={(e) => setPassword(e.target.value)}
                // {...formik.getFieldProps("password")}
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
                className="w-full py-4 px-6 border rounded-xl bg-slate-50 outline-none border-none"
                onChange={(e) => setPasswordAgain(e.target.value)}
                // {...formik.getFieldProps("cpassword")}
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
                type="button"
                disabled={
                  !email ||
                  !password ||
                  !passwordAgain ||
                  password !== passwordAgain
                }
                onClick={() => signup()}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-3 text-gray-50 text-lg transition-colors duration-300 hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700 hover:border cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* bottom */}
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
