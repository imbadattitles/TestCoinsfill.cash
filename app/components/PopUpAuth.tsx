"use client";
import { Login } from "./Login";
import { useState } from "react";
import { MyButton } from "./MyButton";

const PopUpAuth: React.FC = () => {
  const [authType, setAuthType] = useState<"Login" | "Registration" | null>(
    "Login"
  );
  return (
    <>
      <div className=" flex flex-col gap-3 ">
        <MyButton
          onClick={() => setAuthType("Login")}
          text="Login"
          style="btn-orange"
        />
        <MyButton
          onClick={() => setAuthType("Registration")}
          text="Registration"
          style="btn-blue"
        />
      </div>
      {authType && <Login setVisible={setAuthType} type={authType} />}
    </>
  );
};
export { PopUpAuth };
