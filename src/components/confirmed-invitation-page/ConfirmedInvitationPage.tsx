"use client";
import { UserType } from "@/type";
import s from "./ConfirmedInvitationPage.module.css";
import React from "react";
import ButtonLarge from "../button-large/ButtonLarge";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import Context, { ContextType } from "@/context/Store";
// import { usePathname } from "next/navigation";

const ConfirmedInvitationPage: React.FC<{ data: UserType }> = (props) => {
  const router = useRouter();
  // const pathname = usePathname();

  // const w_id = pathname.split("/")[2];

  // const { user_verify_add_worskpace_ctx } = React.useContext(
  //   Context
  // ) as ContextType;

  const goHome = () => {
    router.push(`/home/${props.data.u_id}`);
  };

  // React.useEffect(() => {
  //   user_verify_add_worskpace_ctx(props.data.u_id, props.data.username, w_id);
  // }, []);

  return (
    <main className={s.main}>
      <section className={s.header}>
        <h2 className={[s.title, "medium", "md"].join(" ")}>
          Hai{" "}
          <span style={{ textDecoration: "underline" }}>
            {props.data.username}
          </span>
          ! <br /> Undangan untuk bergabung ke workspace sudah terverifikasi!
        </h2>
        <p className={[s.subtitle, "medium", "sm"].join(" ")}>
          Sedang menunggu konfirmasi dari pemilik workspace...
        </p>
      </section>
      <figure className={s.figure}>
        <Image
          src={"/ilustration/confirmation-letter.svg"}
          alt="confirmation letter setelah permintaan terverifikasi"
          width={378}
          height={302}
          className={s.ilust}
        />
      </figure>
      <section className={s.info}>
        <p className={[s.info_txt, "medium", "sm", "soft"].join(" ")}>
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
