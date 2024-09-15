
import React from 'react';
import "./ModalComponent.css"; // Import your modal styles
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";

const ModalComponent = ({ isOpen, onClose, children }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
  
    const handleOverlayClick = (event) => {
      if (event.target.className === "modalComponent-overlay") {
        onClose();
        navigate(location.pathname); // Navigate back to the previous location
      }
    };
  
    if (!isOpen) return null;

  return (
    <div className="modalComponent-overlay" onClick={handleOverlayClick}>
      <div className="modalComponent">
        <div className="modalComponent-buttonContainer">
          <button onClick={onClose} className="modalComponent-button" >
          <IoIosCloseCircle className="modalComponent-button icon"/>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;