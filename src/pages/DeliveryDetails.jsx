// src/pages/DeliveryDetails.jsx
import React, { } from "react";
import { useNavigate } from "react-router-dom";
import { TransparentInput } from "../components/ui/transparentInput";
import LogoHeader from "../components/ui/logoHeader";
import InputWrapper from "../components/ui/inputWrapper";
import { ArrowLeft } from "lucide-react";
import { useCheckout } from "../context/CheckoutContext"; // Import useCheckout
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Adjust import path if needed

const DeliveryDetails = () => {
  const navigate = useNavigate();
  const { deliveryDetails, updateDeliveryDetails } = useCheckout();

  const states = ["Lagos State", "Abuja", "Ogun State"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateDeliveryDetails({
      ...deliveryDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleStateChange = (value) => {
    updateDeliveryDetails({
      ...deliveryDetails,
      state: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Delivery Details:", deliveryDetails);
    navigate("/orders");
  };

  const handleCancel = () => {
    updateDeliveryDetails({
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
    navigate(-1);
  };


  return (
    <div className="w-screen">
      <LogoHeader />
      <button
        className="justify-start w-[21.33px] h-[21.33px] p-[5.33px] ml-[66px] mt-[25px]"
        onClick={handleCancel}
      >
        <ArrowLeft />
      </button>
      <div className="w-screen p-6 mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold">Input Address</h1>
        </div>

        <form className="w-[757px] mx-auto" onSubmit={handleSubmit}>
          <div className="border-3 shadow-none rounded-[16px] p-[24px] gap-[9.16px]">
            <div className="grid grid-cols-2 gap-[14px]">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-[20px] col-span-2">
                <InputWrapper label="First Name">
                  <TransparentInput
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={deliveryDetails.firstName}
                    onChange={handleChange}
                    className="border-none outline-none h-full focus:ring-0 focus:border-transparent"
                  />
                </InputWrapper>
                <InputWrapper label="Last Name">
                  <TransparentInput
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={deliveryDetails.lastName}
                    onChange={handleChange}
                    className="border-none h-full outline-none focus-within:ring-0 focus-within:border-transparent"
                  />
                </InputWrapper>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-[20px] col-span-2">
                <InputWrapper label="E-Mail">
                  <TransparentInput
                    id="email"
                    name="email"
                    type="email"
                    value={deliveryDetails.email}
                    onChange={handleChange}
                    className="border-none outline-none h-full focus:ring-0 focus:border-transparent"
                  />
                </InputWrapper>
                <InputWrapper label="Phone Number">
                  <TransparentInput
                    id="telephone"
                    name="phone"
                    type="text"
                    value={deliveryDetails.phone}
                    onChange={handleChange}
                    className="border-none outline-none h-full focus:ring-0 focus:border-transparent"
                  />
                </InputWrapper>
              </div>

              {/* Row 3 */}
              <div className="col-span-2">
                <InputWrapper label="Full Address">
                  <TransparentInput
                    id="address"
                    name="address"
                    type="text"
                    value={deliveryDetails.address}
                    onChange={handleChange}
                    className="border-none outline-none h-full focus:ring-0 focus:border-transparent"
                  />
                </InputWrapper>
              </div>

              {/* Row 4 */}
              <div className="col-span-2">
                <InputWrapper label="Additional Info">
                  <TransparentInput
                    id="additionalInfo"
                    name="additionalInfo"
                    type="text"
                    value={deliveryDetails.additionalInfo}
                    onChange={handleChange}
                    className="border-none outline-none h-full focus:ring-0 focus:border-transparent"
                  />
                </InputWrapper>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-2 gap-[20px] col-span-2">
                <InputWrapper label="State">
                  <Select value={deliveryDetails.state} onValueChange={handleStateChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </InputWrapper>
                <InputWrapper label="City">
                  <TransparentInput
                    id="city"
                    name="city"
                    type="text"
                    value={deliveryDetails.city}
                    onChange={handleChange}
                    className="border-none outline-none h-full focus:ring-0 focus:border-transparent"
                  />
                </InputWrapper>
              </div>
            </div>

            {/* Checkbox */}
            <div className="mt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  className="text-blue-600 form-checkbox"
                  checked={deliveryDetails.isDefault}
                  onChange={handleChange}
                />
                <span>Set as Default Address</span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              type="button"
              className="px-[30px] py-[7px] text-[#9c9c9c] font-bold text  border-[#c1c3ca] border-[2px] rounded-md bg-transparent hover:bg-gray-100 active:bg-transparent"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white border border-blue-800 rounded-md bg-blue-800 hover:bg-blue-700 active:bg-transparent"
            >
              Proceed to Order Confirmation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryDetails;