import styles from "./BuildingPlan.module.css"
import { TransferCard } from "./transfer-card/TransferCard"
export const BuildingPlan = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>Аудитории на Ломоносова 9</div>
            <div className={styles.items}>
                <TransferCard></TransferCard>
                <TransferCard></TransferCard>
                <TransferCard></TransferCard>
                <TransferCard></TransferCard>
                <TransferCard></TransferCard>
                <TransferCard></TransferCard>
            </div>

        </div>
    )
}