import axios from 'axios';
import urlConfig from './config.json';

const getUserToken = token => {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
};

const getAgentProfile = (agentId, token) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL + '/api/profile/agent/' + agentId,
    header,
  );
};
const UpdateAgentProfile = (agentId,body, token) => {
  const header = getUserToken(token);

  return axios.put(
    urlConfig.baseURL + '/api/agent/' + agentId,body,
    header,
  );
};

const getAgentById = (agentId, token) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL + '/api/agent/'+agentId,
    header
  );
};
//Staff-----------------------------------------------------------------------------

const getAgentStaffList = (token, page, agentId) => {

  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL +
      '/api/user?page=' +
      page +
      '&size=10&agentId=' +
      agentId,
    header,
  );
};

//store ----------------------------

const createNewAgentStore = (token, body) => {
  // {{endpoint}}/api/store

  const header = getUserToken(token);

  return axios.post(urlConfig.baseURL + '/api/store/', body, header);
};

const getAgentStoreById = (storeId, token) => {
  // {{endpoint}}/

  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + '/api/store/' + storeId, header);
};

const getStoreByAgent = (custId, token, page) => {
  // {{endpoint}}/api/store/page-query/CUST-ID?pageNumber=1&pageSize=1&sortBy=name&order=asc

  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL + `/api/store/page-query/agent/${custId}/${page}`,
    header,
  );
};

const updateAgentStore = (storeId, token, body) => {
  // {{endpoint}}/

  const header = getUserToken(token);

  return axios.put(urlConfig.baseURL + '/api/store/' + storeId, body, header);
};

const deleteAgentStore = (storeId, token) => {
  // {{endpoint}}/api/store

  const header = getUserToken(token);

  return axios.delete(urlConfig.baseURL + '/api/store/' + storeId, header);
};

export {

  getAgentProfile,
  getAgentStaffList,
  getAgentStoreById,
  getStoreByAgent,
  createNewAgentStore,
  updateAgentStore,
  deleteAgentStore,
  getAgentById,
  UpdateAgentProfile


    
}