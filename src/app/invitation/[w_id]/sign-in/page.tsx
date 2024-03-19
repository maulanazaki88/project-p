"use client";
import s from "./InvitationSignInPage.module.css";
import React from "react";
import { UserType } from "@/type";
import InputSmall from "@/components/input-small/InputSmall";
import ButtonLarge from "@/components/button-large/ButtonLarge";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const InvitationSignInPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentDate = new Date();

  const w_id = pathname.split("/")[2];

  const [data, setData] = React.useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [warning, setWarning] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "-",
    password: "-",
  });

  const [verifyId, setVerifyId] = React.useState<string | null>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/login-via-invitation`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({...data, w_id: w_id}),
      }
    );

    if (res.ok) {
      router.push(res.url);
    } else {
      const json = await res.json()
      alert(json.message);
    }
  };

  React.useEffect(() => {
    if (verifyId) {
      router.push(`/invitation/${w_id}/user/${verifyId}`);
    }
  }, [verifyId]);

  return (
    <main className={s.main}>
      <div className={s.heading}>
        <h1 className={[s.title, "medium", "big"].join(" ")}>Masuk</h1>
      </div>
      <form className={s.form} onSubmit={submitHandler}>
        <InputSmall
          icon={"/icons/email_black.svg"}
          onChange={changeHandler}
          name="email"
          placeholder="Masukan Email Anda"
          key={"username-input"}
          value={data.email}
          label="Email"
          type="text"
          warning={warning.email}
          hideCap
        />
        <InputSmall
          icon={"/icons/lock_black.svg"}
          onChange={changeHandler}
          name="password"
          placeholder="Masukan Password Anda"
          key={"password-input"}
          value={data.password}
          label="Password"
          type="password"
          warning={warning.password}
          hideCap
        />
        <ButtonLarge
          bg_color="#080726"
          color="#fff"
          text="Masuk"
          icon="/icons/next_white.svg"
        />
      </form>
    </main>
  );
};

export default InvitationSignInPage;
