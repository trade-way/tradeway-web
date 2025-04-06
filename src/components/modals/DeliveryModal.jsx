import React from "react";

const DeliveryModal = ({ handleCloseCardForm, handleConfirm }) => {
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
              - Kindly note that you would have to make payment before opening
              your package.
            </p>
            <p className="text-center">
              - Once the seal is broken, the item can only be returned if it is
              damaged, defective, or has missing parts.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => {
                handleCloseCardForm();
                handleConfirm();
              }}
              className="px-8 py-2.5 bg-blue-800 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryModal;
