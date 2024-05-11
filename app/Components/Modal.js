import React, { useRef, useEffect } from "react";

const Modal = ({ onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-75 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-md shadow-md relative"
      >
        <button
          className="absolute top-10 right-5 text-gray-600 hover:text-gray-800 transition-transform duration-500 hover:scale-110"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
