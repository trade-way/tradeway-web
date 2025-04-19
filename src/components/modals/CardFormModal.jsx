import React from "react";
import { Input } from "../ui/input";
import visa from "@/assets/visa.png";
import mastercard from "@/assets/mastercard.png";
import paypal from "@/assets/paypal.png";
import applePay from "@/assets/apple-pay.png";
import googlePay from "@/assets/google-pay.png";

const CardFormModal = ({
  cardDetails,
  handleCardDetailsChange,
  handlePayment,
  handleCloseCardForm,
  saveCardDetails,
  handleSaveCardDetails,
}) => {
  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleCloseCardForm();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[500px] p-4 sm:p-8 relative ">
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

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="saveCard"
              checked={saveCardDetails}
              onChange={handleSaveCardDetails}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="saveCard" className="text-sm text-gray-600">
              Save Card Details For Future Payment
            </label>
          </div>

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
              className="px-8 py-2.5 bg-blue-800 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFormModal;





