import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../app/firebaseConfig";
// import connectMongo from "../database/conn";
import Users from "../model/Schema";
import { compare } from "bcryptjs";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   async authorize(credentials, req) {
    //     connectMongo().catch((error) => {
    //       error: "Connection Failed...!";
    //     });

    //     // check user existance
    //     const result = await Users.findOne({ email: credentials.email });
    //     if (!result) {
    //       throw new Error("No user Found with Email Please Sign Up...!");
    //     }

    //     // compare()
    //     const checkPassword = await compare(
    //       credentials.password,
    //       result.password
    //     );

    //     // incorrect password
    //     if (!checkPassword || result.email !== credentials.email) {
    //       throw new Error("Username or Password doesn't match");
    //     }

    //     return result;
    //   },
    // }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        return await signInWithEmailAndPassword(
          auth,
          credentials.email || "",
          credentials.password || ""
        )
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch((error) => console.log(error))
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
          });
      },
    }),
  ],
};
