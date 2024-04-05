"use client";
import s from "./InvitationLandingPage.module.css";
import { WorkspaceType } from "@/type";
import React from "react";
import Image from "next/image";
import Avatar from "../avatar/Avatar";
import { color_list } from "../workspace-card/WorkspaceCard";
import ButtonLarge from "../button-large/ButtonLarge";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

const InvitationLandingPage: React.FC<{ data: WorkspaceType }> = (props) => {
  const router = useRouter();
  const pathname = usePathname();

  const toSignUp = () => {
    router.push(`${pathname}/sign-up`);
    console.log("huhu");
  };

  return (
    <main className={s.main}>
      <div className={s.header}>
        <h2 className={[s.title, "medium", "md"].join(" ")}>
          This is an invitation link to join workspace:
        </h2>{" "}
        <br />
        <span className={[s.workspace_name, "bold", "big"].join(" ")}>
          {props.data.name}
        </span>
      </div>
      <div className={s.content}>
        <figure className={s.figure}>
          <Image
            src={"/ilustration/invitation_landing.svg"}
            alt="invitation ilustartion"
            width={430}
            height={262}
            className={s.ilust}
            loading="eager"
          />
        </figure>
        <section className={s.action}>
          <p className={[s.member_title, "md", "medium", "blend"].join(" ")}>
            Members
          </p>
          <ul className={s.member_list}>
            {props.data.member_list.map((member, index) => {
              return (
                <li className={s.item} key={`invitation-member-${index}`}>
                  <Avatar
                    bg_color={
                      color_list[
                        (index + color_list.length) % color_list.length
                      ]
                    }
                    txt_color="#fff"
                    username={member.u_id}
                  />
                  <span
                    className={[s.username, "medium", "sm", "soft"].join(" ")}
                  >
                    {member.username}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className={[s.guide, "sm", "medium", "blend"].join(" ")}>
            Signup or login to join with other members!
          </p>
          <ButtonLarge
            bg_color="#080726"
            color="#fff"
            text="Sign Up"
            onClick={toSignUp}
          />
          <div className={s.suggestion}>
            <p className={[s.suggestion_txt, "sm", "blend"].join(" ")}>
              Already have an account?
            </p>
            <span className={[s.suggestion_btn, "sm", "medium"].join(" ")}>
              <Link href={`${pathname}/login`}>Login</Link>
            </span>
          </div>
        </section>
      </div>
    </main>
  );
};

export default InvitationLandingPage;
