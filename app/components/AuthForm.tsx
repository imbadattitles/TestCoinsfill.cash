"use client";
import React from "react";
import { Input, Form, Button, Checkbox, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";
import { useAppDispatch } from "../Redux/store";
import { authUser } from "../Redux/user/UserSlice";
import { onFinishLogin, onFinishRegistration } from "../API/api";

const onFinishFailedLogin = () => {};

export type FieldType = {
  email?: string;
  password?: string;
  agree?: boolean;
  repeatpassword?: string;
};

type IAuthForm = {
  type: "Login" | "Registration";
};

const AuthForm: React.FC<IAuthForm> = ({ type }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [checked, setChecked] = React.useState(false);

  return (
    <>
      {type === "Login" && (
        <Form
          name="kek"
          initialValues={{ remember: true }}
          onFinish={(values) =>
            onFinishLogin(values, router, checked, dispatch)
          }
          onFinishFailed={onFinishFailedLogin}
          autoComplete="off"
          layout="vertical"
          className=" flex flex-col gap-5"
        >
          <Form.Item<FieldType>
            label={
              <label className=" font-bold text-white text-sm">Email</label>
            }
            name="email"
            className="m-0"
            rules={[
              { required: true, message: "Пожалуйста введите вашу почту" },
            ]}
          >
            <Input
              prefix={
                <div className="absolute z-10 top-3 left-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M17.9895 13.5971C17.829 14.8167 17.2301 15.9361 16.3046 16.7463C15.3791 17.5566 14.1903 18.0022 12.9602 18C5.81411 18 8.14392e-06 12.1859 8.14392e-06 5.03987C-0.00219688 3.80982 0.443434 2.62102 1.25367 1.69552C2.06391 0.770017 3.18334 0.171096 4.40288 0.010618C4.71128 -0.0270375 5.02358 0.0360539 5.29317 0.190474C5.56276 0.344895 5.77517 0.582362 5.89871 0.867426L7.79954 5.11097V5.12177C7.89412 5.33998 7.93318 5.57822 7.91324 5.8152C7.89329 6.05219 7.81496 6.28055 7.68524 6.47988C7.66904 6.50418 7.65194 6.52668 7.63394 6.54918L5.76011 8.7704C6.43422 10.1402 7.86704 11.5604 9.25487 12.2363L11.4455 10.3724C11.467 10.3543 11.4896 10.3375 11.513 10.322C11.7122 10.1892 11.9413 10.1081 12.1797 10.0861C12.4181 10.0641 12.6582 10.1019 12.8783 10.196L12.89 10.2014L17.13 12.1013C17.4156 12.2244 17.6536 12.4367 17.8085 12.7063C17.9635 12.9759 18.027 13.2884 17.9895 13.5971Z"
                      fill="#86BFEB"
                      fill-opacity="0.5"
                    />
                  </svg>
                </div>
              }
              className="  rounded-3xl h-11 pl-12"
            />
          </Form.Item>
          <Form.Item<FieldType>
            className="m-0"
            label={
              <label className=" font-bold text-white text-sm">Пароль</label>
            }
            name="password"
            rules={[
              { required: true, message: "Пожалуйста введите ваш пароль" },
              { min: 5, message: "min 5" },
              {
                pattern: new RegExp(
                  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
                ),
                message:
                  "Password must contain at least one lowercase letter, uppercase letter, number, and special character",
              },
            ]}
          >
            <Input.Password
              prefix={
                <span className="absolute z-10 top-2.5 left-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="21"
                    viewBox="0 0 16 21"
                    fill="none"
                  >
                    <path
                      d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM8 16C6.9 16 6 15.1 6 14C6 12.9 6.9 12 8 12C9.1 12 10 12.9 10 14C10 15.1 9.1 16 8 16ZM5 7V5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7H5Z"
                      fill="#86BFEB"
                      fill-opacity="0.5"
                    />
                  </svg>
                </span>
              }
              className=" rounded-3xl  h-11 pl-12"
              visibilityToggle={true}
              iconRender={(visible) =>
                visible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                    className=" right-5"
                  >
                    <path
                      d="M14.9426 5.7C13.4276 2.1825 10.5776 0 7.50261 0C4.42761 0 1.57761 2.1825 0.0626136 5.7C0.0213161 5.79462 0 5.89676 0 6C0 6.10324 0.0213161 6.20538 0.0626136 6.3C1.57761 9.8175 4.42761 12 7.50261 12C10.5776 12 13.4276 9.8175 14.9426 6.3C14.9839 6.20538 15.0052 6.10324 15.0052 6C15.0052 5.89676 14.9839 5.79462 14.9426 5.7ZM7.50261 10.5C5.12511 10.5 2.87511 8.7825 1.57761 6C2.87511 3.2175 5.12511 1.5 7.50261 1.5C9.88011 1.5 12.1301 3.2175 13.4276 6C12.1301 8.7825 9.88011 10.5 7.50261 10.5ZM7.50261 3C6.90927 3 6.32925 3.17595 5.8359 3.50559C5.34256 3.83524 4.95804 4.30377 4.73097 4.85195C4.50391 5.40013 4.4445 6.00333 4.56026 6.58527C4.67601 7.16721 4.96174 7.70176 5.38129 8.12132C5.80085 8.54088 6.3354 8.8266 6.91734 8.94236C7.49929 9.05811 8.10248 8.9987 8.65066 8.77164C9.19884 8.54458 9.66738 8.16006 9.99702 7.66671C10.3267 7.17336 10.5026 6.59334 10.5026 6C10.5026 5.20435 10.1865 4.44129 9.62393 3.87868C9.06132 3.31607 8.29826 3 7.50261 3ZM7.50261 7.5C7.20594 7.5 6.91593 7.41203 6.66926 7.2472C6.42258 7.08238 6.23033 6.84811 6.11679 6.57403C6.00326 6.29994 5.97356 5.99834 6.03144 5.70736C6.08931 5.41639 6.23217 5.14912 6.44195 4.93934C6.65173 4.72956 6.91901 4.5867 7.20998 4.52882C7.50095 4.47094 7.80255 4.50065 8.07664 4.61418C8.35073 4.72771 8.585 4.91997 8.74982 5.16665C8.91464 5.41332 9.00261 5.70333 9.00261 6C9.00261 6.39782 8.84458 6.77936 8.56327 7.06066C8.28197 7.34196 7.90044 7.5 7.50261 7.5Z"
                      fill="#4D6AE4"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                  >
                    <path
                      d="M14.9426 5.7C13.4276 2.1825 10.5776 0 7.50261 0C4.42761 0 1.57761 2.1825 0.0626136 5.7C0.0213161 5.79462 0 5.89676 0 6C0 6.10324 0.0213161 6.20538 0.0626136 6.3C1.57761 9.8175 4.42761 12 7.50261 12C10.5776 12 13.4276 9.8175 14.9426 6.3C14.9839 6.20538 15.0052 6.10324 15.0052 6C15.0052 5.89676 14.9839 5.79462 14.9426 5.7ZM7.50261 10.5C5.12511 10.5 2.87511 8.7825 1.57761 6C2.87511 3.2175 5.12511 1.5 7.50261 1.5C9.88011 1.5 12.1301 3.2175 13.4276 6C12.1301 8.7825 9.88011 10.5 7.50261 10.5ZM7.50261 3C6.90927 3 6.32925 3.17595 5.8359 3.50559C5.34256 3.83524 4.95804 4.30377 4.73097 4.85195C4.50391 5.40013 4.4445 6.00333 4.56026 6.58527C4.67601 7.16721 4.96174 7.70176 5.38129 8.12132C5.80085 8.54088 6.3354 8.8266 6.91734 8.94236C7.49929 9.05811 8.10248 8.9987 8.65066 8.77164C9.19884 8.54458 9.66738 8.16006 9.99702 7.66671C10.3267 7.17336 10.5026 6.59334 10.5026 6C10.5026 5.20435 10.1865 4.44129 9.62393 3.87868C9.06132 3.31607 8.29826 3 7.50261 3ZM7.50261 7.5C7.20594 7.5 6.91593 7.41203 6.66926 7.2472C6.42258 7.08238 6.23033 6.84811 6.11679 6.57403C6.00326 6.29994 5.97356 5.99834 6.03144 5.70736C6.08931 5.41639 6.23217 5.14912 6.44195 4.93934C6.65173 4.72956 6.91901 4.5867 7.20998 4.52882C7.50095 4.47094 7.80255 4.50065 8.07664 4.61418C8.35073 4.72771 8.585 4.91997 8.74982 5.16665C8.91464 5.41332 9.00261 5.70333 9.00261 6C9.00261 6.39782 8.84458 6.77936 8.56327 7.06066C8.28197 7.34196 7.90044 7.5 7.50261 7.5Z"
                      fill="#D0D9FF"
                    />
                  </svg>
                )
              }
            />
          </Form.Item>
          <Form.Item className="m-0">
            <p className=" text-xs text-[#86BFEB] underline">Забыли пароль?</p>
          </Form.Item>
          <Row className=" flex-nowrap m-2 items-start">
            {checked ? (
              <svg
                onClick={() => setChecked(false)}
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className=" min-h-[14px] min-w-[14px] mr-3 mt-1.5"
              >
                <path
                  d="M1.75 0H12.25C13.216 0 14 0.784 14 1.75V12.25C14 12.7141 13.8156 13.1592 13.4874 13.4874C13.1592 13.8156 12.7141 14 12.25 14H1.75C1.28587 14 0.840752 13.8156 0.512563 13.4874C0.184374 13.1592 0 12.7141 0 12.25V1.75C0 0.784 0.784 0 1.75 0ZM1.5 1.75V12.25C1.5 12.388 1.612 12.5 1.75 12.5H12.25C12.3163 12.5 12.3799 12.4737 12.4268 12.4268C12.4737 12.3799 12.5 12.3163 12.5 12.25V1.75C12.5 1.6837 12.4737 1.62011 12.4268 1.57322C12.3799 1.52634 12.3163 1.5 12.25 1.5H1.75C1.6837 1.5 1.62011 1.52634 1.57322 1.57322C1.52634 1.62011 1.5 1.6837 1.5 1.75ZM10.78 5.28L6.28 9.78C6.13937 9.92045 5.94875 9.99934 5.75 9.99934C5.55125 9.99934 5.36063 9.92045 5.22 9.78L3.22 7.78C3.08759 7.63774 3.01549 7.44969 3.01884 7.25537C3.0222 7.06105 3.10076 6.8756 3.238 6.738C3.3756 6.60076 3.56105 6.5222 3.75537 6.51884C3.94969 6.51549 4.13774 6.58759 4.28 6.72L5.75 8.19L9.72 4.22C9.86226 4.08759 10.0503 4.01549 10.2446 4.01884C10.4389 4.0222 10.6244 4.10076 10.762 4.238C10.8992 4.3756 10.9778 4.56105 10.9812 4.75537C10.9845 4.94969 10.9124 5.13774 10.78 5.28Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                onClick={() => setChecked(true)}
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className=" min-h-[14px] min-w-[14px] mr-3 mt-1.5"
              >
                <path
                  d="M1.75 0H12.25C13.216 0 14 0.784 14 1.75V12.25C14 12.7141 13.8156 13.1592 13.4874 13.4874C13.1592 13.8156 12.7141 14 12.25 14H1.75C1.28587 14 0.840752 13.8156 0.512563 13.4874C0.184374 13.1592 0 12.7141 0 12.25V1.75C0 0.784 0.784 0 1.75 0ZM1.5 1.75V12.25C1.5 12.388 1.612 12.5 1.75 12.5H12.25C12.3163 12.5 12.3799 12.4737 12.4268 12.4268C12.4737 12.3799 12.5 12.3163 12.5 12.25V1.75C12.5 1.6837 12.4737 1.62011 12.4268 1.57322C12.3799 1.52634 12.3163 1.5 12.25 1.5H1.75C1.6837 1.5 1.62011 1.52634 1.57322 1.57322C1.52634 1.62011 1.5 1.6837 1.5 1.75Z"
                  fill="white"
                />
              </svg>
            )}
            <span className=" text-xs text-white">
              Нажимая кнопку, вы подтверждаете, что ознакомились и соглашаетесь
              с{" "}
              <Link className=" underline " href={"/"}>
                Условиями Соглашения!
              </Link>{" "}
              Правилами и политикой конфиденциальности компании
            </span>
          </Row>
          <Form.Item className="m-0">
            <Button
              className=" btn-orange w-full h-full"
              type="primary"
              htmlType="submit"
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      )}
      {type === "Registration" && (
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={(values) =>
            onFinishRegistration(values, router, checked, dispatch)
          }
          onFinishFailed={() => "df"}
          autoComplete="off"
          layout="vertical"
          className=" flex flex-col gap-5"
        >
          <Form.Item<FieldType>
            label={
              <label className=" font-bold text-white text-sm">Почта</label>
            }
            name="email"
            className="m-0"
            rules={[
              { required: true, message: "Пожалуйста введите вашу почту" },
            ]}
          >
            <Input
              prefix={
                <div className="absolute z-10 top-3 left-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M17.9895 13.5971C17.829 14.8167 17.2301 15.9361 16.3046 16.7463C15.3791 17.5566 14.1903 18.0022 12.9602 18C5.81411 18 8.14392e-06 12.1859 8.14392e-06 5.03987C-0.00219688 3.80982 0.443434 2.62102 1.25367 1.69552C2.06391 0.770017 3.18334 0.171096 4.40288 0.010618C4.71128 -0.0270375 5.02358 0.0360539 5.29317 0.190474C5.56276 0.344895 5.77517 0.582362 5.89871 0.867426L7.79954 5.11097V5.12177C7.89412 5.33998 7.93318 5.57822 7.91324 5.8152C7.89329 6.05219 7.81496 6.28055 7.68524 6.47988C7.66904 6.50418 7.65194 6.52668 7.63394 6.54918L5.76011 8.7704C6.43422 10.1402 7.86704 11.5604 9.25487 12.2363L11.4455 10.3724C11.467 10.3543 11.4896 10.3375 11.513 10.322C11.7122 10.1892 11.9413 10.1081 12.1797 10.0861C12.4181 10.0641 12.6582 10.1019 12.8783 10.196L12.89 10.2014L17.13 12.1013C17.4156 12.2244 17.6536 12.4367 17.8085 12.7063C17.9635 12.9759 18.027 13.2884 17.9895 13.5971Z"
                      fill="#86BFEB"
                      fill-opacity="0.5"
                    />
                  </svg>
                </div>
              }
              className="  rounded-3xl h-11 pl-12"
            />
          </Form.Item>
          <Form.Item<FieldType>
            className="m-0"
            label={
              <label className=" font-bold text-white text-sm">Пароль</label>
            }
            name="password"
            hasFeedback
            rules={[
              { required: true, message: "Пожалуйста введите ваш пароль" },
              { min: 5, message: "min 5" },
              {
                pattern: new RegExp(
                  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
                ),
                message:
                  "Password must contain at least one lowercase letter, uppercase letter, number, and special character",
              },
            ]}
          >
            <Input.Password
              prefix={
                <span className="absolute z-10 top-2.5 left-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="21"
                    viewBox="0 0 16 21"
                    fill="none"
                  >
                    <path
                      d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM8 16C6.9 16 6 15.1 6 14C6 12.9 6.9 12 8 12C9.1 12 10 12.9 10 14C10 15.1 9.1 16 8 16ZM5 7V5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7H5Z"
                      fill="#86BFEB"
                      fill-opacity="0.5"
                    />
                  </svg>
                </span>
              }
              className=" rounded-3xl  h-11 pl-12"
              visibilityToggle={true}
              iconRender={(visible) =>
                visible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                    className=" right-5"
                  >
                    <path
                      d="M14.9426 5.7C13.4276 2.1825 10.5776 0 7.50261 0C4.42761 0 1.57761 2.1825 0.0626136 5.7C0.0213161 5.79462 0 5.89676 0 6C0 6.10324 0.0213161 6.20538 0.0626136 6.3C1.57761 9.8175 4.42761 12 7.50261 12C10.5776 12 13.4276 9.8175 14.9426 6.3C14.9839 6.20538 15.0052 6.10324 15.0052 6C15.0052 5.89676 14.9839 5.79462 14.9426 5.7ZM7.50261 10.5C5.12511 10.5 2.87511 8.7825 1.57761 6C2.87511 3.2175 5.12511 1.5 7.50261 1.5C9.88011 1.5 12.1301 3.2175 13.4276 6C12.1301 8.7825 9.88011 10.5 7.50261 10.5ZM7.50261 3C6.90927 3 6.32925 3.17595 5.8359 3.50559C5.34256 3.83524 4.95804 4.30377 4.73097 4.85195C4.50391 5.40013 4.4445 6.00333 4.56026 6.58527C4.67601 7.16721 4.96174 7.70176 5.38129 8.12132C5.80085 8.54088 6.3354 8.8266 6.91734 8.94236C7.49929 9.05811 8.10248 8.9987 8.65066 8.77164C9.19884 8.54458 9.66738 8.16006 9.99702 7.66671C10.3267 7.17336 10.5026 6.59334 10.5026 6C10.5026 5.20435 10.1865 4.44129 9.62393 3.87868C9.06132 3.31607 8.29826 3 7.50261 3ZM7.50261 7.5C7.20594 7.5 6.91593 7.41203 6.66926 7.2472C6.42258 7.08238 6.23033 6.84811 6.11679 6.57403C6.00326 6.29994 5.97356 5.99834 6.03144 5.70736C6.08931 5.41639 6.23217 5.14912 6.44195 4.93934C6.65173 4.72956 6.91901 4.5867 7.20998 4.52882C7.50095 4.47094 7.80255 4.50065 8.07664 4.61418C8.35073 4.72771 8.585 4.91997 8.74982 5.16665C8.91464 5.41332 9.00261 5.70333 9.00261 6C9.00261 6.39782 8.84458 6.77936 8.56327 7.06066C8.28197 7.34196 7.90044 7.5 7.50261 7.5Z"
                      fill="#4D6AE4"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                  >
                    <path
                      d="M14.9426 5.7C13.4276 2.1825 10.5776 0 7.50261 0C4.42761 0 1.57761 2.1825 0.0626136 5.7C0.0213161 5.79462 0 5.89676 0 6C0 6.10324 0.0213161 6.20538 0.0626136 6.3C1.57761 9.8175 4.42761 12 7.50261 12C10.5776 12 13.4276 9.8175 14.9426 6.3C14.9839 6.20538 15.0052 6.10324 15.0052 6C15.0052 5.89676 14.9839 5.79462 14.9426 5.7ZM7.50261 10.5C5.12511 10.5 2.87511 8.7825 1.57761 6C2.87511 3.2175 5.12511 1.5 7.50261 1.5C9.88011 1.5 12.1301 3.2175 13.4276 6C12.1301 8.7825 9.88011 10.5 7.50261 10.5ZM7.50261 3C6.90927 3 6.32925 3.17595 5.8359 3.50559C5.34256 3.83524 4.95804 4.30377 4.73097 4.85195C4.50391 5.40013 4.4445 6.00333 4.56026 6.58527C4.67601 7.16721 4.96174 7.70176 5.38129 8.12132C5.80085 8.54088 6.3354 8.8266 6.91734 8.94236C7.49929 9.05811 8.10248 8.9987 8.65066 8.77164C9.19884 8.54458 9.66738 8.16006 9.99702 7.66671C10.3267 7.17336 10.5026 6.59334 10.5026 6C10.5026 5.20435 10.1865 4.44129 9.62393 3.87868C9.06132 3.31607 8.29826 3 7.50261 3ZM7.50261 7.5C7.20594 7.5 6.91593 7.41203 6.66926 7.2472C6.42258 7.08238 6.23033 6.84811 6.11679 6.57403C6.00326 6.29994 5.97356 5.99834 6.03144 5.70736C6.08931 5.41639 6.23217 5.14912 6.44195 4.93934C6.65173 4.72956 6.91901 4.5867 7.20998 4.52882C7.50095 4.47094 7.80255 4.50065 8.07664 4.61418C8.35073 4.72771 8.585 4.91997 8.74982 5.16665C8.91464 5.41332 9.00261 5.70333 9.00261 6C9.00261 6.39782 8.84458 6.77936 8.56327 7.06066C8.28197 7.34196 7.90044 7.5 7.50261 7.5Z"
                      fill="#D0D9FF"
                    />
                  </svg>
                )
              }
            />
          </Form.Item>
          <Form.Item<FieldType>
            className="m-0"
            label={
              <label className=" font-bold text-white text-sm">
                Подтвердите пароль
              </label>
            }
            name="repeatpassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "asd",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={
                <span className="absolute z-10 top-2.5 left-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="21"
                    viewBox="0 0 16 21"
                    fill="none"
                  >
                    <path
                      d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM8 16C6.9 16 6 15.1 6 14C6 12.9 6.9 12 8 12C9.1 12 10 12.9 10 14C10 15.1 9.1 16 8 16ZM5 7V5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7H5Z"
                      fill="#86BFEB"
                      fill-opacity="0.5"
                    />
                  </svg>
                </span>
              }
              className=" rounded-3xl  h-11 pl-12"
              visibilityToggle={true}
              iconRender={(visible) =>
                visible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                    className=" right-5"
                  >
                    <path
                      d="M14.9426 5.7C13.4276 2.1825 10.5776 0 7.50261 0C4.42761 0 1.57761 2.1825 0.0626136 5.7C0.0213161 5.79462 0 5.89676 0 6C0 6.10324 0.0213161 6.20538 0.0626136 6.3C1.57761 9.8175 4.42761 12 7.50261 12C10.5776 12 13.4276 9.8175 14.9426 6.3C14.9839 6.20538 15.0052 6.10324 15.0052 6C15.0052 5.89676 14.9839 5.79462 14.9426 5.7ZM7.50261 10.5C5.12511 10.5 2.87511 8.7825 1.57761 6C2.87511 3.2175 5.12511 1.5 7.50261 1.5C9.88011 1.5 12.1301 3.2175 13.4276 6C12.1301 8.7825 9.88011 10.5 7.50261 10.5ZM7.50261 3C6.90927 3 6.32925 3.17595 5.8359 3.50559C5.34256 3.83524 4.95804 4.30377 4.73097 4.85195C4.50391 5.40013 4.4445 6.00333 4.56026 6.58527C4.67601 7.16721 4.96174 7.70176 5.38129 8.12132C5.80085 8.54088 6.3354 8.8266 6.91734 8.94236C7.49929 9.05811 8.10248 8.9987 8.65066 8.77164C9.19884 8.54458 9.66738 8.16006 9.99702 7.66671C10.3267 7.17336 10.5026 6.59334 10.5026 6C10.5026 5.20435 10.1865 4.44129 9.62393 3.87868C9.06132 3.31607 8.29826 3 7.50261 3ZM7.50261 7.5C7.20594 7.5 6.91593 7.41203 6.66926 7.2472C6.42258 7.08238 6.23033 6.84811 6.11679 6.57403C6.00326 6.29994 5.97356 5.99834 6.03144 5.70736C6.08931 5.41639 6.23217 5.14912 6.44195 4.93934C6.65173 4.72956 6.91901 4.5867 7.20998 4.52882C7.50095 4.47094 7.80255 4.50065 8.07664 4.61418C8.35073 4.72771 8.585 4.91997 8.74982 5.16665C8.91464 5.41332 9.00261 5.70333 9.00261 6C9.00261 6.39782 8.84458 6.77936 8.56327 7.06066C8.28197 7.34196 7.90044 7.5 7.50261 7.5Z"
                      fill="#4D6AE4"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                  >
                    <path
                      d="M14.9426 5.7C13.4276 2.1825 10.5776 0 7.50261 0C4.42761 0 1.57761 2.1825 0.0626136 5.7C0.0213161 5.79462 0 5.89676 0 6C0 6.10324 0.0213161 6.20538 0.0626136 6.3C1.57761 9.8175 4.42761 12 7.50261 12C10.5776 12 13.4276 9.8175 14.9426 6.3C14.9839 6.20538 15.0052 6.10324 15.0052 6C15.0052 5.89676 14.9839 5.79462 14.9426 5.7ZM7.50261 10.5C5.12511 10.5 2.87511 8.7825 1.57761 6C2.87511 3.2175 5.12511 1.5 7.50261 1.5C9.88011 1.5 12.1301 3.2175 13.4276 6C12.1301 8.7825 9.88011 10.5 7.50261 10.5ZM7.50261 3C6.90927 3 6.32925 3.17595 5.8359 3.50559C5.34256 3.83524 4.95804 4.30377 4.73097 4.85195C4.50391 5.40013 4.4445 6.00333 4.56026 6.58527C4.67601 7.16721 4.96174 7.70176 5.38129 8.12132C5.80085 8.54088 6.3354 8.8266 6.91734 8.94236C7.49929 9.05811 8.10248 8.9987 8.65066 8.77164C9.19884 8.54458 9.66738 8.16006 9.99702 7.66671C10.3267 7.17336 10.5026 6.59334 10.5026 6C10.5026 5.20435 10.1865 4.44129 9.62393 3.87868C9.06132 3.31607 8.29826 3 7.50261 3ZM7.50261 7.5C7.20594 7.5 6.91593 7.41203 6.66926 7.2472C6.42258 7.08238 6.23033 6.84811 6.11679 6.57403C6.00326 6.29994 5.97356 5.99834 6.03144 5.70736C6.08931 5.41639 6.23217 5.14912 6.44195 4.93934C6.65173 4.72956 6.91901 4.5867 7.20998 4.52882C7.50095 4.47094 7.80255 4.50065 8.07664 4.61418C8.35073 4.72771 8.585 4.91997 8.74982 5.16665C8.91464 5.41332 9.00261 5.70333 9.00261 6C9.00261 6.39782 8.84458 6.77936 8.56327 7.06066C8.28197 7.34196 7.90044 7.5 7.50261 7.5Z"
                      fill="#D0D9FF"
                    />
                  </svg>
                )
              }
            />
          </Form.Item>

          <Form.Item className="m-0">
            <p className=" text-xs text-[#86BFEB] underline">Забыли пароль?</p>
          </Form.Item>
          <Row className=" flex-nowrap m-2 items-start">
            {checked ? (
              <svg
                onClick={() => setChecked(false)}
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className=" min-h-[14px] min-w-[14px] mr-3 mt-1.5"
              >
                <path
                  d="M1.75 0H12.25C13.216 0 14 0.784 14 1.75V12.25C14 12.7141 13.8156 13.1592 13.4874 13.4874C13.1592 13.8156 12.7141 14 12.25 14H1.75C1.28587 14 0.840752 13.8156 0.512563 13.4874C0.184374 13.1592 0 12.7141 0 12.25V1.75C0 0.784 0.784 0 1.75 0ZM1.5 1.75V12.25C1.5 12.388 1.612 12.5 1.75 12.5H12.25C12.3163 12.5 12.3799 12.4737 12.4268 12.4268C12.4737 12.3799 12.5 12.3163 12.5 12.25V1.75C12.5 1.6837 12.4737 1.62011 12.4268 1.57322C12.3799 1.52634 12.3163 1.5 12.25 1.5H1.75C1.6837 1.5 1.62011 1.52634 1.57322 1.57322C1.52634 1.62011 1.5 1.6837 1.5 1.75ZM10.78 5.28L6.28 9.78C6.13937 9.92045 5.94875 9.99934 5.75 9.99934C5.55125 9.99934 5.36063 9.92045 5.22 9.78L3.22 7.78C3.08759 7.63774 3.01549 7.44969 3.01884 7.25537C3.0222 7.06105 3.10076 6.8756 3.238 6.738C3.3756 6.60076 3.56105 6.5222 3.75537 6.51884C3.94969 6.51549 4.13774 6.58759 4.28 6.72L5.75 8.19L9.72 4.22C9.86226 4.08759 10.0503 4.01549 10.2446 4.01884C10.4389 4.0222 10.6244 4.10076 10.762 4.238C10.8992 4.3756 10.9778 4.56105 10.9812 4.75537C10.9845 4.94969 10.9124 5.13774 10.78 5.28Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                onClick={() => setChecked(true)}
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className=" min-h-[14px] min-w-[14px] mr-3 mt-1.5"
              >
                <path
                  d="M1.75 0H12.25C13.216 0 14 0.784 14 1.75V12.25C14 12.7141 13.8156 13.1592 13.4874 13.4874C13.1592 13.8156 12.7141 14 12.25 14H1.75C1.28587 14 0.840752 13.8156 0.512563 13.4874C0.184374 13.1592 0 12.7141 0 12.25V1.75C0 0.784 0.784 0 1.75 0ZM1.5 1.75V12.25C1.5 12.388 1.612 12.5 1.75 12.5H12.25C12.3163 12.5 12.3799 12.4737 12.4268 12.4268C12.4737 12.3799 12.5 12.3163 12.5 12.25V1.75C12.5 1.6837 12.4737 1.62011 12.4268 1.57322C12.3799 1.52634 12.3163 1.5 12.25 1.5H1.75C1.6837 1.5 1.62011 1.52634 1.57322 1.57322C1.52634 1.62011 1.5 1.6837 1.5 1.75Z"
                  fill="white"
                />
              </svg>
            )}
            <span className=" text-xs text-white">
              Нажимая кнопку, вы подтверждаете, что ознакомились и соглашаетесь
              с{" "}
              <Link className=" underline " href={"/"}>
                Условиями Соглашения!
              </Link>{" "}
              Правилами и политикой конфиденциальности компании
            </span>
          </Row>
          <Form.Item className="m-0">
            <Button className=" btn-orange w-full h-full" htmlType="submit">
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export { AuthForm };
