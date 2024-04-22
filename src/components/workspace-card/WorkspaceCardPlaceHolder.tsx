import s from "./WorkspaceCard.module.css";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Context, { ContextType } from "@/context/Store";

const WorkspaceCardPlaceHolder: React.FC = () => {
  const { theme_ctx } = React.useContext(Context) as ContextType;
  const is_dark = theme_ctx === "dark";
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/workspace-setup`}>
      <div className={[s.card, s.placeholder, is_dark && s.dark].join(" ")}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", top: "5%", left: "5%" }}
          className={s.icon}
        >
          <path
            d="M6.99475 0.391602V6.99475H0.391602V11.3969H6.99475V18H11.3969V11.3969H18V6.99475H11.3969V0.391602H6.99475Z"
            fill={!is_dark ? "#1c062d" : "#535C91"}
          />
        </svg>
        <p className={[s.txt, "md", "medium"].join(" ")}>New Space</p>
      </div>
    </Link>
  );
};

export default WorkspaceCardPlaceHolder;
