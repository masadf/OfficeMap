import styles from "./Header.module.css"
import logo from "../../images/logo.svg"
import cross from "../../images/cross.svg"
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite"
import { Context } from "../../index";
import {
    Link, NavLink, useNavigate
} from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);
    const { store } = useContext(Context)
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Link to="/lomo" className={styles.title}>
                    <div className={styles.icon}>
                        <img src={logo} alt="" />
                    </div>
                    <span> DEPARTMENT OF PHYSICS</span>
                </Link>

                <div className={styles.options}>
                    <NavLink to={"/lomo"} className={({ isActive }) => `${isActive ? styles.active : styles.place}`}>Ломоносова 9</NavLink>
                    <NavLink to={"/church"} className={({ isActive }) => `${isActive ? styles.active : styles.place}`}>Церковь</NavLink>
                    <div className={styles.place} onClick={(e) => { store.logout(); navigate("/login") }}>
                        Выйти
                    </div>
                </div>
                <div className={styles.burger} onClick={() => { setMenu(true) }}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.menu} style={menu ? { transform: `translateY(0%)` } : { transform: `translateY(-100%)` }}>
                    <div className={styles.cross} onClick={() => setMenu(false)}>
                        <img src={cross} alt="" />
                    </div>
                    <div className={styles.options}>
                        <NavLink to={"/lomo"} className={({ isActive }) => `${isActive ? styles.active : styles.place}`} onClick={() => setMenu(false)}>Ломоносова 9</NavLink>
                        <NavLink to={"/church"} className={({ isActive }) => `${isActive ? styles.active : styles.place}`} onClick={() => setMenu(false)}>Церковь</NavLink>
                        <div className={styles.place} onClick={(e) => { store.logout(); navigate("/login") }}>
                            Выйти
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default observer(Header);