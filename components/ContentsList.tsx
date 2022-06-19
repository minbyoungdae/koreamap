import React from 'react';
import { getAreaCode, getList } from '../services/visitkorea';
import { useState } from 'react';
import { useEffect } from 'react';

const ContentsList = ({ popupDate }: any) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    new Promise<void>((resolve, reject) => {
      const codeData = require('../jsons/code.json');
      const item = codeData.filter((item: any) => item.code === popupDate);
      resolve(item);
    }).then((item: any) => {
      getAreaCode(item[0].areaCode).then((res) => {
        if (res.status === 200) {
          const list = res.data.response.body.items.item;
          // console.log(list);
          let code = -1;
          list.map((object: any) => {
            // console.log('aaa', object.name.includes(item[0].geo));
            // console.log(object);
            // console.log(item[0].geo);

            if (object.name.includes(item[0].geo)) {
              code = object.code;
              return;
            }
          });
          getList({ areaCode: item, sigunguCode: code }).then((res) => {
            console.log(res.data.response.body.items.item);
            if (res.status === 200) {
              if (res.data.response.body.items === '') {
                setList([]);
              } else {
                setList(res.data.response.body.items.item);
              }
            }
          });
        }
      });
    });
  }, [popupDate]);

  return (
    <>
      {list.map((item: any, idx: number) => (
        <div key={idx}>
          {item.title}
          <img src={item.firstimage} alt="tumbnail" width={100} />
        </div>
      ))}
    </>
  );
};

export default ContentsList;
