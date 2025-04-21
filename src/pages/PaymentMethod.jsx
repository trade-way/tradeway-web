// src/pages/PaymentMethod.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import visa from "@/assets/visa.png";
import mastercard from "@/assets/mastercard.png";
import paypal from "@/assets/paypal.png";
import applePay from "@/assets/apple-pay.png";
import googlePay from "@/assets/google-pay.png";
import CardFormModal from "../components/modals/CardFormModal";
import DeliveryModal from "../components/modals/DeliveryModal";
import UnavailableModal from "../components/modals/UnavailableModal";
import LogoHeader from "../components/ui/logoHeader";
import { useCheckout } from "@/context/CheckoutContext"; // Import useCheckout
import { useCart } from "@/context/CartContext"; // Import useCart
import { paymentService } from "../services/api/paymentService"; // Import payment service

const PaymentMethod = () => {
  const navigate = useNavigate();
  const { paymentMethod, updatePaymentMethod, deliveryDetails } = useCheckout(); // Use context
  const { total } = useCart(); // Get total from CartContext
  const [showModal, setShowModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expireDate: "",
    cvv: "",
  });
  const [saveCardDetails, setSaveCardDetails] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    console.log("PaymentMethod component mounted");
    console.log("Initial paymentMethod:", paymentMethod);
    console.log("Initial deliveryDetails:", deliveryDetails);
    console.log("Initial total:", total);
  }, []);

  const handlePaymentSelect = (method) => {
    console.log("handlePaymentSelect called with:", method);
    updatePaymentMethod(method); // Update payment method in context
    setShowModal(false);
    setPaymentError(null); // Clear any previous errors
  };

  const handleBack = () => {
    console.log("handleBack called");
    navigate(-1); // Goes back to previous page
  };

  const handleCancel = () => {
    console.log("handleCancel called");
    updatePaymentMethod(""); // Reset payment method in context
    navigate(-1); // Goes back to previous page
  };

  const initiatePaystackPayment = async () => {
    console.log("initiatePaystackPayment called");
    setIsPaying(true);
    setPaymentError(null);
    try {
      const orderData = {
        total: total * 100, // Amount in kobo
        address: deliveryDetails?.address,
        deliveryDetails: deliveryDetails,
        // Add other necessary order details that your backend expects
      };
      console.log("Initiating payment with orderData:", orderData);
      const response = await paymentService.initiatePayment(orderData);
      console.log("Payment initiation response:", response);
      if (response?.data?.payment_link) { // Use payment_link from the actual response
        console.log("Redirecting to Paystack URL:", response.data.payment_link);
        window.location.href = response.data.payment_link;
      } else {
        setPaymentError("Failed to get payment link.");
        console.error("Payment initiation error:", response);
      }
    } catch (error) {
      setPaymentError("An error occurred while initiating payment.");
      console.error("Payment initiation error:", error);
    } finally {
      setIsPaying(false);
      console.log("initiatePaystackPayment finished. isPaying:", isPaying, "paymentError:", paymentError);
    }
  };
  const handleConfirm = () => {
    console.log("handleConfirm called. paymentMethod:", paymentMethod);
    if (paymentMethod === "cards") {
      initiatePaystackPayment();
    } else if (paymentMethod === "delivery") {
      setShowModal(true); // Show delivery confirmation modal
      console.log("Selected Payment Method:", paymentMethod);
      console.log("Delivery Details on Confirm:", deliveryDetails);
      // In a real scenario, you might want to send an order confirmation for COD here
    } else if (["palmpay", "opay", "later"].includes(paymentMethod)) {
      setShowModal(true); // Show unavailable modal
      console.log("Selected unavailable payment method:", paymentMethod);
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
    console.log("handleCardDetailsChange:", name, value);
  };

  const handlePayment = () => {
    // This function is now likely redundant with the direct Paystack initiation
    console.log("handlePayment called with cardDetails:", cardDetails, "deliveryDetails:", deliveryDetails, "paymentMethod:", paymentMethod);
    // After successful payment, you might navigate to an order confirmation page
  };

  const handleCloseCardForm = () => {
    console.log("handleCloseCardForm called");
    setShowModal(false);
    updatePaymentMethod(""); // Reset selected payment on modal close
  };

  const handleSaveCardDetails = (e) => {
    setSaveCardDetails(e.target.checked);
    console.log("handleSaveCardDetails:", e.target.checked);
  };

  const renderCardForm = () => {
    if (paymentMethod === "cards" && showModal) {
      console.log("Rendering CardFormModal");
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
    if (paymentMethod === "delivery" && showModal) {
      console.log("Rendering DeliveryModal");
      return (
        <DeliveryModal
          handleCloseCardForm={() => setShowModal(false)}
          handleConfirm={() => {
            // Handle final COD order submission
            console.log("COD order confirmed");
            // Potentially navigate to an order success page
          }}
        />
      );
    }
    return null;
  };

  const renderUnavailableModal = () => {
    if (["palmpay", "opay", "later"].includes(paymentMethod) && showModal) {
      console.log("Rendering UnavailableModal for:", paymentMethod);
      return <UnavailableModal handleCloseCardForm={() => setShowModal(false)} />;
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

        {paymentError && <p className="text-red-500 mb-4">{paymentError}</p>}

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
                checked={paymentMethod === "delivery"}
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
                  checked={paymentMethod === "cards"}
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
                      checked={paymentMethod === "palmpay"}
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
                      checked={paymentMethod === "opay"}
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
                      checked={paymentMethod === "later"}
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
            className={`w-[280px] py-3 bg-[#0040FF] text-white rounded-[15px] text-base hover:bg-blue-700 transition-colors ${isPaying ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isPaying}
          >
            {isPaying ? 'Processing Payment...' : 'Confirm payment method'}
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;