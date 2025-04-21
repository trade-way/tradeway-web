// src/pages/OrderPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoHeader from "../components/ui/logoHeader";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const OrderPage = () => {
  const navigate = useNavigate();
  const { cartItems, total } = useCart();
  const { deliveryDetails } = useCheckout();
  const [deliveryOption, setDeliveryOption] = useState("delivery"); // Default to delivery

  const handleBack = () => {
    navigate(-1); // Go back to delivery details
  };

  const handleProceedToPayment = () => {
    console.log("Order Details:", {
      cartItems,
      total,
      deliveryDetails,
      deliveryOption,
    });
    navigate("/payment-method");
  };

  const getBaseDeliveryFee = () => {
    switch (deliveryDetails?.state) {
      case "Lagos State":
        return 2000;
      case "Abuja":
        return 4000;
      case "Ogun State":
        return 3000;
      default:
        return 3500;
    }
  };

  const getDeliveryFee = () => {
    const baseFee = getBaseDeliveryFee();
    if (deliveryOption === "delivery") {
      return baseFee + 1500;
    } else {
      return baseFee;
    }
  };

  const handleDeliveryOptionChange = (value) => {
    setDeliveryOption(value);
  };

  const totalWithDelivery = total + getDeliveryFee();

  return (
    <div className="w-screen">
      <LogoHeader />
      <button
        className="justify-start w-[21.33px] h-[21.33px] p-[5.33px] ml-[66px] mt-[25px]"
        onClick={handleBack}
      >
        <ArrowLeft />
      </button>
      <Container className="p-6 mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold">Order Confirmation</h1>
          <p className="text-gray-600">Please review your order details before proceeding to payment.</p>
        </div>

        {cartItems && cartItems.length > 0 ? (
          <div className="border rounded-md p-4 shadow-sm space-y-4">
            <h3 className="font-semibold">Order Items:</h3>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center py-2">
                  <span>{item.product.name} ({item.quantity})</span>
                  <span>₦{(parseFloat(item.product.current_price || 0) * item.quantity).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <div className="font-semibold text-right">
              Subtotal: ₦{total.toLocaleString()}
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Delivery Option:</h3>
              <Select value={deliveryOption} onValueChange={handleDeliveryOptionChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delivery">Delivery (+₦1500)</SelectItem>
                  <SelectItem value="pickup">Pickup</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {deliveryDetails && (
              <div className="mt-4">
                <h3 className="font-semibold">Delivery Details:</h3>
                <p>Name: {deliveryDetails.firstName} {deliveryDetails.lastName}</p>
                <p>Address: {deliveryDetails.address}</p>
                <p>City, State: {deliveryDetails.city}, {deliveryDetails.state}</p>
                <p>Phone: {deliveryDetails.phone}</p>
                <p>Email: {deliveryDetails.email}</p>
                {deliveryDetails.additionalInfo && <p>Additional Info: {deliveryDetails.additionalInfo}</p>}
              </div>
            )}

            <div className="mt-4 font-semibold text-right">
              Delivery Fee: ₦{getDeliveryFee().toLocaleString()}
            </div>

            <div className="mt-4 font-extrabold text-right text-lg">
              Total: ₦{totalWithDelivery.toLocaleString()}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleProceedToPayment}
                className="px-6 py-3 text-white border border-green-800 rounded-md bg-green-800 hover:bg-green-700 active:bg-transparent"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </Container>
    </div>
  );
};

export default OrderPage;