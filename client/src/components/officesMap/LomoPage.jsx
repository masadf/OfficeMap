import Map from "./map/Map"
import styles from "./OfficesMap.module.css"
import rooms1 from './mapdata/1st_plan/1st_rooms.json';
import background1 from './mapdata/1st_plan/1st_background.json';
import rooms2 from './mapdata/2nd_plan/2nd_rooms.json';
import background2 from './mapdata/2nd_plan/2nd_background.json';
import design2 from './mapdata/2nd_plan/2nd_design.json';
import rooms3 from './mapdata/3rd_plan/3rd_rooms.json';
import background3 from './mapdata/3rd_plan/3rd_background.json';
import design3 from './mapdata/3rd_plan/3rd_design.json';
import arrow from "../../images/arrow.svg"
import { useState } from "react";
export const LomoPage = () => {
    const [office, setOffice] = useState(-1);

    const rightSwap = () => {
        if (office === 1) {
            setOffice(-1);
            return;
        }
        setOffice(office + 1);
    }
    const leftSwap = () => {
        if (office === -1) {
            setOffice(1);
            return;
        }
        setOffice(office - 1);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.block}>
                <div className={styles.swappers}>
                    <div className={styles.swapper} onClick={leftSwap}>
                        <img src={arrow} alt="" />
                    </div>
                    <div className={styles.swapper} onClick={rightSwap}>
                        <img src={arrow} alt="" />
                    </div>
                </div>

                {office === -1 &&
                    <div className={styles.item}>
                        <Map
                            rooms={rooms1}
                            background={background1} />
                    </div>}

                {office === 0 &&
                    <div className={styles.item}>
                        <Map
                            rooms={rooms2}
                            background={background2}
                            design={design2} />
                    </div>
                }

                {office === 1 &&
                    <div className={styles.item}>
                        <Map
                            rooms={rooms3}
                            background={background3} 
                            design={design3}/>
                    </div>
                }

            </div>
        </div >
    )


}