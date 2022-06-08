import { useState } from 'react';
import Map from "../map/Map"
import Select from 'react-select'
import styles from "./MainPage.module.css"
export const MainPage = ({ employeeData }) => {
    const [employee, setEmployee] = useState({});
    const handleSelect = (selectChoice) => {
        fetch('http://127.0.0.1:5000/aboutEmployee', {
            method: 'POST',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token"),
            },
            credentials: 'include',
            body: JSON.stringify({
                "_id": selectChoice.value
            })
        }).then((r) => r.json())
            .then((r) => { setEmployee(r.data); console.log(r.data)})
    }
    return (
        <div className={styles.wrapper}>
            <Map></Map>
        
        </div>
    )
}