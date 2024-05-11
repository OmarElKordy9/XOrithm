"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

const SessionWrapper = ({ children }) => {
  return React.createElement(SessionProvider, null, children);
};

export default SessionWrapper;
