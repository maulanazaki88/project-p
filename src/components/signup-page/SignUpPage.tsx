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

interface SignUpProps {
  loginLink: string;
}

const SignUpPage: React.FC<SignUpProps> = (props) => {
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
    } else if (user_data.username.length < 4) {
      setWarning((prev) => {
        return {
          ...prev,
          username: "Username at least consist 4 characters!",
        };
      });
    } else if (user_data.password.length < 8) {
      setWarning((prev) => {
        return {
          ...prev,
          password: "Password must consist 8 characters!",
        };
      });
    } else {
      console.log("Submit!!!");
      setIsLoading(true);
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
        setIsLoading(false);
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
          isLoading={isLoading}
        />
      </form>
      <div className={s.suggestion}>
        <p className={[s.suggestion_txt, "sm", "soft"].join(" ")}>
          Sudah memiliki akun?
        </p>
        <span className={[s.suggestion_btn, "sm", "medium"].join(" ")}>
          <Link href={props.loginLink}>Masuk</Link>
        </span>
      </div>
    </main>
  );
};

export default SignUpPage;
