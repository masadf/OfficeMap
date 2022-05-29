import { useState } from "react";
import styles from "./EmployeePlace.module.css"
import { ModalWindow } from "./modalWindow/ModalWindow";
import React from 'react';

export const EmployeePlace = ({ data }) => {
    const [modal, openModal] = useState(false);
    return (
        <div className={styles.wrapper} >
            <div className={styles.container} onClick={() => openModal(true)}>
                {data._id}
            </div>
            <ModalWindow openModal={openModal} modal={modal} data={data}></ModalWindow>
        </div>
    )
}