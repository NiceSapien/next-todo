"use client";

import React from "react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, onSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal">
        {children}
        <div className="modal-actions">
          <button onClick={onSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          padding: 20px;
          border-radius: 10px;
          max-width: 500px;
          width: 100%;
        }
        .modal-actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background-color: #0070f3;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default CustomModal;
