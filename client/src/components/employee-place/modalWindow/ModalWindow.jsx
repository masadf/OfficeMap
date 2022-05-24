import styles from "./ModalWindow.module.css"
import React from 'react';

export const ModalWindow=({openModal,modal,data})=>{
    return(
       <div className={modal ? styles.wrapper : styles.none} onClick={()=>openModal(false)}>
           <div className={styles.container} onClick={e=>e.stopPropagation()}>
                <div className={styles.element}>
                    <span>Фамилия</span>
                    <span>{data.surname} </span>
                </div>
                <div className={styles.element}>
                    <span>Имя</span>
                    <span> {data.name}</span>
                </div>
                <div className={styles.element}>
                    <span>Кабинет</span>
                    <span>{data.cabinet}</span>
                </div>
                <div className={styles.element}>
                    <span>Фамилия</span>
                    <span>{data.surname} </span>
                </div>
                <div className={styles.element}>
                    <span>Имя</span>
                    <span> {data.name}</span>
                </div>
                <div className={styles.element}>
                    <span>Кабинет</span>
                    <span>{data.cabinet}</span>
                </div>
           </div>
       </div> 
    )
}