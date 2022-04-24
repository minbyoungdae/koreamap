import React, { useEffect, useState } from "react";
import { json } from "d3";
import { feature } from "topojson";

const jsonData =
  "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2012/json/municipalities-topo-simple.json";

export const useData = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    json(jsonData).then((topojsonData: any) => {
      const muni = topojsonData.objects[Object.keys(topojsonData.objects)[0]];
      setData(feature(topojsonData, muni));
    });
  }, []);

  return data;
};
