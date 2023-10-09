import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import { type } from "os";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: { user: userReducer },
});

export const useAppDispatch = () => {
  return useDispatch<typeof store.dispatch>();
};
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export type Idispatch = typeof store.dispatch;
