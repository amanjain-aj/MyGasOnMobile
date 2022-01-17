import axios from 'axios';
import urlConfig from './config.json';

const getUserToken = token => {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
};

const getChannelPartnerProfile = (channelPartnerId, token) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL + '/api/profile/channelpartner/' + channelPartnerId,
    header,
  );
};

//Staff-----------------------------------------------------------------------------

const getCahnnelPartnerStaffList = (token, page, channelPartnerId) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL +
      '/api/user?page=' +
      page +
      '&size=10&channelPartnerId=' +
      channelPartnerId,
    header,
  );
};

//store ----------------------------

const createNewChannelPartnerStore = (token, body) => {
  // {{endpoint}}/api/store

  const header = getUserToken(token);

  return axios.post(urlConfig.baseURL + '/api/store/', body, header);
};

const getChannelPartnerStoreById = (storeId, token) => {
  // {{endpoint}}/

  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + '/api/store/' + storeId, header);
};

const getStoreByChannelPartner = (custId, token, page) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL +
      `/api/store/page-query/channelpartner/${custId}/${page}`,
    header,
  );
};

const updateChannelPartnerStore = (storeId, token, body) => {
  // {{endpoint}}/

  const header = getUserToken(token);

  return axios.put(urlConfig.baseURL + '/api/store/' + storeId, body, header);
};

const getChannelPartnerById = (cpId, token) => {
  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + '/api/channelpartner/' + cpId, header);
};

const deleteChannelPartnerStore = (storeId, token) => {
  // {{endpoint}}/api/store

  const header = getUserToken(token);

  return axios.delete(urlConfig.baseURL + '/api/store/' + storeId, header);
};

// const getChannelPartnerById = (custId, token) => {
//   const header = getUserToken(token);

//   return axios.get(urlConfig.baseURL + '/api/channelpartner/' + custId, header);
// };
const UpdateChannelPartnerProfile = (cpId,body, token) => {
  const header = getUserToken(token);

  return axios.put(
    urlConfig.baseURL + '/api/channelpartner/' + cpId,body,
    header,
  );
};

const UpdateAgentProfile = (custId, token, body) => {
  // {{endpoint}}/api/profile/customer/:custId

  const header = getUserToken(token);

  return axios.put(urlConfig.baseURL + '/api/agent/' + custId, body, header);
};

export {
  getChannelPartnerProfile,
  getCahnnelPartnerStaffList,
  createNewChannelPartnerStore,
  deleteChannelPartnerStore,
  updateChannelPartnerStore,
  getChannelPartnerStoreById,
  getStoreByChannelPartner,
  getChannelPartnerById,
  UpdateAgentProfile,
  UpdateChannelPartnerProfile
};
