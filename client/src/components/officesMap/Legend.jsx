import styles from "./OfficesMap.module.css"

export const Legend = () => {
    return (
        <div className={styles.legend}>
            <div className={styles.legend_content}>
                <div className={styles.legend_item}>
                    <div className={styles.legend_color} style={{ background: "purple" }}></div>
                    <div className={styles.legend_name}>Руководители</div>
                </div>
                <div className={styles.legend_item}>
                    <div className={styles.legend_color} style={{ background: "#ff57b9" }} ></div>
                    <div className={styles.legend_name}>Научные сотрудники</div>
                </div>
                <div className={styles.legend_item}>
                    <div className={styles.legend_color} style={{ background: "#6d0f30" }} ></div>
                    <div className={styles.legend_name}>Преподаватели</div>
                </div>
                <div className={styles.legend_item}>
                    <div className={styles.legend_color} style={{ background: "#ea5455" }}></div>
                    <div className={styles.legend_name}>Административные сотрудники</div>
                </div>
                <div className={styles.legend_item}>
                    <div className={styles.legend_color} style={{ background: "blue" }}></div>
                    <div className={styles.legend_name}>Учебный офис</div>
                </div>
                <div className={styles.legend_item}>
                    <div className={styles.legend_color} style={{ background: "orange" }}></div>
                    <div className={styles.legend_name}>Аспиранты</div>
                </div>
                <div className={styles.legend_item}>
                    <div className={styles.legend_color} style={{ background: "#4ad4c3" }} ></div>
                    <div className={styles.legend_name}>Студенты</div>
                </div>
            </div>
        </div>
    )
}