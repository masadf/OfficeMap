import styles from "./ModalWindow.module.scss"
import React from 'react';

export const ModalWindow=({openModal,modal})=>{
    return(
       <div className={modal ? styles.wrapper : styles.none} onClick={()=>openModal(false)}>
           <div className={styles.container} onClick={e=>e.stopPropagation()}>
                <div className={styles.element}>
                    <span>ФИО</span>
                    <input type="text" />
                </div>
                <div className={styles.element}>
                    <span>Должность</span>
                    <input type="text" />
                </div>
                <div className={styles.element}>
                    <span>Сайт</span>
                    <input type="text" />
                </div>
           </div>
       </div> 
    )
}