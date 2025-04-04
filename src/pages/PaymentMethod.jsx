import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import visa from "@/assets/visa.png";
import mastercard from "@/assets/mastercard.png";
import paypal from "@/assets/paypal.png";
import applePay from "@/assets/apple-pay.png";
import googlePay from "@/assets/google-pay.png";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expireDate: "",
    cvv: "",
  });

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handleBack = () => {
    navigate(-1); // Goes back to previous page
  };

  const handleCancel = () => {
    navigate(-1); // Goes back to previous page
  };

  const handleConfirm = () => {
    if (selectedPayment) {
      // Handle the selected payment method
      console.log("Selected payment method:", selectedPayment);
      // Navigate to next page or process payment
      // navigate to next page
    } else {
      alert("Please select a payment method");
    }
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    // Handle payment processing
    console.log("Processing payment with:", cardDetails);
  };

  const handleCloseCardForm = () => {
    setSelectedPayment("");
  };

  const renderCardForm = () => {
    if (selectedPayment === "cards") {
      return (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseCardForm();
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-[500px] p-4 sm:p-8 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseCardForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="space-y-6">
              {/* Card Number */}
              <div>
                <Input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailsChange}
                  placeholder="1234 5678 9012 3456"
                  label="Card Number"
                  className="text-lg"
                />
              </div>

              {/* Expire Date and CVV */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Input
                    type="text"
                    id="expireDate"
                    name="expireDate"
                    value={cardDetails.expireDate}
                    onChange={handleCardDetailsChange}
                    placeholder="MM/YY"
                    label="Expire Date"
                    className="text-lg"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardDetailsChange}
                    placeholder="123"
                    label="CVC/CVV"
                    className="text-lg"
                  />
                </div>
              </div>

              {/* Payment Icons and Pay Button in same line */}
              <div className="flex items-center justify-between mt-8">
                <div className="flex space-x-3">
                  <img src={visa} alt="Visa" className="h-4" />
                  <img src={mastercard} alt="Mastercard" className="h-4" />
                  <img src={paypal} alt="PayPal" className="h-4" />
                  <img src={applePay} alt="Apple Pay" className="h-4" />
                  <img src={googlePay} alt="Google Pay" className="h-4" />
                </div>

                <button
                  onClick={handlePayment}
                  className="px-8 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderDeliveryModal = () => {
    if (selectedPayment === "delivery") {
      return (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseCardForm();
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-[500px] p-4 sm:p-8 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseCardForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-center">
                Pay with Cash on Delivery for orders below 50k naira
              </h3>

              <div className="space-y-4 text-gray-600">
                <p className="text-center">
                  - Kindly note that you would have to make payment before
                  opening your package.
                </p>
                <p className="text-center">
                  - Once the seal is broken, the item can only be returned if it
                  is damaged, defective, or has missing parts.
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    handleCloseCardForm();
                    handleConfirm();
                  }}
                  className="px-8 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

console.log("Selected payment method:", selectedPayment);
console.log("Card details:", cardDetails);
console.log("Processing payment with:", cardDetails);  const renderUnavailableModal = () => {
    if (["palmpay", "opay", "later"].includes(selectedPayment)) {
      return (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseCardForm();
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-[400px] p-4 sm:p-8 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseCardForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center">
                CURRENTLY UNAVAILABLE
              </h3>

              <div className="flex justify-center">
                <button
                  onClick={handleCloseCardForm}
                  className="px-8 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-16 sm:mt-20">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <button
          className="mr-4 hover:opacity-75 transition-opacity"
          onClick={handleBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-lg sm:text-xl font-bold flex-1 text-center">
          Select Payment Method
        </h1>
        <div className="w-5 sm:w-6"></div>
      </div>

      {/* Payment Options Container */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden relative">
        {/* Payment on Delivery Section */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="font-medium text-lg mb-4">Payment on delivery</h2>
          <div className="flex items-center py-2">
            <input
              type="radio"
              name="payment"
              id="delivery"
              className="h-5 w-5 text-blue-600 border-gray-300 cursor-pointer"
              checked={selectedPayment === "delivery"}
              onChange={() => handlePaymentSelect("delivery")}
            />
            <label htmlFor="delivery" className="ml-3 text-base cursor-pointer">
              Pay on delivery via bank transfer or cash
            </label>
          </div>
        </div>

        {/* Render Delivery Modal */}
        {renderDeliveryModal()}

        {/* Pay Now Section */}
        <div className="p-4 sm:p-6">
          <h2 className="font-medium text-lg mb-6">Pay Now</h2>
          <div className="space-y-6">
            {/* Cards, Bank Transfer, USSD Option */}
            <div className="flex items-center pb-6 border-b border-gray-200">
              <input
                type="radio"
                name="payment"
                id="cards"
                className="h-5 w-5 text-blue-600 border-gray-300 cursor-pointer"
                checked={selectedPayment === "cards"}
                onChange={() => handlePaymentSelect("cards")}
              />
              <label htmlFor="cards" className="ml-3 text-base cursor-pointer">
                Pay With Cards, Bank Transfer Or USSD
              </label>
            </div>

            {/* Move the card form render here */}
            {renderCardForm()}

            {/* Rest of payment options */}
            <div className="space-y-6 pt-2">
              <div className="flex flex-col pb-6 border-b border-gray-200">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    id="palmpay"
                    className="h-5 w-5 text-blue-600 border-gray-300 cursor-pointer"
                    checked={selectedPayment === "palmpay"}
                    onChange={() => handlePaymentSelect("palmpay")}
                  />
                  <label
                    htmlFor="palmpay"
                    className="ml-3 text-base cursor-pointer "
                  >
                    Pay With palmpay
                  </label>
                </div>
                <span className="text-sm text-gray-500 ml-8 mt-1">
                  Must be registered with Palmpay
                </span>
              </div>

              <div className="flex flex-col pb-6 border-b border-gray-200">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    id="opay"
                    className="h-5 w-5 text-blue-600 border-gray-300 cursor-pointer"
                    checked={selectedPayment === "opay"}
                    onChange={() => handlePaymentSelect("opay")}
                  />
                  <label
                    htmlFor="opay"
                    className="ml-3 text-base cursor-pointer "
                  >
                    Pay With Opay
                  </label>
                </div>
                <span className="text-sm text-gray-500 ml-8 mt-1 ">
                  Must be registered with Opay
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    id="later"
                    className="h-5 w-5 text-blue-600 border-gray-300 cursor-pointer"
                    checked={selectedPayment === "later"}
                    onChange={() => handlePaymentSelect("later")}
                  />
                  <label
                    htmlFor="later"
                    className="ml-3 text-base cursor-pointer "
                  >
                    Buy Now pay Later
                  </label>
                </div>
                <span className="text-sm text-gray-500 ml-8 mt-1 ">
                  Must be registered with Opay
                </span>
              </div>
            </div>

            {/* Render Unavailable Modal */}
            {renderUnavailableModal()}
          </div>
        </div>
      </div>

      {/* Payment Icons */}
      <div className="mt-8 sm:mt-12 flex justify-end space-x-3 sm:space-x-4">
        <img src={visa} alt="Visa" className="h-3 sm:h-4" />
        <img src={mastercard} alt="Mastercard" className="h-3 sm:h-4" />
        <img src={paypal} alt="PayPal" className="h-3 sm:h-4" />
        <img src={applePay} alt="Apple Pay" className="h-3 sm:h-4" />
        <img src={googlePay} alt="Google Pay" className="h-3 sm:h-4" />
      </div>

      {/* Action Buttons */}
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleCancel}
          className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border border-gray-300 rounded-md text-sm sm:text-base hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white rounded-md text-sm sm:text-base hover:bg-blue-700 transition-colors"
        >
          Confirm Payment method
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
