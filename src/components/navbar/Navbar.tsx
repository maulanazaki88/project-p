import s from "./Navbar.module.css";
import React from "react";
import RoundButton from "../round-button/RoundButton";
import { useRouter } from "next/navigation";

interface NavbarProps {
  title: string;
  subtitle?: string;
  menuHandler: () => void;
  backSave?: () => void;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <header className={s.navbar}>
      <div className={s.left}>
        <RoundButton
          color="rgba(0, 0, 0, 0.08)"
          icon="/icons/next_dongker.svg"
          rotate={180}
          opacity={1}
          icon_scale={0.9}
          onClick={props.backSave ? props.backSave : goBack}
        />
      </div>
      <div className={s.heading}>
        <h2 className={[s.title, "medium", "big"].join(" ")}>{props.title}</h2>
        {props.subtitle && (
          <h3 className={[s.subtitle, "reguler", "sm"].join(" ")}>
            {props.subtitle}
          </h3>
        )}
      </div>
      <div className={s.right}>
        <RoundButton
          color="rgba(0, 0, 0, 0.08)"
          icon="/icons/dot-menu.svg"
          opacity={1}
          onClick={props.menuHandler}
        />
      </div>
    </header>
  );
};

export default Navbar;
