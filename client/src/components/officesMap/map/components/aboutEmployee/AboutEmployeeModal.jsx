import styles from "../EmployeeModal.module.css"
import React, { useContext, useState } from 'react';
import { Context } from "../../../../..";



export const AboutEmployeeModal = ({ openModal, cabNum, reRender }) => {
    const { store } = useContext(Context);
    const [employee, setEmployee] = useState(store.getElementByIndex(cabNum));

    return (
        <div className={styles.wrapper} onClick={() => openModal(false)}>
            <div className={styles.container} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>Информация о сотруднике</div>
                <div className={styles.employee_body}>
                    <div className={styles.item}>
                        <div className={styles.item_header}>Сотрудник</div>
                        <div className={styles.item_text}>{employee?.name}</div>
                    </div>
                    {employee?.category &&
                        <div className={styles.item}>
                            <div className={styles.item_header}>Категория</div>
                            <div className={styles.item_text}>{employee?.category}</div>
                        </div>
                    }
                    {employee?.email &&
                        <div className={styles.item}>
                            <div className={styles.item_header}>E-mail</div>
                            <div className={styles.item_text}>{employee?.email}</div>
                        </div>
                    }
                    {employee?.href &&
                        <a className={styles.employee_href} href={employee.href}>Перейти к сотруднику</a>
                    }
                    {store.isAdmin &&
                        <button className={styles.enter_button}
                            onClick={() => {
                                store.removeEmployeeCab(employee._id);
                                openModal(false);
                                reRender.current.instance.option("layers[1].dataSource", undefined);
                                reRender.current.instance.render();
                            }}>
                            Открепить
                        </button>
                    }
                </div>

            </div>
        </div>
    )
}