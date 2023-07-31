import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PayPalButton = ({ amount }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
      <div className="paypal-button">
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toFixed(2),
                  },
                },
              ],
            });
          }}
        />
        <div className="paypal-icon">
          <FontAwesomeIcon icon={faPaypal} size="2x" />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
