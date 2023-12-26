import s from "./ConfirmedInvitation.module.css";
import React from "react";

const ConfirmedInvitation: React.FC = () => {
    return(
        <main className={s.main} >
            <div className={s.header} >
                <h2 className={s.title} >
                    Hai! {} Undangan untuk bergabung ke workspace sudah terverifikasi! 
                </h2>
                <p className={s.a} ></p>
            </div>
        </main>
    )
}