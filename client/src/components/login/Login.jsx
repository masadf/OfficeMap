import styles from "./Login.module.css"
export const Login = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.header}>Войти</div>
                <div className={styles.input_block}>
                    <div className={styles.name}>
                        Логин
                    </div>
                    <div className={styles.input}>
                        <input type="text" />
                    </div>
                </div>
                <div className={styles.input_block}>
                    <div className={styles.name}>
                        Пароль
                    </div>
                    <div className={styles.input}>
                        <input type="text" />
                    </div>
                </div>
                <div className={styles.button}>
                    <button>Войти</button>
                </div>
            </div>
        </div>
    )
}