// Example in your CheckoutContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CheckoutContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({ children }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    additionalInfo: "",
    state: "",
    city: "",
    isDefault: false,
  });

  const updateDeliveryDetails = (newDetails) => {
    setDeliveryDetails(newDetails);
  };

  const updatePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const value = {
    paymentMethod,
    updatePaymentMethod,
    deliveryDetails,
    updateDeliveryDetails,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};