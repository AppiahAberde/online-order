import React from 'react';
import '../App.css'; // Ensure you import your CSS file

const Modal = ({ url, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <iframe src={url} title="Payment" style={{ width: '100%', height: 'calc(100vh - 40px)', border: 'none' }}></iframe>
      </div>
    </div>
  );
};

export default Modal;

