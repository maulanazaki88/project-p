"use client";
import s from "./InvitationSignUpPage.module.css";
import React, { FormEventHandler } from "react";
import InputSmall from "@/components/input-small/InputSmall";
import ButtonLarge from "@/components/button-large/ButtonLarge";
import { UserType } from "@/type";
import { createUser } from "@/server/actions";
import { useRouter } from "next/navigation";
import { useDateNow } from "@/hook/useDateNow";
import { useIdGenerator } from "@/hook/useIdGenerator";

const InvitationSignUpPage: React.FC = () => {
  const router = useRouter();
  const id_generator = useIdGenerator();
  const date_now = useDateNow();

  const currentDate = new Date();

  const [user_data, set_user_data] = React.useState<{email: string, username: string, password: string}>({
   email: "",
   username: "",
   password: ""
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

  const [verifyId, setVerifyId] = React.useState<string | null>();
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);

  const submitData: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("Submit!!!");
    setButtonDisabled(true);
    const date_time = date_now.withTime();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup-via-invitation/`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      }, 
      body: JSON.stringify(user_data)
    })

    if(response.ok){
      router.push(response.url)
    } else {
      alert(await response.json())
    }
  
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_user_data((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  React.useEffect(() => {
    if (verifyId) {
      router.push(`/invitation/user/${verifyId}`);
    }
  }, [verifyId]);

  return (
    <main className={s.main}>
      <div className={s.heading}>
        <h1 className={[s.title, "medium", "big"].join(" ")}>
          Daftarkan Akun Anda
        </h1>
      </div>
      <form className={s.form} onSubmit={submitData}>
        <InputSmall
          icon={"/icons/person_black.svg"}
          onChange={changeHandler}
          name="username"
          placeholder="Masukan Nama Pengguna"
          key={"username-input"}
          value={user_data.username}
          label="Nama Pengguna"
          type="text"
          warning={warning.username}
        />
        <InputSmall
          icon={"/icons/email_black.svg"}
          onChange={changeHandler}
          name="email"
          placeholder="Masukan Email Anda"
          key={"email-input"}
          value={user_data.email}
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
          value={user_data.password}
          label="Password"
          type="password"
          warning={warning.password}
        />
        <ButtonLarge
          bg_color="#080726"
          color="#fff"
          text="Selanjutnya"
          icon="/icons/next_white.svg"
          onClick={() => {}}
          disabled={buttonDisabled}
        />
      </form>
    </main>
  );
};

export default InvitationSignUpPage;
