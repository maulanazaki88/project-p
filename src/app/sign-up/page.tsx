"use client";
import s from "./SignUpPage.module.css";
import React from "react";
import InputSmall from "@/components/input-small/InputSmall";
import ButtonLarge from "@/components/button-large/ButtonLarge";
import { UserType } from "@/type";

const SignUpPage: React.FC = () => {
  const [data, setData] = React.useState<UserType>({
    created_at: "",
    email: "",
    is_online: 0,
    password: "",
    u_id: "",
    username: "",
    workspace_list: [],
  });

  const [warning, setWarning] = React.useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: "-",
    email: "-",
    password: "-",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <main className={s.main}>
      <div className={s.heading}>
        <h1 className={[s.title, "medium", "big"].join(" ")}>
          Daftarkan Akun Anda
        </h1>
      </div>
      <form className={s.form}>
        <InputSmall
          icon={"/icons/person_black.svg"}
          onChange={changeHandler}
          name="username"
          placeholder="Masukan Nama Pengguna"
          key={"username-input"}
          value={data.username}
          label="Nama Pengguna"
          type="text"
          warning={warning.username}
        />
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
        />
        <InputSmall
          icon={"/icons/lock_black.svg"}
          onChange={changeHandler}
          name="password"
          placeholder="Masukan Password Anda"
          key={"username-input"}
          value={data.password}
          label="Password"
          type="password"
          warning={warning.password}
        />
        <ButtonLarge
          bg_color="#080726"
          color="#fff"
          text="Selanjutnya"
          icon="/icons/next_white.svg"
        />
      </form>
    </main>
  );
};

export default SignUpPage;
