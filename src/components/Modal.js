import React from 'react'
import './css/modal.css'

function Modal({ header, content, isOpen }) {
  return (
    <div
      className={`
        modal-component d-flex flex-column 
        justify-content-between align-items-center 
        p-5 bg-light border border-5 border-danger
        rounded
        `}
      style={isOpen ? {} : { display: "none", visibility: "hidden" }}
    >
      <div className="mb-5 fw-bold">{header}</div>
      <div className="w-100 d-flex justify-content-center">{content}</div>
    </div>
  );
}

export default Modal