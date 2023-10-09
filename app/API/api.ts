import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Idispatch } from "../Redux/store";
import { FieldType } from "../components/AuthForm";
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { authUser, setAvatar } from "../Redux/user/UserSlice";
import jwtDecode from "jwt-decode";

export const onFinishLogin = async (
  values: FieldType,
  router: AppRouterInstance,
  checked: boolean,
  dispatch: Idispatch
) => {
  values.agree = checked;

  if (values.agree === false) return alert("Подтвердите согласие");
  let response = await fetch("https://test-task.test211.workers.dev/login", {
    method: "POST",
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  }).then((result) => result.json());

  if (response.errors) return alert(JSON.stringify(response));

  localStorage.setItem("token-tt", response.token);
  dispatch(authUser(response.token));
  router.push("/DownloadAvatar");
};

export const onFinishRegistration = async (
  values: FieldType,
  router: AppRouterInstance,
  checked: boolean,
  dispatch: Idispatch
) => {
  values.agree = checked;
  if (values.agree === false) return alert("Подтвердите согласие");
  let response = await fetch("https://test-task.test211.workers.dev/user", {
    method: "POST",
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  }).then((result) => result.json());
  if (response.errors) return alert(JSON.stringify(response));
  localStorage.setItem("token-tt", response.token);
  dispatch(authUser(response.token));
  router.push("/DownloadAvatar");
};

export const infoUpdate = async (dispatch: Idispatch) => {
  let token: string | null = localStorage.getItem("token-tt");
  if (token === null) {
    token = "null";
  }
  let response = await fetch(
    "https://test-task.test211.workers.dev/account/image",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "token-tt": token,
      },
    }
  ).then((result) => result.json());
  console.log(response);
  if (response.ok === false) return dispatch(setAvatar(null));
  dispatch(setAvatar(response.image));
};
