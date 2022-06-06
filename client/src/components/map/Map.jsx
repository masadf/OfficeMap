import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';


import first_rooms from './mapdata/1st_plan/1st_rooms.json'; 
import first_background from './mapdata/1st_plan/1st_background.json';
import second_rooms from './mapdata/2nd_plan/2nd_rooms.json';
import second_background from './mapdata/2nd_plan/2nd_background.json'; 
import third_rooms from './mapdata/3rd_plan/3rd_rooms.json';
import third_background from './mapdata/3rd_plan/3rd_background.json';
import fourth_rooms from './mapdata/4th_plan/4th_rooms.json';
import fourth_background from './mapdata/4th_plan/4th_background.json';
import fifth_rooms from './mapdata/5th_plan/5th_rooms.json';
import fifth_background from './mapdata/5th_plan/5th_background.json'; 

import React, { useCallback } from 'react';

import VectorMap, {
    Layer,
    Tooltip,
    Label,
  } from 'devextreme-react/vector-map';



const projection = {
    to: ([l, lt]) => [l / 300, lt / 300],
    from: ([x, y]) => [x * 300, y * 300],
};


export const Map = () => {

    const clickFunc = useCallback((e) => {
          if (e.target) {
            if (e.target.layer.name === 'rooms') {
              console.log(e.target.index);
            } 
          }
      }, []);

    return(
    <VectorMap
        id="vector-map"
        maxZoomFactor={10}
        projection={projection}
        onClick={clickFunc}
      >
        <Layer
          dataSource={first_background}
          hoverEnabled={true}
          customize={customizeLayer}
          name="building">
        </Layer>
        <Layer
          dataSource={first_rooms}
          name="rooms"
          customize={customizeLayer}
          borderWidth={1}>
          <Label enabled={true} dataField="name"></Label>
        </Layer>
        <Tooltip
          enabled={true}
          customizeTooltip={customizeTooltip}
        ></Tooltip>
      </VectorMap>
    )
}

function customizeTooltip(arg) {
    if (arg.layer.name === 'rooms') {
      return { text: `Square: ${arg.attribute('square')} ft&#178`};
    }
    return null;
  }

function customizeLayer(elements) {
  elements.forEach((element) => {
    element.applySettings({
      color: element.attribute('fill'),
    });
  });
}
