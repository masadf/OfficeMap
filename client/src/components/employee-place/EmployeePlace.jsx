import { useState } from "react";
import styles from "./EmployeePlace.module.scss"
import { ModalWindow } from "./modalWindow/ModalWindow";
import React from 'react';

export const EmployeePlace=({num})=>{
    const [modal, openModal] = useState(false);
    return(
        <div className={styles.wrapper} >
            <div className={styles.container} onClick={()=>openModal(true)}>
                {num}
            </div>
            <ModalWindow openModal={openModal} modal={modal}></ModalWindow>
        </div>
    )
}