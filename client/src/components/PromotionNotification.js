import React, { useState } from 'react';
import './PromotionNotification.css';

const PromotionNotification = () => {
  const [showNotification, setShowNotification] = useState(true);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <>
      {showNotification && (
        <div className="promotion-notification-wrapper">
          <div className="promotion-notification">
            <p>This is a sample promotion message.</p>
            <button className="close-button" onClick={handleCloseNotification}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PromotionNotification;
