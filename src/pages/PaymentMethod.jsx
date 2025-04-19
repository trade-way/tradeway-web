import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import visa from "@/assets/visa.png";
import mastercard from "@/assets/mastercard.png";
import paypal from "@/assets/paypal.png";
import applePay from "@/assets/apple-pay.png";
import googlePay from "@/assets/google-pay.png";
import CardFormModal from "../components/modals/CardFormModal";
import DeliveryModal from "../components/modals/DeliveryModal";
import UnavailableModal from "../components/modals/UnavailableModal";
import LogoHeader from "../components/ui/logoHeader";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expireDate: "",
    cvv: "",
  });
  const [saveCardDetails, setSaveCardDetails] = useState(false);

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
    setShowModal(false);
  };

  const handleBack = () => {
    navigate(-1); // Goes back to previous page
  };

  const handleCancel = () => {
    navigate(-1); // Goes back to previous page
  };

  const handleConfirm = () => {
    if (selectedPayment) {
      setShowModal(true);
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
    setShowModal(false);
    setSelectedPayment("");
  };

  const handleSaveCardDetails = (e) => {
    setSaveCardDetails(e.target.checked);
  };

  const renderCardForm = () => {
    if (selectedPayment === "cards" && showModal) {
      return (
        <CardFormModal
          cardDetails={cardDetails}
          handleCardDetailsChange={handleCardDetailsChange}
          handlePayment={handlePayment}
          handleCloseCardForm={handleCloseCardForm}
          saveCardDetails={saveCardDetails}
          handleSaveCardDetails={handleSaveCardDetails}
        />
      );
    }
    return null;
  };

  const renderDeliveryModal = () => {
    if (selectedPayment === "delivery" && showModal) {
      return (
        <DeliveryModal
          handleCloseCardForm={handleCloseCardForm}
          handleConfirm={handleConfirm}
        />
      );
    }
    return null;
  };

  const renderUnavailableModal = () => {
    if (["palmpay", "opay", "later"].includes(selectedPayment) && showModal) {
      return <UnavailableModal handleCloseCardForm={handleCloseCardForm} />;
    }
    return null;
  };

  return (
    <>
      <LogoHeader />
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
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
        <div className="bg-white rounded-[32px] border border-gray-200 p-6">
          {/* Payment on Delivery Section */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="font-medium text-lg mb-3">Payment on delivery</h2>
            <div className="flex items-center">
              <input
                type="radio"
                name="payment"
                id="delivery"
                className="h-5 w-5 text-blue-600 border-gray-300 cursor-pointer"
                checked={selectedPayment === "delivery"}
                onChange={() => handlePaymentSelect("delivery")}
              />
              <label
                htmlFor="delivery"
                className="ml-3 text-base cursor-pointer"
              >
                Pay on delivery via bank transfer or cash
              </label>
            </div>
          </div>

          {/* Render Delivery Modal */}
          {renderDeliveryModal()}

          {/* Pay Now Section */}
          <div className="pt-4">
            <h2 className="font-medium text-lg mb-4">Pay Now</h2>
            <div className="space-y-4">
              <div className="flex items-center pb-4 border-b border-gray-200">
                <input
                  type="radio"
                  name="payment"
                  id="cards"
                  className="h-5 w-5 text-blue-600 border-gray-300 cursor-pointer"
                  checked={selectedPayment === "cards"}
                  onChange={() => handlePaymentSelect("cards")}
                />
                <label
                  htmlFor="cards"
                  className="ml-3 text-base cursor-pointer"
                >
                  Pay With Cards, Bank Transfer Or USSD
                </label>
              </div>

              {renderCardForm()}

              {/* Rest of payment options */}
              <div className="space-y-4">
                <div className="flex flex-col pb-4 border-b border-gray-200">
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
                      className="ml-3 text-base cursor-pointer"
                    >
                      Pay With palmpay
                    </label>
                  </div>
                  <span className="text-sm text-gray-500 ml-8 mt-1">
                    Must be registered with Palmpay
                  </span>
                </div>

                <div className="flex flex-col pb-4 border-b border-gray-200">
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
                      className="ml-3 text-base cursor-pointer"
                    >
                      Pay With Opay
                    </label>
                  </div>
                  <span className="text-sm text-gray-500 ml-8 mt-1">
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
                      className="ml-3 text-base cursor-pointer"
                    >
                      Buy Now pay Later
                    </label>
                  </div>
                  <span className="text-sm text-gray-500 ml-8 mt-1">
                    Must be registered with Opay
                  </span>
                </div>
              </div>

              {renderUnavailableModal()}

              <div className="flex justify-center items-center space-x-4 pt-4 mt-4 border-t border-gray-200">
                <img src={visa} alt="Visa" className="h-4 sm:h-5" />
                <img src={mastercard} alt="Mastercard" className="h-4 sm:h-5" />
                <img src={paypal} alt="PayPal" className="h-4 sm:h-5" />
                <img src={applePay} alt="Apple Pay" className="h-4 sm:h-5" />
                <img src={googlePay} alt="Google Pay" className="h-4 sm:h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center items-center space-x-4">
          <button
            onClick={handleCancel}
            className="w-[180px] py-3 border border-[#DDE2E4] rounded-[15px] text-[#667085] text-base hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="w-[280px] py-3 bg-[#0040FF] text-white rounded-[15px] text-base hover:bg-blue-700 transition-colors"
          >
            Confirm payment method
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
