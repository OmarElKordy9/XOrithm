import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import SessionWrapper from "./Components/SessionWrapper";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Login from "./login/page";
import Register from "./register/page";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  const requestUrl = headers().get("x-url");

  console.log(requestUrl);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper session={session}>
          {!session ? (
            // If user is not signed in, render login page or register page
            <>{requestUrl.endsWith("/register") ? <Register /> : <Login />}</>
          ) : (
            <>
              <Navbar />
              {children}
            </>
          )}
        </SessionWrapper>
      </body>
    </html>
  );
}
