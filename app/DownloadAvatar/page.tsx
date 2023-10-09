"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { getCropped } from "../components/getCropped";
import { MyButton } from "../components/MyButton";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { infoUpdate } from "../API/api";

export default function DownLoadAvatar() {
  const [download, setDownload] = React.useState<boolean>(false);
  const auth = useAppSelector((s) => s.user.user.auth);
  const [base64, setBase64] = useState<string | ArrayBuffer | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const imgRef = useRef<any>(null);

  const fileClick = async (e: any) => {
    let file = e.target.files[0];
    if (file.size > 5000000) return alert("5мб максимум!!!");
    const types = ["jpg", "png", "gif"];
    const index = types.indexOf(file.name.split(".").pop().toLowerCase());
    if (index === -1) {
      return alert("Неверный тип файла!!!");
    }

    setSrc(URL.createObjectURL(file));
    let reader = new FileReader();
    const base64 = reader.readAsDataURL(file);
    reader.onloadend = function () {
      setBase64(reader.result);
      setDownload(true);
    };
  };

  const saveBtn = async () => {
    if (completedCrop) {
      await getCropped(imgRef.current, completedCrop, "name", setBase64);
    }
    let token: string | null = localStorage.getItem("token-tt");
    if (token === null) {
      token = "null";
    }
    let response = await fetch(
      "https://test-task.test211.workers.dev/account/image",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "token-tt": token,
        },
        body: JSON.stringify({
          image: base64,
        }),
      }
    ).then((result) => result.json());
    if (response.errors) return alert(JSON.stringify(response));
    infoUpdate(dispatch);
  };

  const [src, setSrc] = useState<any>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<any>();

  if (!auth) return router.push("./");

  return (
    <main style={{ flex: "1 0 auto" }} className=" mx-8 mt-8">
      <span className=" text-[10px] md:text-sm text-grey opacity-50 font-medium">
        <Link className=" underline" href="/">
          Главная
        </Link>{" "}
        / <Link href="/">Настройки аккаунта</Link> /{" "}
        <Link href="/">Загрузка аватара</Link>
      </span>
      <h2 className=" text-[26px] mb-10 font-bold">
        {!download ? "Загрузка аватара" : "Фото для аватара"}
      </h2>
      {!download ? (
        <>
          <p className=" text-sm max-w-[250px] mb-10">
            Загрузите файл размером до 5Мб По формату: JPG, PNG, GIF
          </p>
          <MyButton
            type="inputFile"
            style="btn-blue flex justify-center gap-3 w-full md:w-[300px]"
            text="Выбрать файл"
            onFile={(e: any) => fileClick(e)}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="18"
                viewBox="0 0 15 18"
                fill="none"
              >
                <path
                  d="M12.4179 6.35294H10.7143V1.05882C10.7143 0.476471 10.2321 0 9.64286 0H5.35714C4.76786 0 4.28571 0.476471 4.28571 1.05882V6.35294H2.58214C1.62857 6.35294 1.14643 7.49647 1.82143 8.16353L6.73929 13.0235C7.15714 13.4365 7.83214 13.4365 8.25 13.0235L13.1679 8.16353C13.8429 7.49647 13.3714 6.35294 12.4179 6.35294ZM0 16.9412C0 17.5235 0.482143 18 1.07143 18H13.9286C14.5179 18 15 17.5235 15 16.9412C15 16.3588 14.5179 15.8824 13.9286 15.8824H1.07143C0.482143 15.8824 0 16.3588 0 16.9412Z"
                  fill="white"
                />
              </svg>
            }
          />
        </>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {src && (
              <>
                <ReactCrop
                  onComplete={(c) => setCompletedCrop(c)}
                  crop={crop}
                  aspect={1 / 1}
                  onChange={(c) => setCrop(c)}
                >
                  <img ref={imgRef} src={src} />
                </ReactCrop>
              </>
            )}
            <MyButton
              style="btn-blue w-full md:w-[300px] btn-shadow"
              onClick={() => saveBtn()}
              text="Сохранить"
            />
            <MyButton
              style="btn-white w-full md:w-[300px] btn-shadow"
              onClick={() => ""}
              text="Отменить"
            />
          </div>
        </>
      )}
    </main>
  );
}
