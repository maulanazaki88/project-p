"use client";
import { UserType } from "@/type";
import s from "./ConfirmedInvitationPage.module.css";
import React from "react";
import ButtonLarge from "../button-large/ButtonLarge";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Context, { ContextType } from "@/context/Store";
// import { usePathname } from "next/navigation";

const ConfirmedInvitationPage: React.FC<{ data: UserType }> = (props) => {
  const router = useRouter();
  // const pathname = usePathname();

  // const w_id = pathname.split("/")[2];

  const { theme_ctx } = React.useContext(Context) as ContextType;

  const is_dark = "dark";

  const goHome = () => {
    router.push(`/home/${props.data.u_id}`);
  };

  // React.useEffect(() => {
  //   user_verify_add_worskpace_ctx(props.data.u_id, props.data.username, w_id);
  // }, []);

  return (
    <main className={[s.main, s.dark].join(" ")}>
      <section className={s.header}>
        <h2 className={[s.title, "medium", "md"].join(" ")}>
          Hi{" "}
          <span style={{ textDecoration: "underline" }}>
            {props.data.username}
          </span>
          ! <br /> Invitation to join workspace already sent!
        </h2>
        <p className={[s.subtitle, "medium", "sm"].join(" ")}>
          Waiting for the workspace owner to confirm your join request...
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
          You will be join the workspace immediately after the owner of
          workspace accept your request!
        </p>
        <ButtonLarge
          bg_color={is_dark ? "#535c91" : "#080726"}
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
