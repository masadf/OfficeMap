import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import React, { useCallback } from 'react';

import VectorMap, {
    Layer,
    Tooltip,
    Label,
  } from 'devextreme-react/vector-map';

import { roomsData, buildingData, testData } from './rooms.js';


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
        maxZoomFactor={5}
        projection={projection}
        onClick={clickFunc}
      >
        <Layer
          dataSource={buildingData}
          hoverEnabled={true}
          name="building">
        </Layer>
        <Layer
          dataSource={testData}
          name="rooms"
          borderWidth={3}>
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