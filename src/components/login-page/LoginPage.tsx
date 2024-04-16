"use client";
import s from "./LoginPage.module.css";
import React from "react";
import { UserType } from "@/type";
import InputSmall from "@/components/input-small/InputSmall";
import ButtonLarge from "@/components/button-large/ButtonLarge";
import { useRouter } from "next/navigation";
import { useVerifyEmail } from "@/hook/useVerifyEmail";
import Link from "next/link";
import Context, { ContextType } from "@/context/Store";

interface LoginPageProps {
  signupLink: string;
  loginAPI: string;
  w_id?: string;
}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const { theme_ctx } = React.useContext(Context) as ContextType;

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
      const response = await fetch(props.loginAPI, {
        method: "POST",
        body: JSON.stringify({ ...data, w_id: props.w_id }),
      });

      if (response.ok && !response.redirected) {
        console.log(await response.json());
        // setVerifyId(await res.u_id);
      } else if (!response.ok && response.status === 401) {
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
            email: "Incorrect password or email!",
          };
        });
        setTimeout(() => {
          setWarning({
            email: "-",
            password: "-",
            username: "-",
          });
        }, 5000);
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
        setTimeout(() => {
          setWarning({
            email: "-",
            password: "-",
            username: "-",
          });
        }, 5000);
      } else {
        // setIsLoading(false);
        console.log(response);
        router.replace(response.url);
      }
    }
  };

  return (
    <main
      className={[s.main, theme_ctx === "light" ? s.light : s.dark].join(" ")}
    >
      <div className={s.heading}>
        <h1 className={[s.title, "medium", "big"].join(" ")}>Login</h1>
      </div>
      <form className={s.form} onSubmit={submitHandler}>
        <InputSmall
          icon={
            theme_ctx === "light"
              ? "/icons/email_black.svg"
              : "/icons/email_white.svg"
          }
          onChange={changeHandler}
          name="email"
          placeholder="Enter your Email"
          key={"username-input"}
          value={data.email}
          label="Email"
          type="text"
          warning={warning.email}
          hideCap
          required
        />
        <InputSmall
          icon={
            theme_ctx === "light"
              ? "/icons/lock_black.svg"
              : "/icons/lock_white.svg"
          }
          onChange={changeHandler}
          name="password"
          placeholder="Enter password"
          key={"password-input"}
          value={data.password}
          label="Password"
          type="password"
          warning={warning.password}
          hideCap
          required
        />
        <ButtonLarge
          bg_color={theme_ctx === "light" ? "#1c062d" : "#535C91"}
          color="#fff"
          text="Login"
          icon="/icons/next_white.svg"
          isLoading={isLoading}
        />
      </form>
      <div className={s.suggestion}>
        <p className={[s.suggestion_txt, "sm", "soft"].join(" ")}>
          Not have an account yet?
        </p>
        <span
          className={[
            s.suggestion_btn,
            "sm",
            "medium",
            theme_ctx === "dark" ? s.dark : null,
          ].join(" ")}
        >
          <Link href={props.signupLink}>Sign for free!</Link>
        </span>
      </div>
    </main>
  );
};

export default LoginPage;
