import {useState, useContext} from "react";
import toast, {Toaster} from 'react-hot-toast';
import {useNavigate} from "react-router-dom";
import styles from "./Registration.module.css"
import {observer} from "mobx-react-lite"
import {Context} from "../../index";

const Registration = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context)
    let loginRe = /^[a-zA-Z](.[a-zA-Z0-9_-]*)$/;
    let passwordRe = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!loginRe.test(login)) {
            toast.error("Недопустимый логин!");
            return;
        }
        if (!passwordRe.test(password)) {

            toast.error("Пароль должен состоять из числа, спецсимвола, латинских букв в верхнем и нижнем регистрах, а также иметь длину более 5!");
            return;
        }
        if (repeatedPassword !== password) {
            toast.error("Пароли не совпадают!");
            return;
        }
        store.registration(login,password).then(r => r.data.msg !== undefined ? toast.error(r.data.msg) : navigate("/"));

    }
    return (
        <div className={styles.wrapper}>

            <form onSubmit={(e) => handleSubmit(e)} className={styles.content}>
                <Toaster
                    position="bottom-right"
                />
                <div className={styles.header}>Регистрация</div>
                <div className={styles.input_block}>
                    <div className={styles.name}>
                        Логин
                    </div>
                    <div className={styles.input}>
                        <input value={login} type="text" onChange={(e) => setLogin(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className={styles.input_block}>
                    <div className={styles.name}>
                        Пароль
                    </div>
                    <div className={styles.input}>
                        <input value={password} onChange={(e) => setPassword(e.currentTarget.value)} type="password"/>
                    </div>
                </div>
                <div className={styles.input_block}>
                    <div className={styles.name}>
                        Повторите пароль
                    </div>
                    <div className={styles.input}>
                        <input value={repeatedPassword} onChange={(e) => setRepeatedPassword(e.currentTarget.value)}
                               type="password"/>
                    </div>
                </div>
                <div className={styles.button}>
                    <button type="submit">Отправить</button>
                </div>

            </form>
        </div>
    )
}

export default observer(Registration);