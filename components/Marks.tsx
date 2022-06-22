/* eslint-disable */

import React, { useState } from 'react';
import { line, curveNatural, geoAlbers, geoPath } from 'd3';
import * as d3 from 'd3';
import styled, { css } from 'styled-components';
import { feature, transform } from 'topojson-client';
import ReactTooltip from 'react-tooltip';
import { useEffect } from 'react';

const PathStyle = styled.path`
  fill: white;
  stroke: black;
  outline: none;

  &:hover {
    fill: #46ccff;
    cursor: pointer;
  }
`;

const initialScale = 5500; //확대시킬 값
const initialX = -11900; //초기 위치값 X
const initialY = 4050; //초기 위치값 Y

const projection = d3.geoMercator().scale(initialScale).translate([initialX, initialY]);
const path = geoPath(projection);

const Marks = ({ data, handlerPopup, setPopupDate, popupDate, marking, setMarking }: any) => {
  const array: any = {};
  data.features.map((dd: any, index: any) => {
    array[index] = '';
  });
  const [color, setColor] = useState<any>(array);

  const click = (index: any) => {
    if (color[index] === 'select') {
      setColor({ ...color, [index]: '' });
      localStorage.setItem('color', JSON.stringify({ ...color, [index]: '' }));
    } else {
      setColor({ ...color, [index]: 'select' });
      localStorage.setItem('color', JSON.stringify({ ...color, [index]: 'select' }));
    }
  };

  useEffect(() => {
    if (marking) {
      click(popupDate.index);
      setMarking(false);
    }
  }, [marking]);

  useEffect(() => {
    if (localStorage.getItem('color')) {
      setColor(localStorage.getItem('color'));
      const savedColor = JSON.parse(localStorage.getItem('color'));
      setColor(savedColor);
    }
  }, []);

  if (data) {
    console.log(data.features.length);

    return (
      <>
        <g>
          {data.features.map((feature: any, index: number) => (
            <PathStyle
              key={index}
              d={path(feature)}
              onClick={() => {
                handlerPopup();
                setPopupDate({ code: feature.properties.code, index });
              }}
              className={color[index]}
              data-tip={feature.properties.name}
              data-for="happyFace"
              // data-event="click focus"
            ></PathStyle>
          ))}
        </g>
      </>
    );
  }
};

export default Marks;
