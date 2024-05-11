"use client";

import { get, ref } from "firebase/database";
import { getServerSession } from "next-auth/next";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "./Components/Navbar";
import { database } from "./firebaseConfig";
import { getSession, useSession, signOut } from "next-auth/react";
import Modal from "./Components/Modal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState(null);

  const openModal = (server) => {
    setSelectedServer(server);
    setModalOpen(true);
  };
  const { data: session } = useSession();

  const [servers, setServers] = useState([]);

  useEffect(() => {
    const serversRef = ref(database, "Servers");
    get(serversRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const serversArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );
          setServers(serversArray);
        } else {
          console.log("No Data Available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      {session ? (
        <h1 className=" font-Audiowide text-center text-black text-xl md:text-3xl lg:text-5xl md:mb-10 md:my-10 my-5">
          {session.user?.email}'s Dashboard
        </h1>
      ) : (
        <h1 className=" font-Audiowide text-center text-black text-xl md:text-3xl lg:text-5xl md:mb-10">
          Dashboard
        </h1>
      )}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-10">
        {servers.map((server) => {
          console.log("Server status:", server.status);
          return (
            <div key={server.id}>
              <div
                className={`max-w-md mx-auto bg-white md:max-w-2xl md:h-96 h-72 md:w-72 w-72 shadow-lg group relative cursor-pointer items-center justify-center overflow-hidden rounded-xl hover:shadow-xl hover:scale-105 duration-500 transform  border border-solid${
                  server.status && server.status === "Up"
                    ? " border-green-500"
                    : server.status && server.status === "Down"
                    ? " border-red-500"
                    : " border-gray-500"
                }`}
              >
                <div className="flex items-start justify-center">
                  <Image
                    className="w-1/2 h-1/2 mt-8 object-cover transition-transform duration-500 group-hover:rotate-2 group-hover:scale-110 z-20"
                    src={"/next.svg"}
                    width={2}
                    height={2}
                  />
                </div>
                <div
                  className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${
                    server.status === "Up"
                      ? "group-hover:from-green-200/70 group-hover:via-green-100/20 group-hover:to-green-50/20"
                      : server.status === "Down"
                      ? " group-hover:from-red-200/70 group-hover:via-red-100/20 group-hover:to-red-50/20"
                      : " group-hover:from-black/70 group-hover:via-black/20 group-hover:to-black/20"
                  }`}
                ></div>
                <div className="absolute inset-0 flex translate-y-[40%] flex-col items-center justify-center px-6 md:px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                  <h1 className="font-dmserif text-xl md:text-3xl font-bold text-secondary opacity-100 transition-opacity duration-300">
                    {server.name}
                  </h1>
                  <h3 className="font-dmserif text-base md:text-xl font-bold text-secondary opacity-100 transition-opacity duration-300">
                    {server.status}
                  </h3>
                  <button
                    onClick={() => openModal(server)}
                    className="bg-black text-white inline-flex justify-center items-center gap-2 md:px-6 px-4 md:py-2 py-2 md:rounded-3xl rounded-2xl lg:mt-14 md:mt-8 mt-4 hover:scale-105 hover:drop-shadow-lg transition ease-in-out opacity-0 group-hover:opacity-100"
                  >
                    <p className="md:text-base text-sm">View Details</p>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {modalOpen && selectedServer && (
        <Modal onClose={() => setModalOpen(false)}>
          <div className="flex flex-col lg:flex-row md:justify-between md:items-between">
            <div className="">
              <h2 className="md:mb-4 mb-3 text-xl md:text-3xl font-body text-secondary text-center">
                {selectedServer.name}
              </h2>
              <div className="text-center md:text-left text-sm md:text-lg font-body md:mx-10  text-gray-700">
                <h3>Status: {selectedServer.status}</h3>
                <h3>IP Address: {selectedServer.ipaddress}</h3>
                <h3>Response Time: {selectedServer.responseTime}</h3>
                <h3>Up Time: {selectedServer.upTime}</h3>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
