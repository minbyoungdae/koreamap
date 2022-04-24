import React, { useEffect, useState } from 'react';
import { json } from 'd3';
import { feature } from 'topojson';

const Map = () => {
  const [data, setData] = useState<any>(null);
  const jsonData = require('../json.json');

  useEffect(() => {
    json(jsonData).then((topojsonData: any) => {
      console.log('aaa');
    });
  }, []);
  return <h1>aaa</h1>;
};

export default Map;
