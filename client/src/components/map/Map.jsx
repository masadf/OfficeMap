import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import rooms from './mapdata/testroom.json';
import background from './mapdata/background.json';

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
