import axios from 'axios';

import urlConfig from './config.json';

const getUserToken = token => {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
};

const GetUserDetails = (username, token) => {
  
  const header = getUserToken(token);
  console.log(username)
  return axios.get(urlConfig.baseURL + '/api/user/' + username+`?random=${Math.random().toString(36).substring(7)}`, header);
};

const UpdateUserDetails = (username, body, token) => {
  const header = getUserToken(token);

  return axios.put(urlConfig.baseURL + '/api/user/' + username, body, header);
};


const getUserList = (token,body) => {
  const header = getUserToken(token);
  return axios.get(urlConfig.baseURL + '/api/user/?role='+body.role+'&'+'agencyId='+body.agencyId, header);
}


export {GetUserDetails,UpdateUserDetails,getUserList};
