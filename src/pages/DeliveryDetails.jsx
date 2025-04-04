import React from "react";
import { Input } from "../components/ui/input";

const DeliveryDetails = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-2xl font-extrabold">Input Address</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col">
            <span className="text-sm mb-1">First Name</span>
            <Input
              type="text"
              placeholder="Enter first name"
              className="text-sm sm:text-base"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm mb-1">Last Name</span>
            <Input
              type="text"
              placeholder="Enter last name"
              className="text-sm sm:text-base"
            />
          </div>

          {/* Second row */}
          <div className="flex flex-col">
            <span className="text-sm mb-1">E-Mail</span>
            <Input type="email" placeholder="Enter email address" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm mb-1">Phone number</span>
            <Input type="tel" placeholder="Enter phone number" />
          </div>

          {/* Full width inputs */}
          <div className="col-span-2 flex flex-col">
            <span className="text-sm mb-1">Full Address</span>
            <Input type="text" placeholder="Enter your full address" />
          </div>

          <div className="col-span-2 flex flex-col">
            <span className="text-sm mb-1">Additional Info</span>
            <Input type="text" placeholder="Enter additional information" />
          </div>

          {/* Last row */}
          <div className="flex flex-col">
            <span className="text-sm mb-1">State</span>
            <Input type="text" placeholder="Enter state" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm mb-1">City</span>
            <Input type="text" placeholder="Enter city" />
          </div>
        </div>

        {/* Checkbox */}
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-600" />
            <span>Set as Default Address</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md text-blue-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-800 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryDetails;
