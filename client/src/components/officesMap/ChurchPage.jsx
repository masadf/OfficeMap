import Map from "./map/Map"
import styles from "./OfficesMap.module.css"
import rooms4 from './mapdata/4th_plan/4th_rooms.json';
import background4 from './mapdata/4th_plan/4th_background.json';
import design4 from './mapdata/4th_plan/4th_design.json';
import rooms5 from './mapdata/5th_plan/5th_rooms.json';
import background5 from './mapdata/5th_plan/5th_background.json';
import design5 from './mapdata/5th_plan/5th_design.json';
import arrow from "../../images/arrow.svg"
import { useState } from "react";
export const ChurchPage = () => {
    const [office, setOffice] = useState(true);
    return (
        <div className={styles.wrapper}>
            <div className={styles.block}>
                <div className={styles.swappers}>
                    <div className={styles.swapper} onClick={()=>setOffice(!office)}>
                        <img src={arrow} alt="" />
                    </div>
                    <div className={styles.swapper} onClick={()=>setOffice(!office)}>
                        <img src={arrow} alt="" />
                    </div>
                </div>

                {office &&
                    <div className={styles.item}>
                        <Map
                            rooms={rooms4}
                            background={background4}
                            design={design4} />
                    </div> }
                    {!office &&
                    <div className={styles.item}>
                        <Map
                            rooms={rooms5}
                            background={background5} 
                            design={design5} />
                    </div>
                }



            </div>
        </div >
    )


}