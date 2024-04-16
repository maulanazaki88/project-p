"use client";
import s from "./SignUpPage.module.css";
import React, { FormEventHandler } from "react";
import InputSmall from "@/components/input-small/InputSmall";
import ButtonLarge from "@/components/button-large/ButtonLarge";
import { UserType } from "@/type";
import { useRouter } from "next/navigation";
import { useDateNow } from "@/hook/useDateNow";
import { useIdGenerator } from "@/hook/useIdGenerator";
import Link from "next/link";
import Context, { ContextType } from "@/context/Store";

interface SignUpProps {
  loginLink: string;
  signupAPI: string;
  w_id?: string;
}

const SignUpPage: React.FC<SignUpProps> = (props) => {
  const router = useRouter();
  const id_generator = useIdGenerator();
  const { theme_ctx } = React.useContext(Context) as ContextType;

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

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const submitData: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const email_re = /^[a-zA-Z0-9]+@[a-z]+\.[a-zA-Z]+/g;

    if (!email_re.test(user_data.email)) {
      setWarning((prev) => {
        return {
          ...prev,
          email: "Please input a valid email!",
        };
      });
      setTimeout(() => {
        setWarning({
          email: "-",
          password: "-",
          username: "-",
        });
      }, 5000);
    } else if (user_data.username.length < 4) {
      setWarning((prev) => {
        return {
          ...prev,
          username: "Username at least consist 4 characters!",
        };
      });
      setTimeout(() => {
        setWarning({
          email: "-",
          password: "-",
          username: "-",
        });
      }, 5000);
    } else if (user_data.password.length < 8) {
      setWarning((prev) => {
        return {
          ...prev,
          password: "Password must consist 8 characters!",
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
      console.log("Submit!!!");
      setIsLoading(true);
      const date_time = new Date();

      const response = await fetch(props.signupAPI, {
        body: JSON.stringify({
          ...user_data,
          created_at: date_time,
          updated_at: date_time,
          u_id: id_generator.user(),
          w_id: props.w_id,
        }),
        method: "POST",
      });

      if (response.ok && !response.redirected) {
        console.log(await response.json());
        // setVerifyId(await res.u_id);
      } else if (response.status === 409) {
        console.log(await response.json());
        setIsLoading(false);

        set_user_data((prev) => {
          return {
            ...prev,
            password: "",
          };
        });
        // setButtonDisabled(false);
        setWarning((prev) => {
          return {
            ...prev,
            username: "Conflict. This email is already used",
          };
        });
      } else if (!response.ok) {
        console.log(await response.json());
        setIsLoading(false);
        set_user_data((prev) => {
          return {
            ...prev,
            password: "",
          };
        });
        // setButtonDisabled(false);
        setWarning((prev) => {
          return {
            ...prev,
            username: "Error, please check internet connection",
          };
        });
      } else {
        // setIsLoading(false);
        router.replace(response.url);
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

  return (
    <main
      className={[s.main, theme_ctx === "light" ? s.light : s.dark].join(" ")}
    >
      <div className={s.heading}>
        <h1 className={[s.title, "medium", "md"].join(" ")}>Signup</h1>
      </div>
      <form className={s.form} onSubmit={submitData}>
        <InputSmall
          icon={
            theme_ctx === "light"
              ? "/icons/person_black.svg"
              : "/icons/person_white.svg"
          }
          onChange={changeHandler}
          name="username"
          placeholder="Enter Username"
          key={"username-input"}
          value={user_data.username}
          label="Nama Pengguna"
          type="text"
          warning={warning.username}
          maxChar={18}
          required
        />
        <InputSmall
          icon={
            theme_ctx === "light"
              ? "/icons/email_black.svg"
              : "/icons/email_white.svg"
          }
          onChange={changeHandler}
          name="email"
          placeholder="Enter Email"
          key={"email-input"}
          value={user_data.email}
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
          placeholder="Enter Password"
          key={"password-input"}
          value={user_data.password}
          label="Password"
          type="password"
          warning={warning.password}
          hideCap
          required
        />
        <ButtonLarge
          bg_color={theme_ctx === "light" ? "#1c062d" : "#535C91"}
          color="#fff"
          text="Signup"
          icon="/icons/next_white.svg"
          onClick={() => {}}
          isLoading={isLoading}
        />
      </form>
      <div className={s.suggestion}>
        <p className={[s.suggestion_txt, "sm", "soft"].join(" ")}>
          Already have an account?
        </p>
        <span className={[s.suggestion_btn, "sm", "medium", theme_ctx === 'dark' ? s.dark : null].join(" ")}>
          <Link href={props.loginLink}>Login</Link>
        </span>
      </div>
    </main>
  );
};

export default SignUpPage;
