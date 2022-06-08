import styles from "./Header.module.css"
import logo from "../../images/logo.svg"
import cross from "../../images/cross.svg"
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
export const AuthHeader = () => {
    const [menu, setMenu] = useState(false);

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Link to="/login" className={styles.title}>
                    <div className={styles.icon}>
                        <img src={logo} alt="" />
                    </div>
                    DEPARTMENT OF PHYSICS
                </Link>

                <div className={styles.options}>
                    <NavLink to={"/login"} className={({isActive}) =>`${isActive ? styles.active : styles.place}`}>Вход</NavLink>
                </div>
                <div className={styles.burger} onClick={() => { setMenu(true); console.log(menu) }}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.menu} style={menu ? { transform: `translateY(0%)` } : { transform: `translateY(-100%)` }}>
                    <div className={styles.cross} onClick={() => setMenu(false)}>
                        <img src={cross} alt="" />
                    </div>
                    <div className={styles.options}>
                        <NavLink className={styles.place} to={"/login"} onClick={() => setMenu(false)}>Вход</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}