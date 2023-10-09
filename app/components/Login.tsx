"use client";

import { Dispatch, SetStateAction } from "react";
import { AuthForm } from "./AuthForm";
interface ILogin {
  setVisible: Dispatch<SetStateAction<"Login" | "Registration" | null>>;
  type: "Login" | "Registration";
}
const Login: React.FC<ILogin> = ({ setVisible, type }) => {
  return (
    <div className=" z-20 flex fixed flex-col items-center justify-center top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80">
      <div className=" w-96 relative pt-14 px-10 pb-12 rounded-[35px] bg-gradient-to-b from-[#4936D4] to-[#6835D4]">
        <span
          onClick={() => setVisible(null)}
          className=" absolute -top-2 -right-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
          >
            <circle cx="19" cy="19" r="19" fill="#FFC543" />
            <path
              d="M20.6022 18.483L26.8197 12.2821C26.9425 12.139 27.0067 11.955 26.9994 11.7667C26.9921 11.5785 26.9139 11.3999 26.7803 11.2667C26.6468 11.1335 26.4677 11.0554 26.2789 11.0482C26.0902 11.0409 25.9056 11.1049 25.7622 11.2275L19.5447 17.4283L13.3272 11.22C13.1859 11.0791 12.9944 11 12.7947 11C12.5949 11 12.4034 11.0791 12.2622 11.22C12.1209 11.3608 12.0416 11.5519 12.0416 11.7511C12.0416 11.9502 12.1209 12.1413 12.2622 12.2821L18.4872 18.483L12.2622 24.6839C12.1836 24.7509 12.1199 24.8334 12.0749 24.9262C12.0298 25.019 12.0045 25.1201 12.0006 25.2231C11.9966 25.3261 12.014 25.4289 12.0517 25.5249C12.0894 25.6208 12.1466 25.708 12.2197 25.7809C12.2928 25.8538 12.3802 25.9109 12.4764 25.9485C12.5727 25.9861 12.6757 26.0034 12.7789 25.9994C12.8822 25.9955 12.9836 25.9702 13.0766 25.9253C13.1697 25.8804 13.2524 25.8168 13.3197 25.7385L19.5447 19.5377L25.7622 25.7385C25.9056 25.8611 26.0902 25.9251 26.2789 25.9178C26.4677 25.9106 26.6468 25.8325 26.7803 25.6993C26.9139 25.5661 26.9921 25.3875 26.9994 25.1993C27.0067 25.011 26.9425 24.827 26.8197 24.6839L20.6022 18.483Z"
              fill="#1E1E2E"
            />
          </svg>
        </span>
        <p className=" text-white font-bold text-2xl text-center mb-12">
          {type === "Login" && "Логин"}
          {type === "Registration" && "Регистрация"}
        </p>
        <AuthForm type={type} />
      </div>
    </div>
  );
};
export { Login };
