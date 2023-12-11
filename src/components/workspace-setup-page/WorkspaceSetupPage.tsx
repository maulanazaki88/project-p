"use client";
import s from "./WorkspaceSetupPage.module.css";
import React, { FormEventHandler } from "react";
import InputSmall from "../input-small/InputSmall";
import InputLarge from "../input-large/InputLarge";
import MenuNavbar from "../menu-navbar/MenuNavbar";
import { WorkspaceType } from "@/type";
import Context from "@/context/Store";
import ButtonLarge from "../button-large/ButtonLarge";
import { useRouter } from "next/navigation";

interface WorkspaceSetupPageProps {
  data?: WorkspaceType;
}

const WorkspaceSetupPage: React.FC<WorkspaceSetupPageProps> = (props) => {
  const router = useRouter();

  const ctx = React.useContext(Context);

  const user_data = ctx?.user_data_ctx;

  const [workspace_data, set_workspace_data] = React.useState<WorkspaceType>({
    activity_list: props.data ? props.data.activity_list : [],
    admin_list: props.data
      ? props.data.admin_list
      : user_data
      ? [user_data.username]
      : [],
    created_at: props.data ? props.data.created_at : "",
    description: props.data ? props.data.description : "",
    member_list: props.data
      ? props.data.member_list
      : user_data
      ? [{ u_id: user_data.u_id, username: user_data.username }]
      : [],
    name: props.data ? props.data.name : "",
    notification_list: props.data ? props.data.notification_list : [],
    status: props.data ? props.data.status : "ON-GOING",
    task_ids: props.data ? props.data.task_ids : [],
    task_list: props.data ? props.data.task_list : [],
    updated_at: props.data ? props.data.updated_at : "",
    w_id: props.data ? props.data.w_id : "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [verifyId, setVerifyId] = React.useState<string | null>(null);
  const [warning, setWarning] = React.useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: "-",
    email: "-",
    password: "-",
  });

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    set_workspace_data((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitData: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("Submit!!!");
    setButtonDisabled(true);

    const response = await fetch("/api/create-workspace", {
      body: JSON.stringify(workspace_data),
      headers: { "content-type": "json/application" },
      method: "POST",
    });

    const res = await response.json();

    const message = await res.message;

    if ((await message) == "success" && response.status == 200) {
      console.log("yeyyy");
      setVerifyId(await res.w_id);
    } else if ((await message) == "user-exist") {
      console.log("nooo");
      setButtonDisabled(false);
    } else {
      console.log("nooo");
      setButtonDisabled(false);
      setWarning((prev) => {
        return {
          ...prev,
          username: "Gagal. Terjadi kesalahan pada jaringan",
        };
      });
    }
  };

  React.useEffect(() => {
    if (verifyId) {
      router.replace(`/workspace/${verifyId}`);
    }
  }, [verifyId]);

  return (
    <main className={s.main}>
      <MenuNavbar closeHandler={() => {}} title="Workspace Setup" />
      <form className={s.form} onSubmit={submitData}>
        <div className={s.input}>
          <InputSmall
            icon="/icons/clipboard.svg"
            label="Nama Workspace"
            name="name"
            onChange={changeHandler}
            placeholder="Masukan nama workspace"
            type="text"
            value={workspace_data.name}
            warning={warning.username}
            key={"workspace-name-input"}
          />
          <InputLarge
            label="Deskripsi workspace"
            name="description"
            onChange={changeHandler}
            placeholder="Masukan deskripsi"
            value={workspace_data.description}
            key={"workspace-description-input"}
          />
        </div>

        <div className={s.action}>
          <ButtonLarge
            bg_color="#080726"
            color="#fff"
            text="Selanjutnya"
            icon="/icons/next_white.svg"
            onClick={() => {}}
            disabled={buttonDisabled}
          />
        </div>
      </form>
    </main>
  );
};

export default WorkspaceSetupPage;
