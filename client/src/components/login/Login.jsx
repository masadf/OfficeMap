import { useState } from "react";
import styles from "./Login.module.css"
export const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:5000/authorization', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                "login": login,
                "password": password
            })
        }).then((r)=>r.json())
        .then((r)=>setErr(r))
       console.log(err)
    
    }
    return (
        <div className={styles.wrapper}>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.content}>
                <div className={styles.header}>Войти</div>
                <div className={styles.input_block}>
                    <div className={styles.name}>
                        Логин
                    </div>
                    <div className={styles.input}>
                        <input name="login" value={login} type="text" onChange={(e) => setLogin(e.currentTarget.value)} />
                    </div>
                </div>
                <div className={styles.input_block}>
                    <div className={styles.name}>
                        Пароль
                    </div>
                    <div className={styles.input}>
                        <input name="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} type="text" />
                    </div>
                </div>
                <div className={styles.button}>
                    <button type="submit">Войти</button>
                </div>
                <span>{err.msg}</span>
                
            </form>
        </div>
    )
}