import axios from 'axios';
import urlConfig from './config.json';

const getUserToken = token => {

    return {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
};

const createNewTrip = (body,token) => {
    const header = getUserToken(token);
    return axios.post(urlConfig.baseURL + '/api/trip/',body,header);
} 

const updateTrip = (body,token,id) => {
  
  const header = getUserToken(token);
  return axios.put(urlConfig.baseURL + '/api/trip/'+id,body,header);
}

const getTripById = (id,token) => {
  
  console.log(token)
  const header = getUserToken(token);
  console.log(urlConfig.baseURL + '/api/trip/'+id)
  return axios.get(urlConfig.baseURL + '/api/trip/'+id,header);
} 


const getTripList = (body,token) => {
  const header = getUserToken(token);
  return axios.post(urlConfig.baseURL + '/api/trip/filter',body,header);
}
export {
  createNewTrip,
  updateTrip,
  getTripById,
  getTripList
};