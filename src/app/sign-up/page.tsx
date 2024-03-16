"use client";
import s from "./SignUpPage.module.css";
import React, { FormEventHandler } from "react";
import InputSmall from "@/components/input-small/InputSmall";
import ButtonLarge from "@/components/button-large/ButtonLarge";
import { UserType } from "@/type";
import { createUser } from "@/server/actions";
import { useRouter } from "next/navigation";
import { useDateNow } from "@/hook/useDateNow";
import { useIdGenerator } from "@/hook/useIdGenerator";
import Link from "next/link";

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const id_generator = useIdGenerator();
  const date_now = useDateNow();

  const [user_data, set_user_data] = React.useState<UserType>({
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
    const email_re = /^[a-zA-Z0-9]+@[a-z]+\.[a-zA-Z]+/g;

    if (!email_re.test(user_data.email)) {
      setWarning((prev) => {
        return {
          ...prev,
          email: "Tolong masukkan email yang valid",
        };
      });
    } else if (user_data.password.length < 8) {
      setWarning((prev) => {
        return {
          ...prev,
          password: "Password minimal terdiri dari 8 karakter.",
        };
      });
    } else {
      console.log("Submit!!!");
      setButtonDisabled(true);
      const date_time = new Date();

      const response = await fetch(`/api/create-user`, {
        body: JSON.stringify({
          ...user_data,
          created_at: date_time,
          updated_at: date_time,
          u_id: id_generator.user(),
        } as UserType),
        method: "POST",
      });

      if (response.ok && !response.redirected) {
        console.log( await response.json());
        // setVerifyId(await res.u_id);
      } else if(!response.ok) {
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
        router.replace(response.url)
      }
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
      router.replace(`/home/${verifyId}`);
    }
  }, [verifyId]);

  return (
    <main className={s.main}>
      <div className={s.heading}>
        <h1 className={[s.title, "medium", "md"].join(" ")}>
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
          maxChar={18}
          required
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
          hideCap
          required
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
          hideCap
          required
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
      <div className={s.suggestion}>
        <p className={[s.suggestion_txt, "sm", "soft"].join(" ")}>
          Sudah memiliki akun?
        </p>
        <span className={[s.suggestion_btn, "sm", "medium"].join(" ")}>
          <Link href="/login">Masuk</Link>
        </span>
      </div>
    </main>
  );
};

export default SignUpPage;
