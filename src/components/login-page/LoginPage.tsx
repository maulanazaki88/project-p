"use client";
import s from "./LoginPage.module.css";
import React from "react";
import { UserType } from "@/type";
import InputSmall from "@/components/input-small/InputSmall";
import ButtonLarge from "@/components/button-large/ButtonLarge";
import { useRouter } from "next/navigation";
import { useVerifyEmail } from "@/hook/useVerifyEmail";
import Link from "next/link";

interface LoginPageProps {
  signupLink: string;
}

const LoginPage: React.FC<LoginPageProps> = (props) => {
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
    username: string;
  }>({
    email: "-",
    password: "-",
    username: "-",
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!verifyEmail.verifyEmail(data.email)) {
      setWarning((prev) => {
        return {
          ...prev,
          email: "Please input a valid email!",
        };
      });
    } else {
      const response = await fetch(`/api/sign-in`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok && !response.redirected) {
        console.log(await response.json());
        // setVerifyId(await res.u_id);
      } else if (response && response.status === 401) {
        // console.log("nooo");
        console.log(await response.json());
        // setButtonDisabled(false);
        setIsLoading(false);
        setData((data) => {
          return {
            ...data,
            password: "",
          };
        });
        setWarning((prev) => {
          return {
            ...prev,
            username: "Incorrect password or email!",
          };
        });
      } else if (!response.ok) {
        console.log(await response.json());
        // setButtonDisabled(false);
        setIsLoading(false);
        setData((data) => {
          return {
            ...data,
            password: "",
          };
        });
        setWarning((prev) => {
          return {
            ...prev,
            username: "Error, please check internet connection",
          };
        });
      } else {
        setIsLoading(false);
        console.log(response);
        router.replace(response.url);
      }
    }
  };

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
          required
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
          required
        />
        <ButtonLarge
          bg_color="#080726"
          color="#fff"
          text="Masuk"
          icon="/icons/next_white.svg"
          isLoading={isLoading}
        />
      </form>
      <div className={s.suggestion}>
        <p className={[s.suggestion_txt, "sm", "soft"].join(" ")}>
          Belum memiliki akun?
        </p>
        <span className={[s.suggestion_btn, "sm", "medium"].join(" ")}>
          <Link href={props.signupLink}>Daftar gratis!</Link>
        </span>
      </div>
    </main>
  );
};

export default LoginPage;
