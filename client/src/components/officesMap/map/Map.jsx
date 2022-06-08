import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';



import React, { useCallback, useContext, useRef, useState } from 'react';

import VectorMap, {
    Layer,
    Tooltip,
    Label,
    ControlBar,
} from 'devextreme-react/vector-map';
import { observer } from "mobx-react-lite"
import { AddEmployeeModal } from './components/addEmployee/AddEmployeeModal';
import { AboutEmployeeModal } from './components/aboutEmployee/AboutEmployeeModal';
import styles from "./Map.module.css"
import { Context } from '../../..';

const projection = {
    to: ([l, lt]) => [l / 300, lt / 300],
    from: ([x, y]) => [x * 300, y * 300],
};


const Map = ({ background, rooms, design }) => {
    const { store } = useContext(Context);
    const [freeCabModal, openFreeCabModal] = useState(false);
    const [infoCabModal, openInfoCabModal] = useState(false);
    const [cabNum, setCabNum] = useState(undefined);
    const reRender = useRef();

    const clickFunc = useCallback((e) => {
        if (e?.target?.layer?.name === 'rooms') {
            setCabNum(e.target.attribute("index"));
            if (!store.getElementByIndex(e.target.attribute("index"))) {
                if (store.isAdmin) {
                    openFreeCabModal(true);
                }
            } else {
                openInfoCabModal(true);
            }
        }


    }, []);


    function customizeTooltip(arg) {
        if (arg.layer.name === 'rooms') {
            let employee = store.getElementByIndex(arg.attribute("index"));
            if (employee) {
                return { text: `${employee.name}\n${employee.category}` };
            } else {
                return { text: "Место свободно" }
            }
        }
        return null;
    }

    function customizeLayer(elements) {
        store.loadEmployeesData().then(() => {
            elements.forEach((element) => {
                let employee = store.getElementByIndex(element.attribute("index"));
                if (employee !== undefined) {
                    let color;
                    switch (employee.category) {
                        case "Руководители":
                            color = "purple";
                            break;
                        case "Научные сотрудники":
                            color = "blue";
                            break;
                        case "Преподаватели":
                            color = "orange";
                            break;
                        case "Административные сотрудники":
                            color = "#ea5455"
                            break;
                        case "Учебный офис":
                            color = "#ff57b9"
                            break;
                        case "Аспиранты":
                            color = "#4ad4c3"
                            break;
                        case "Студенты":
                            color = "#6d0f30"
                            break;

                    }
                    element.applySettings({
                        color: color,
                    });
                } else {
                    element.applySettings({
                        color: "green",
                    });
                }
            })
        });
    }

    return (
        <div className={styles.wrapper}>
            {freeCabModal &&
                <AddEmployeeModal
                    openModal={openFreeCabModal}
                    cabNum={cabNum}
                    reRender={reRender}
                />
            }
            {infoCabModal &&
                <AboutEmployeeModal
                    openModal={openInfoCabModal}
                    cabNum={cabNum}
                    reRender={reRender}
                />
            }
            <VectorMap
                className={styles.map}
                ref={reRender}
                id="vector-map"
                zoomFactor={1.2}
                redrawOnResize={true}
                maxZoomFactor={10}
                projection={projection}
                onClick={clickFunc}
                touchEnabled={true}
                wheelEnabled={true}
                loadingIndicator={true}

            >
                <Layer
                    dataSource={background}
                    hoverEnabled={true}
                    name="building">
                </Layer>
                <Layer
                    dataSource={rooms}
                    name="rooms"
                    customize={customizeLayer}
                    borderWidth={0}>
                    <Label enabled={true} dataField="name"></Label>
                </Layer>
                {design &&
                    <Layer
                        dataSource={design}
                        name="design">
                    </Layer>
                }


                <Tooltip
                    enabled={true}
                    customizeTooltip={customizeTooltip}
                    margin={100}
                ></Tooltip>
                <ControlBar
                    enabled={false}
                    verticalAlignment="bottom"
                />
            </VectorMap>

        </div>
    )
}


export default observer(Map);