"use client";
import s from "./WorkspaceSetupPage.module.css";
import React, { FormEventHandler } from "react";
import InputSmall from "../input-small/InputSmall";
import InputLarge from "../input-large/InputLarge";
import MenuNavbar from "../menu-navbar/MenuNavbar";
import { WorkspaceType } from "@/type";
import Context, { ContextType } from "@/context/Store";
import ButtonLarge from "../button-large/ButtonLarge";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useDateNow } from "@/hook/useDateNow";
import { useIdGenerator } from "@/hook/useIdGenerator";

interface WorkspaceSetupPageProps {
  data?: WorkspaceType;
}

const WorkspaceSetupPage: React.FC<WorkspaceSetupPageProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const id_generator = useIdGenerator();
  const date_now = useDateNow();

  const u_id = pathname.split("/")[2];

  const { user_data_ctx, workspace_replace_ctx, workspace_create_ctx } =
    React.useContext(Context) as ContextType;

  const [workspace_data, set_workspace_data] = React.useState<WorkspaceType>({
    activity_list: props.data ? props.data.activity_list : [],
    admin_list: props.data
      ? props.data.admin_list
      : user_data_ctx
      ? [{ u_id: user_data_ctx.u_id, username: user_data_ctx.username }]
      : [],
    created_at: props.data ? props.data.created_at : "",
    description: props.data ? props.data.description : "",
    member_list: props.data
      ? props.data.member_list
      : user_data_ctx
      ? [{ u_id: user_data_ctx.u_id, username: user_data_ctx.username }]
      : [],
    name: props.data ? props.data.name : "",
    notification_list: props.data ? props.data.notification_list : [],
    status: props.data ? props.data.status : "ON-GOING",
    task_ids: props.data ? props.data.task_ids : [],
    task_list: props.data ? props.data.task_list : [],
    updated_at: props.data ? props.data.updated_at : "",
    w_id: props.data ? props.data.w_id : "",
    waiting_list: []
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

    const date_time = date_now.withTime();

    if (props.data) {
      //operasi client-side change

      const updated_workspace: WorkspaceType = {
        ...workspace_data,
        updated_at: date_time,
      };

      const response = await workspace_replace_ctx(props.data.w_id, {
        u_id: u_id,
        workspace: updated_workspace,
      });

      const data = await response;

      if (await data.updated_count) {
        console.log("yeyyy");

        router.replace(`/home/${u_id}/workspace/${updated_workspace.w_id}`);
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
    } else {
      const w_id = id_generator.workspace();
      const new_workspace: WorkspaceType = {
        ...workspace_data,
        created_at: date_time,
        updated_at: date_time,
        w_id: w_id,
      };

      const data = await workspace_create_ctx(w_id, {
        u_id: u_id,
        workspace: new_workspace,
      });

      if (data && data.updated_count === 1) {
        console.log("yeyyy");

        router.replace(`/home/${u_id}/workspace/${w_id}`);
        //no async data in router --> make the code on context executed twice
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
    }
  };

  // React.useEffect(() => {
  //   router.refresh();
  // }, []);

  return (
    <main className={s.main}>
      {/* <MenuNavbar
        closeHandler={() => {
          router.back();
        }}
        title="Workspace Setup"
      /> */}
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
            maxChar={15}
          />
          <InputLarge
            label="Deskripsi workspace"
            name="description"
            onChange={changeHandler}
            placeholder="Masukan deskripsi"
            value={workspace_data.description}
            key={"workspace-description-input"}
            maxChar={100}
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
