import React from "react";

const UnavailableModal = ({ handleCloseCardForm }) => {
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
          <p className="text-center text-gray-500"> This payment method is currently not available. Choose another method to proceed</p>

          <div className="flex justify-center">
            <button
              onClick={handleCloseCardForm}
              className="px-8 py-2.5 bg-blue-800 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnavailableModal;
