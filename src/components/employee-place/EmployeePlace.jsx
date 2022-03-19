import { useState } from "react";
import styles from "./EmployeePlace.module.scss"
import { ModalWindow } from "./modalWindow/ModalWindow";

export const EmployeePlace=()=>{
    const [modal, openModal] = useState(false);
    return(
        <div className={styles.wrapper} >
            <div className={styles.container} onClick={()=>openModal(true)}>
                Click Me!
            </div>
            <ModalWindow openModal={openModal} modal={modal}></ModalWindow>
        </div>
    )
}