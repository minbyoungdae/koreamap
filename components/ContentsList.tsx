import React from 'react';
import { getAreaCode, getList } from '../services/visitkorea';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const Loader = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin-top: 30vh;
    border-radius: 50%;
    border: 6px solid #222;
    border-color: #222 transparent #222 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ContentsList = ({ popupDate, setMarking }: any) => {
  const [list, setList] = useState<any>([]);
  useEffect(() => {
    setList([]);
    new Promise<void>((resolve, reject) => {
      const codeData = require('../jsons/code.json');
      const item = codeData.filter((item: any) => item.code === popupDate.code);
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
                setList('error');
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
      <div
        style={{
          margin: '0 auto',
          display: 'flex',
          alignContent: 'center',
          flexDirection: 'column',
        }}
      >
        {list.length === 0 ? (
          <Loader className="lds-dual-ring"></Loader>
        ) : list === 'error' ? (
          <h3 style={{ lineHeight: '500px', height: '80%' }}>데이터가 존재하지 않습니다.</h3>
        ) : (
          list.map((item: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', padding: '20px' }}>
              <img
                src={item.firstimage}
                alt="tumbnail"
                width={200}
                style={{ marginRight: '40px', borderRadius: '25px' }}
              />
              <div>
                <h3>{item.title}</h3>
                <p>주소 : {item.addr1}</p>
                {item.tel && <p>전화번호 : {item.tel}</p>}
              </div>
            </div>
          ))
        )}
        {list.length !== 0 && (
          <div style={{ margin: '0 auto' }}>
            <button
              style={{
                width: '100px',
                height: '50px',
                backgroundColor: '#eee9ff',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setMarking(true)}
              type="button"
            >
              Mark
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ContentsList;
