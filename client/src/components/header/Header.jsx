import styles from "./Header.module.scss"
import logo from "../../images/logo.svg"
import cross from "../../images/cross.svg"
import React, { useState } from "react";
export const Header = () => {
    const [menu, setMenu] = useState(false);
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <img src={logo} alt="" />
                    </div>
                    DEPARTMENT OF PHYSICS
                </div>

                <div className={styles.options}>
                    <div className={styles.place}>
                        Ломоносова 9
                    </div>
                    <div className={styles.place}>
                        Церковь
                    </div>
                </div>
                <div className={styles.burger} onClick={()=>{setMenu(true);console.log(menu)}}>

                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.menu} style={menu ? { transform: `translateY(0%)` } : { transform: `translateY(-100%)` }}>
                        <div className={styles.cross} onClick={()=>setMenu(false)}>
                            <img src={cross} alt="" />
                        </div>
                        <div className={styles.options}>
                            <div className={styles.place}>
                                Ломоносова 9
                            </div>
                            <div className={styles.place}>
                                Церковь
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}