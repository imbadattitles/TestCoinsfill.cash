"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { infoUpdate } from "../API/api";

export default function Header() {
  const auth = useAppSelector((s) => s.user.user.auth);
  const avatar = useAppSelector((s) => s.user.user.avatar);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth) {
      infoUpdate(dispatch);
    }
  }, [auth]);

  return (
    <header className="flex mt-5 mx-10 justify-between items-end">
      <img src="/img/logo.svg" alt="CoinsFill" />
      <div className="flex gap-4 items-center">
        <span className=" bg-[url('/img/search.svg')] w-4 h-4 " />
        <img
          className={`w-6 h-6 rounded-full`}
          src={avatar ? avatar : "/img/user.svg"}
        />
      </div>
    </header>
  );
}
