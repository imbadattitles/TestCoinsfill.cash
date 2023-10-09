import React from "react";
interface MyButton {
  onClick?: () => void;
  onFile?: (e: any) => void;
  style: "btn-orange" | "btn-blue" | string;
  text: string;
  icon?: any;
  type?: "button" | "inputFile";
}
const MyButton: React.FC<MyButton> = ({
  onClick,
  onFile,
  style,
  text,
  icon,
  type,
}) => {
  if (type === "inputFile")
    return (
      <label className=" relative">
        <input
          className=" absolute -z-10 h-0 w-0 block"
          type="file"
          onChange={onFile}
        />

        <span className={style}>
          {icon} {text}
        </span>
      </label>
    );
  return (
    <button onClick={onClick} className={style}>
      {icon} {text}
    </button>
  );
};
export { MyButton };
