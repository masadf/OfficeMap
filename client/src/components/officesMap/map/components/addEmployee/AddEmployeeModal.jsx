import styles from "../EmployeeModal.module.css"
import React, { useContext, useState } from 'react';
import Select from 'react-select'
import toast, { Toaster } from 'react-hot-toast';
import { Context } from "../../../../..";


export const AddEmployeeModal = ({ openModal, cabNum, reRender }) => {
    const { store } = useContext(Context);
    const [employee, setEmployee] = useState(undefined);
    const employeeHandler = (e) => {
        setEmployee(e);
        if (e.cabNum) {
            toast("Данный сотрудник закреплён за другим местом!", {
                icon: '⚠️',
            });
        }

    }

    return (
        <div className={styles.wrapper} onClick={() => openModal(false)}>
            <div className={styles.container} onClick={e => e.stopPropagation()}>
                <Toaster
                    position="bottom-right"
                />
                <div className={styles.header}>Добавление сотрудника</div>
                <div className={styles.employee_body}>
                    <div className={styles.item}>
                        <div className={styles.item_header}>Сотрудник</div>
                        <Select onChange={employeeHandler} options={store.employeeData.map(x => { return { value: x._id, label: x.name, email: x.email, href: x.href, category: x.category, cabNum: x.cab_number } })} />
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
                    <button className={styles.enter_button}
                        onClick={() => {
                            store.setEmployeeCab(employee.value, cabNum);
                            openModal(false);
                            reRender.current.instance.option("layers[1].dataSource", undefined);
                            reRender.current.instance.render();
                        }}>
                        Закрепить
                    </button>
                </div>

            </div>
        </div>
    )
}