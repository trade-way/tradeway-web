// src/pages/PaymentMethod.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// ... other imports
import LogoHeader from "../components/ui/logoHeader";
import { useCheckout, useCart } from "@/context/CheckoutContext"; // Import useCart
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Assuming you have a UI library

const PaymentMethod = () => {
  const navigate = useNavigate();
  const { paymentMethod, updatePaymentMethod, deliveryDetails } = useCheckout();
  const { total } = useCart(); // Assuming you have total in CartContext
  const [showModal, setShowModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("delivery"); // To track pickup/delivery choice
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    calculateDeliveryFee();
    // Ensure Paystack script is loaded (ideally in your index.html)
  }, [deliveryDetails?.state, deliveryOption]);

  const calculateDeliveryFee = () => {
    let baseFee = 0;
    switch (deliveryDetails?.state) {
      case "Lagos State":
        baseFee = 2000;
        break;
      case "Abuja":
        baseFee = 4000;
        break;
      case "Ogun State":
        baseFee = 3000;
        break;
      default:
        baseFee = 3500;
    }

    if (deliveryOption === "delivery") {
      setDeliveryFee(baseFee + 1500);
    } else {
      setDeliveryFee(baseFee);
    }
  };

  const handlePaymentSelect = (method) => {
    updatePaymentMethod(method);
    setShowModal(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    updatePaymentMethod("");
    navigate(-1);
  };

  const initiatePaystackPayment = async () => {
    if (!deliveryDetails?.email) {
      alert("Please provide an email address in the delivery details.");
      return;
    }

    setPaymentProcessing(true);
    const amountInKobo = (total + deliveryFee) * 100;
    const orderReference = `ORDER_${Date.now()}`; // Ideally use your actual order ID

    try {
      const response = await fetch('/api/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInKobo,
          email: deliveryDetails.email,
          reference: orderReference,
          deliveryOption, // Send delivery option to backend
          deliveryDetails, // Send delivery details to backend if needed
          total, // Send cart total
          cartItems: [], // Send cart items if needed
        }),
      });

      const data = await response.json();

      if (data?.authorization_url) {
        window.location.href = data.authorization_url;
      } else if (data?.message) {
        alert(`Payment initialization failed: ${data.message}`);
      } else {
        alert("Payment initialization failed.");
      }
    } catch (error) {
      console.error("Error initiating Paystack payment:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handleConfirm = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (paymentMethod === "cards") {
      initiatePaystackPayment();
    } else if (paymentMethod === "delivery") {
      setShowModal(true); // Show delivery confirmation modal
      console.log("Payment on Delivery selected");
      // In a real scenario, finalize order on backend with "payment on delivery" status
      navigate("/order-confirmation");
    } else if (["palmpay", "opay", "later"].includes(paymentMethod)) {
      setShowModal(true); // Show unavailable modal
    }
  };

  const renderDeliveryModal = () => {
    if (paymentMethod === "delivery" && showModal) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Payment on Delivery</h2>
            <p className="mb-4">Are you sure you want to proceed with payment on delivery?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100">
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/order-confirmation"); // Navigate to order confirmation
                  // You would also trigger an API call to your backend here
                  // to finalize the order with payment on delivery status.
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderUnavailableModal = () => {
    if (["palmpay", "opay", "later"].includes(paymentMethod) && showModal) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">{paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)} Payment</h2>
            <p className="mb-4">This payment method is currently unavailable.</p>
            <div className="flex justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100">
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <LogoHeader />
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="mr-4 hover:opacity-75 transition-opacity">
            {/* Back arrow SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg sm:text-xl font-bold flex-1 text-center">Select Payment Method</h1>
          <div className="w-5 sm:w-6"></div>
        </div>

        <div className="bg-white rounded-[32px] border border-gray-200 p-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="font-medium text-lg mb-3">Delivery Option</h2>
            <Select value={deliveryOption} onValueChange={setDeliveryOption}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delivery">Delivery (+₦1500)</SelectItem>
                <SelectItem value="pickup">Pickup</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-2">Your delivery fee: ₦{deliveryFee.toLocaleString()}</p>
          </div>

          <div className="border-b border-gray-200 pb-4 mt-4">
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
              <label htmlFor="delivery" className="ml-3 text-base cursor-pointer">
                Pay on delivery via bank transfer or cash
              </label>
            </div>
          </div>

          {renderDeliveryModal()}

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
                <label htmlFor="cards" className="ml-3 text-base cursor-pointer">
                  Pay With Cards, Bank Transfer Or USSD
                </label>
              </div>

              {/* CardFormModal might not be directly used with Paystack Inline */}
              {/* {renderCardForm()} */}

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
                    <label htmlFor="palmpay" className="ml-3 text-base cursor-pointer">
                      Pay With palmpay
                    </label>
                  </div>
                  <span className="text-sm text-gray-500 ml-8 mt-1">Must be registered with Palmpay</span>
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
                    <label htmlFor="opay" className="ml-3 text-base cursor-pointer">
                      Pay With Opay
                    </label>
                  </div>
                  <span className="text-sm text-gray-500 ml-8 mt-1">Must be registered with Opay</span>
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
                    <label htmlFor="later" className="ml-3 text-base cursor-pointer">
                      Buy Now pay Later
                    </label>
                  </div>
                  <span className="text-sm text-gray-500 ml-8 mt-1">Must be registered with Opay</span>
                </div>
              </div>

              {renderUnavailableModal()}

              <div className="flex justify-center items-center space-x-4 pt-4 mt-4 border-t border-gray-200">
                {/* Payment logos */}
                {/* <img src={visa} alt="Visa" className="h-4 sm:h-5" /> */}
                {/* <img src={mastercard} alt="Mastercard" className="h-4 sm:h-5" /> */}
                {/* <img src={paypal} alt="PayPal" className="h-4 sm:h-5" /> */}
                {/* <img src={applePay} alt="Apple Pay" className="h-4 sm:h-5" /> */}
                {/* <img src={googlePay} alt="Google Pay" className="h-4 sm:h-5" /> */}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center items-center space-x-4">
          <button onClick={handleCancel} className="w-[180px] py-3 border border-[#DDE2E4] rounded-[15px] text-[#667085] text-base hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="w-[280px] py-3 bg-[#0040FF] text-white rounded-[15px] text-base hover:bg-blue-700 transition-colors"
            disabled={paymentProcessing}
          >
            {paymentProcessing ? "Processing Payment..." : "Confirm payment method"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;