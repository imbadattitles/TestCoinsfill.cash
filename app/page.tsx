"use client";
import { PopUpAuth } from "./components/PopUpAuth";

export default function Home() {
  return (
    <main style={{ flex: "1 0 auto" }} className=" mx-8 mt-14">
      <h2 className=" text-2xl mb-20 font-bold">Выберите действие</h2>
      <PopUpAuth />
    </main>
  );
}
