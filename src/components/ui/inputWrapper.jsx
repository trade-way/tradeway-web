import React from "react";

const InputWrapper = ({ label, children }) => {
  return (
    <div className="w-full">
      <fieldset
        className="w-full border border-[#c1c3ca] rounded-md px-3 flex items-center"
        style={{ height: "66.64px" }}
      >
        <legend className="text-sm text-muted-foreground px-2">{label}</legend>
        <div className="w-full">{children}</div>
      </fieldset>
    </div>
  );
};

export default InputWrapper;
