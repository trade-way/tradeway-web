// InputWrapper.js
import React from "react";

const InputWrapper = ({ label, children }) => {
  return (
    <div className="">
      <fieldset
        className="border border-[#c1c3ca] rounded-md flex items-center z-10"
        style={{
          height: "66.64px",
          // justify: "space-between",
          // margin: "14px"
        }}
      >
        <legend className="text-sm text-muted-foreground mx-3">{label}</legend>
        {children}
      </fieldset>
    </div>
  );
};

export default InputWrapper;
