import React, { useState } from "react";
import {TransparentInput} from "../components/ui/transparentInput";
import LogoHeader from "../components/ui/logoHeader";
import InputWrapper from "../components/ui/InputWrapper";
import {ArrowLeft} from "lucide-react";

const DeliveryDetails = () => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleCancel = () => {
    setFormData({
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
  };

  return (
    <div className="w-screen">
      <LogoHeader />
      <button
          className="justify-start w-[21.33px] h-[21.33px] p-[5.33px] ml-[66px] mt-[25px]"
        >
          <ArrowLeft/>
        </button>
      <div className="w-screen p-6 mx-auto"> 
       
        <div className= "text-center mb-6">
       
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
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border-none outline-none h-full focus:ring-0 focus:border-transparent"
                />
              </InputWrapper>
              <InputWrapper label="Last Name">
                <TransparentInput
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
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
                  value={formData.email}
                  onChange={handleChange}
                  className="border-none outline-none h-full focus:ring-0 focus:border-transparent"
                />
              </InputWrapper>
              <InputWrapper label="Phone Number">
                <TransparentInput
                  id="telephone"
                  name="phone"
                  type="text"
                  value={formData.phone}
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
                  value={formData.address}
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
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="border-none outline-none h-full focus:ring-0 focus:border-transparent"
                />
              </InputWrapper>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-2 gap-[20px] col-span-2">
              <InputWrapper label="State">
                <TransparentInput
                  id="state"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  className="border-none outline-none h-full focus:ring-0 focus:shadow-none focus:border-transparent"
                />
              </InputWrapper>
              <InputWrapper label="City">
                <TransparentInput
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
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
                checked={formData.isDefault}
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
              className="px-[30px] py-[7px] text-[#9c9c9c] font-bold text border border-[#c1c3ca] border-[2px] rounded-md bg-transparent hover:bg-gray-100 active:bg-transparent"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white border border-blue-800 rounded-md bg-blue-800 hover:bg-blue-700 active:bg-transparent"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryDetails;
