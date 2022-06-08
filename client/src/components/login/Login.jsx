import {useContext, useState} from "react";
import toast, {Toaster} from 'react-hot-toast';
import styles from "./Login.module.css"
import {useNavigate} from "react-router-dom";
import { Context } from "../..";

export const Login = () => {
    const {store} = useContext(Context)
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login.length === 0 || password.length === 0) {
            toast.error("Поля некорректны!");
            return;
        }
        store.login(login, password)
            .then(r => r.data.msg !== undefined ? toast.error(r.data.msg) : navigate("/lomo"));
    }
    return (
        <div className={styles.wrapper}>
            <Toaster
                position="bottoms-right"
            />
            <form onSubmit={(e) => handleSubmit(e)} className={styles.content}>
                <div className={styles.header}>Войти</div>
                <div className={styles.input_block}>
                    <div className={styles.name}>
                        Логин
                    </div>
                    <div className={styles.input}>
                        <input name="login" value={login} type="text"
                               onChange={(e) => setLogin(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className={styles.input_block}>
                    <div className={styles.name}>
                        Пароль
                    </div>
                    <div className={styles.input}>
                        <input name="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)}
                               type="password"/>
                    </div>
                </div>
                <div className={styles.button}>
                    <button type="submit">Войти</button>
                </div>


            </form>
        </div>
    )
}