import s from "./InvitationMenu.module.css";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MenuNavbar from "../menu-navbar/MenuNavbar";

interface InvitationMenuProps {
  showHandler: () => void;
  show: boolean;
  closeHandler: () => void;
}

const InvitationMenu: React.FC<InvitationMenuProps> = (props) => {
  const pathname = usePathname();
  const w_id = pathname.split("/")[4];

  const baseURL = "http://localhost:3000";

  const invitation_link = `${baseURL}/invitation/${w_id}`;

  const urlencoded = encodeURI(invitation_link);

  return (
    <div
      className={s.menu}
      style={{ translate: props.show ? "0 0" : "0 100vh" }}
    >
      <MenuNavbar closeHandler={props.closeHandler} title="" />
      <div className={s.header}>
        <h2 className={[s.title, "medium", "md"].join(" ")}>
          Undang teman-teman Anda untuk bergabung dengan workspace Anda!
        </h2>
      </div>
      <figure className={s.figure}>
        <Image
          src={"/ilustration/team_1.svg"}
          alt="ilutrasi keren"
          width={430}
          height={262}
          className={s.ilust}
        />
      </figure>
      <div className={s.action}>
        <p className={[s.text, "medium", "sm", "blend"].join(" ")}>
          Klik tautan di bawah untuk menyalin tautan ke papan klip dan bagikan
          ke teman Anda!
        </p>
        <div
          className={s.link_field}
          onClick={() => {
            if (navigator) {
              navigator.clipboard.writeText(invitation_link);
            }
          }}
        >
          <input
            type="text"
            className={[s.static_input, "sm", "medium"].join(" ")}
            value={invitation_link}
            readOnly
          />
          <button className={s.copyBtn}>
            <Image
              src={"/icons/link.svg"}
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
