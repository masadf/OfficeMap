import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import rooms from './mapdata/testroom.json';
import background from './mapdata/background.json';

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import VectorMap, {
    Layer,
    Tooltip,
    Label,
} from 'devextreme-react/vector-map';
import { Context } from "../../index";
import { observer } from "mobx-react-lite"
import { AddEmployeeModal } from './components/AddEmployeeModal';


const projection = {
    to: ([l, lt]) => [l / 300, lt / 300],
    from: ([x, y]) => [x * 300, y * 300],
};


const Map = () => {
    const { store } = useContext(Context);
    const [freeCabModal, openFreeCabModal] = useState(false);
    const [cabData, setCabData] = useState(undefined);
    const reRender=useRef();

    const clickFunc = useCallback((e) => {
        if (e?.target?.layer?.name === 'rooms') {
            if (!store.getElementByIndex(e.target.attribute("index"))) {
                setCabData(e.target.attribute("index"));
                openFreeCabModal(true);
            }
        }


    }, []);


    function customizeTooltip(arg) {
        if (arg.layer.name === 'rooms') {
            let employee = store.getElementByIndex(arg.attribute("index"));
            if (employee) {
                return { text: `${employee.name}` };
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
                    switch (employee.category){
                        case "Руководители":
                            color="purple";
                            break;
                        case "Научные сотрудники":
                            color="blue";
                            break;
                        case "Преподаватели":
                            color="orange";
                            break;
                        case "Административные сотрудники":
                            color="#ea5455"
                            break;
                        case "Учебный офис":
                            color="#ff57b9"
                            break;
                        case "Аспиранты":
                            color="#4ad4c3"
                            break;
                        case "Студенты":
                            color="#6d0f30"
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
        <div >
            {freeCabModal &&
                <AddEmployeeModal
                    openModal={openFreeCabModal}
                    data={cabData}
                    reRender={reRender}
                />
            }
            <VectorMap
                 ref={reRender}
                id="vector-map"
                maxZoomFactor={10}
                projection={projection}
                onClick={clickFunc}
                touchEnabled={true}
                wheelEnabled={true}

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
                <Tooltip
                    enabled={true}
                    customizeTooltip={customizeTooltip}
                ></Tooltip>
            </VectorMap>

        </div>
    )
}


export default observer(Map);