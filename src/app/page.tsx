"use client";
import s from "./page.module.css";
import React from "react";
import Image from "next/image";
import ButtonLarge from "@/components/button-large/ButtonLarge";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Context, { ContextType } from "@/context/Store";
import local from "next/font/local";

const poppins = local({
  src: "../components/fonts/POPPINS-SEMIBOLD.ttf",
});


export default function Home() {
  const router = useRouter();

  const { theme_ctx } = React.useContext(Context) as ContextType;

  const is_dark = theme_ctx === "dark";

  return (
    <main className={[s.main, !is_dark ? s.light : s.dark].join(" ")}>
      <figure className={[s.figure, is_dark && s.dark].join(" ")}>
        <Image
          className={s.ilust}
          width={430}
          height={262}
          src={"/ilustration/landing_2.svg"}
          alt="ilustration"
        />
      </figure>
      <div className={s.content}>
        <div className={s.brand}>
          <Image
            src={"/icons/sewu.svg"}
            alt="sewu-logo"
            width={50}
            height={50}
            className={s.brand_icon}
          />
          <p className={[s.brand_txt].join(" ")}>Sewu Project</p>
        </div>
        <div className={s.heading}>
          <h1
            className={[s.title, "x-big", "medium", poppins.className].join(
              " "
            )}
          >
            Swiftly Manage Your Projects
          </h1>
          <h2 className={[s.subtitle, "regular", "sm", "soft"].join(" ")}>
            Simple Project Management Tools:
            <br /> Quick & Easy
          </h2>
        </div>
        <Link href="/signup">
          <ButtonLarge
            bg_color={!is_dark ? "#080726" : "#535C91"}
            color="#fff"
            text="Start Free!"
            onClick={() => {}}
          />
        </Link>
        <div className={s.suggestion}>
          <p className={[s.suggestion_txt, "sm", "soft"].join(" ")}>
            Already have an account?
          </p>
          <span
            className={[
              s.suggestion_btn,
              "sm",
              "medium",
              is_dark && s.dark,
            ].join(" ")}
          >
            <Link href="/login">Login</Link>
          </span>
        </div>
      </div>
    </main>
  );
}
