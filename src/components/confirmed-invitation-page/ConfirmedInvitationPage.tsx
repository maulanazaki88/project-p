"use client";
import { UserType } from "@/type";
import s from "./ConfirmedInvitationPage.module.css";
import React from "react";
import ButtonLarge from "../button-large/ButtonLarge";
import { useRouter } from "next/navigation";

const ConfirmedInvitationPage: React.FC<{ data: UserType }> = (props) => {
  const router = useRouter();

  const goHome = () => {
    router.push(`/home/${props.data.u_id}`);
  };

  return (
    <main className={s.main}>
      <section className={s.header}>
        <h2 className={s.title}>
          Hai! {props.data.created_at} <br /> Undangan untuk bergabung ke
          workspace sudah terverifikasi!
        </h2>
        <p className={s.subtitle}>
          Sedang menunggu konfirmasi dari pemilik workspace...
        </p>
      </section>
      <section className={s.info}>
        <p className={s.info_txt}>
          Anda akan tergabung kedalam workspace secara otomatis setelah pemilik
          workspace mangkonfirmasi permintaan bergabung Anda!
        </p>
        <ButtonLarge
          bg_color="#080726"
          color="#fff"
          text="Home"
          icon="/icons/home_white.svg"
          rowReverse
          onClick={goHome}
          icon_scale={1}
        />
      </section>
    </main>
  );
};

export default ConfirmedInvitationPage;
