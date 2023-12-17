"use client";
import s from "./SignInPage.module.css";
import React from "react";
import { UserType } from "@/type";
import InputSmall from "@/components/input-small/InputSmall";
import ButtonLarge from "@/components/button-large/ButtonLarge";
import { useRouter } from "next/navigation";

const SignInPage: React.FC = () => {

  const router = useRouter();

  const [data, setData] = React.useState<UserType>({
    created_at: "",
    email: "",
    is_online: 0,
    password: "",
    u_id: "",
    updated_at: "",
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

    const response = await fetch("/api/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    console.log(await json)

    if (await json) {
      if (json.message === "success") {
        setVerifyId(json.u_id);
      }
    }
  };

  React.useEffect(() => {
    if(verifyId){
      router.push(`/home/${verifyId}`)
    }
  }, [verifyId])

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

export default SignInPage;
