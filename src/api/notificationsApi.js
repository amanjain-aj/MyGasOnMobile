import axios from 'axios';
import urlConfig from './config.json';

const getUserToken = token => {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
};


//*Agency home notification

const sendNotif = (token,body) => {
    const header = getUserToken(token);

    return axios.post(urlConfig.baseURL + '/api/notify/',body, header);
}


export {
    sendNotif
}