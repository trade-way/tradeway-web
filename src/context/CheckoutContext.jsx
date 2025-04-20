// src/context/CheckoutContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({ children }) => {
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

  const [paymentMethod, setPaymentMethod] = useState("");

  const updateDeliveryDetails = (details) => {
    setDeliveryDetails(details);
  };

  const updatePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  return (
    <CheckoutContext.Provider value={{
      deliveryDetails,
      paymentMethod,
      updateDeliveryDetails,
      updatePaymentMethod,
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};