"use client";
import s from "./SignInPage.module.css";
import React from "react";
import { UserType } from "@/type";
import InputSmall from "@/components/input-small/InputSmall";
import ButtonLarge from "@/components/button-large/ButtonLarge";
import { useRouter } from "next/navigation";
import { useVerifyEmail } from "@/hook/useVerifyEmail";
import Link from "next/link";

const SignInPage: React.FC = () => {
  const verifyEmail = useVerifyEmail();
  const router = useRouter();

  const [data, setData] = React.useState<UserType>({
    created_at: new Date(),
    email: "",
    is_online: 0,
    password: "",
    u_id: "",
    updated_at: new Date(),
    username: "",
    workspace_ids: [],
    workspace_list: [],
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
    if (verifyEmail.verifyEmail(data.email)) {
      const response = await fetch(`/api/sign-in`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok && !response.redirected) {
        console.log(await response.json());
        // setVerifyId(await res.u_id);
      } else if (!response.ok) {
        console.log("nooo");
        console.log(await response.json());
        // setButtonDisabled(false);
        setWarning((prev) => {
          return {
            ...prev,
            username: "Gagal. Terjadi kesalahan pada jaringan",
          };
        });
      } else {
        console.log(response)
        router.replace(response.url);
      }
    } else {
      setWarning((prev) => {
        return {
          ...prev,
          email: "Email invalid!",
        };
      });
    }
  };

  React.useEffect(() => {
    if (verifyId) {
      router.push(`/home/${verifyId}`);
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
      <div className={s.suggestion}>
        <p className={[s.suggestion_txt, "sm", "soft"].join(" ")}>
          Belum memiliki akun?
        </p>
        <span className={[s.suggestion_btn, "sm", "medium"].join(" ")}>
          <Link href="/login">Daftar gratis!</Link>
        </span>
      </div>
    </main>
  );
};

export default SignInPage;