import React from "react";
import tick from "../../assets/icon/check.png";
import Button from "./Button";
const ConfirmationMessage = ({
  text,
  status,
  buttonText,
  onClick,
  classNames,
  type,
}) => {
  return (
    <div className="h-[100vh] w-full flex justify-center pt-60 bg-[#848484]">
      <div className="bg-white w-[280px] h-[220px] rounded-lg flex flex-col justify-center items-center gap-3 font-semibold">
        <img className="h-8 w-8" src={tick} alt="" />
        <div className="flex flex-col justify-center items-center">
          <p>{text}</p>
          <p>{status}</p>
        </div>
        {buttonText && (
          <Button
            type={type}
            onClick={onClick}
            text={buttonText}
            classNames={classNames}
          />
        )}
      </div>
    </div>
  );
};

export default ConfirmationMessage;