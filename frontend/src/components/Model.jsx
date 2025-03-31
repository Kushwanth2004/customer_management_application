import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
