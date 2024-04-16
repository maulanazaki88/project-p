"use client";
import s from "./page.module.css";
import React from "react";
import Image from "next/image";
import ButtonLarge from "@/components/button-large/ButtonLarge";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Context, { ContextType } from "@/context/Store";

const inter = localFont({
  src: "../components/fonts/Inter-VariableFont_slnt,wght.ttf",
});

const poppins = Poppins({
  display: "swap",
  subsets: ["latin"],
  weight: "600",
});

export default function Home() {
  const router = useRouter();

  const { theme_ctx } = React.useContext(Context) as ContextType;

  const toSignUp = () => {
    router.push("/sign-up");
    console.log("huhu");
  };

  return (
    <main
      className={[s.main, theme_ctx === "light" ? s.light : s.dark].join(" ")}
    >
      <figure className={s.figure}>
        <Image
          className={s.ilust}
          width={430}
          height={262}
          src={"/ilustration/landing_2.svg"}
          alt="ilustration"
        />
      </figure>
      <div className={s.content}>
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
            bg_color={theme_ctx === "light" ? "#080726" : "#535C91"}
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
              theme_ctx === "dark" ? s.dark : null,
            ].join(" ")}
          >
            <Link href="/login">Login</Link>
          </span>
        </div>
      </div>
    </main>
  );
}
