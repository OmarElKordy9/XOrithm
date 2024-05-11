"use client";

import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import login_validate from "../../lib/validate";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    // onSubmit,
  });

  // async function onSubmit(values) {
  //   const status = await signIn("credentials", {
  //     redirect: false,
  //     email: values.email,
  //     password: values.password,
  //     callbackUrl: "/",
  //   });

  //   if (status.ok) router.push(status.url);
  // }

  async function googleSignIn() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  async function githubSignIn() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }
  const [show, setShow] = useState(false);
  return (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 ">
        <section className="w-1/2 mx-auto flex flex-col gap-10 backdrop-blur-lg justify-evenly py-10 text-center">
          <div className="title">
            <h1 className="text-gray-800 text-4xl font-bold py-4">Login</h1>
          </div>

          {/* form */}
          <form className="flex flex-col gap-5">
            <div
              className={`flex border rounded-xl relative ${
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
                type={`${show ? "text" : "password"}`}
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
                className="icon flex items-center px-4 cursor-pointer"
                onClick={() => setShow(!show)}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>

            <div className="input-button">
              <button
                onClick={() =>
                  signIn("credentials", {
                    email,
                    password,
                    redirect: true,
                    callbackUrl: "/",
                  })
                }
                disabled={!email || !password}
                type="button"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-3 text-gray-50 text-lg transition-colors duration-300 hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700 hover:border"
              >
                Login
              </button>
            </div>
            <div className="input-button">
              <button
                type="button"
                className="w-full border py-3 flex justify-center gap-2 hover:bg-gray-200"
                onClick={googleSignIn}
              >
                Sign In with Google{" "}
                <Image src={"/google.svg"} width="20" height={20}></Image>
              </button>
            </div>
            <div className="input-button">
              <button
                type="button"
                className="w-full border py-3 flex justify-center gap-2 hover:bg-gray-200"
                onClick={githubSignIn}
              >
                Sign In with Github{" "}
                <Image src={"/github.svg"} width={25} height={25}></Image>
              </button>
            </div>
          </form>

          {/* bottom */}
          <p className="text-center text-gray-400 ">
            Don't have an account yet?{" "}
            <a href="register" className="text-blue-700">
              Sign Up
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;
