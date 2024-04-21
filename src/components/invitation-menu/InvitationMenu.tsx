import s from "./InvitationMenu.module.css";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MenuNavbar from "../menu-navbar/MenuNavbar";
import Context, { ContextType } from "@/context/Store";
import RoundButton from "../round-button/RoundButton";

interface InvitationMenuProps {
  showHandler: () => void;
  show: boolean;
  closeHandler: () => void;
}

const InvitationMenu: React.FC<InvitationMenuProps> = (props) => {
  const { user_workspaces_ctx, theme_ctx } = React.useContext(
    Context
  ) as ContextType;

  const is_dark = theme_ctx === "dark";

  const pathname = usePathname();
  const w_id = pathname.split("/")[4];

  const workspace_name = React.useMemo(() => {
    const workspace = user_workspaces_ctx.find((w) => w.w_id === w_id);
    return workspace ? workspace.name : "~";
  }, [user_workspaces_ctx]);

  const [invitation_link, setInvitationLink] = React.useState<string>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/invitation/${w_id}`
  );

  const urlencoded = encodeURI(invitation_link);

  React.useEffect(() => {
    setInvitationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/invitation/${w_id}`);
  }, [props.show]);

  return (
    <div
      className={[s.menu, is_dark && s.dark].join(" ")}
      style={{ translate: props.show ? "0 0" : "0 100vh" }}
    >
      <RoundButton
        color="transparent"
        icon={is_dark ? "/icons/close_white.svg" : "/icons/close_black.svg"}
        opacity={1}
        onClick={() => {
          props.closeHandler();
        }}
        icon_scale={1.2}
        style={{
          position: "absolute",
          top: "2%",
          right: "2%",
          zIndex: 99,
        }}
      />
      {/* <MenuNavbar closeHandler={props.closeHandler} title="" /> */}
      <div className={s.header}>
        <h2 className={[s.title, "medium", "md", "blend"].join(" ")}>
          Invite your friends to join your workspace!
        </h2>
        <span className={[s.workspace_name, "big", "medium"].join(" ")}>
          {workspace_name}
        </span>
      </div>
      <figure className={s.figure}>
        <Image
          src={"/ilustration/invitation.svg"}
          alt="ilutrasi keren"
          width={80}
          height={100}
          className={s.ilust}
        />
      </figure>
      <div className={s.action}>
        <p className={[s.text, "medium", "sm", "blend"].join(" ")}>
          Click the link below to copy invitation link to clipboard or share it
          via your prefered social media!
        </p>
        <div
          className={s.link_field}
          onClick={() => {
            if (navigator) {
              navigator.clipboard.writeText(invitation_link);
              setInvitationLink("Copied!!!");
              setTimeout(() => {
                setInvitationLink(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/invitation/${w_id}`
                );
              }, 4000);
            }
          }}
        >
          <input
            type="text"
            className={[s.static_input, "sm", "medium", is_dark && s.dark].join(
              " "
            )}
            value={invitation_link}
            readOnly
          />
          <button className={s.copyBtn}>
            <Image
              src={is_dark ? "/icons/link_white.svg" : "/icons/link.svg"}
              alt="link icon to copy link"
              width={18}
              height={18}
              className={s.icon_link}
            />
          </button>
        </div>

        <ul className={s.icon_list}>
          <li className={s.icon_item}>
            <a
              className={s.anchor}
              href={`https://wa.me/?text=${urlencoded}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={"/icons/whatsapp-color.svg"}
                alt="whatsapp icon untuk berbagi link melalui whatsapp"
                width={35}
                height={35}
                className={s.icon}
              />
            </a>
          </li>
          <li className={s.icon_item}>
            <a
              className={s.anchor}
              href={`https://t.me/share/url?url=${urlencoded}&text=`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={"/icons/telegram-color.svg"}
                alt="telegram icon untuk berbagi link melalui telegram"
                width={31}
                height={31}
                className={s.icon}
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InvitationMenu;
