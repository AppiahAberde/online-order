import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ open, title, message, onCancel, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="confirm-modal-backdrop">
      <div className="confirm-modal">
        <h3 className="confirm-modal-title">{title}</h3>
        <p className="confirm-modal-message">{message}</p>
        <div className="confirm-modal-actions">
          <button className="confirm-modal-btn cancel" onClick={onCancel}>Cancel</button>
          <button className="confirm-modal-btn confirm" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
