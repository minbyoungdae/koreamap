import axios from 'axios';

const serviceKey =
  'N3byy3pvOmkAGIVHjrYEdScs1uLqK7PEh0QF6X5IXAu9KaLbKkkwxS/B9ym7Dmk5ZtRfvjDMC5iKELmta+VTtg==';
const endPoint = 'http://api.visitkorea.or.kr/openapi/service';

export const getAreaCode = async (args: any) => {
  return await axios.get(`${endPoint}/rest/KorService/areaCode`, {
    params: {
      serviceKey: encodeURI(serviceKey),
      numOfRows: 100,
      pageNo: 1,
      MobileOS: 'ETC',
      MobileApp: 'AppTest',
      areaCode: args,
    },
  });
};

export const getList = async (args: any) => {
  return await axios.get(`${endPoint}/rest/KorService/areaBasedList`, {
    params: {
      serviceKey: encodeURI(serviceKey),
      numOfRows: 10,
      pageNo: 1,
      MobileOS: 'ETC',
      MobileApp: 'AppTest',
      arrange: 'P',
      areaCode: args.areaCode,
      sigunguCode: args.sigunguCode,
    },
  });
};
