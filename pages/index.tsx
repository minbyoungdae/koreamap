import { copyFileSync } from 'fs';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Marks from '../components/Marks';
import ContentsList from '../components/ContentsList';
import { useData } from '../components/useData';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { useState } from 'react';

const width = 960;
const height = 500;

const PopupStyle = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PopupInner = styled.div`
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  background: white;
  z-index: 1000;
  overflow: auto;
`;

const Home: NextPage = () => {
  const data = useData();
  const [Popup, setPopup] = useState(false);
  const handlerPopup = () => {
    setPopup(!Popup);
  };
  const [popupDate, setPopupDate] = useState();

  if (!data) {
    return <pre>Loading...</pre>;
  }
  return (
    <>
      <div style={{ margin: '0 auto', width: '700px' }}>
        <svg width="700px" height="700px">
          <Marks data={data} handlerPopup={handlerPopup} setPopupDate={setPopupDate} />
        </svg>
        <ReactTooltip
          id="happyFace"
          type="error"
          getContent={(dataTip) => `${dataTip}`}
        ></ReactTooltip>
      </div>
      {Popup ? (
        <>
          <PopupStyle onClick={handlerPopup}>
            <PopupInner
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <ContentsList popupDate={popupDate} />
            </PopupInner>
          </PopupStyle>
        </>
      ) : null}
    </>
  );
};

export default Home;
