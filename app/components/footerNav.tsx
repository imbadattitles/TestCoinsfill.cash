interface IfooterNav {
  color: "dblue" | "grey";
  text: string;
  svg: {
    width: string;
    height: string;
    path: string;
  };
}

export default function FooterNav(props: IfooterNav) {
  let color = props.color === "dblue" ? "dblue" : "grey opacity-50";
  return (
    <div className="flex flex-col items-center ">
      <div className=" flex items-center justify-center w-7 h-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`fill-${color} object-contain`}
          width={props.svg.width}
          height={props.svg.height}
        >
          <path d={props.svg.path} />
        </svg>
      </div>
      <p className={` text-${color} inline`}>{props.text}</p>
    </div>
  );
}
