import axios from 'axios';
import urlConfig from './config.json';

const getUserToken = token => {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
};

const getCustomerProfile = (custId, token) => {
  // {{endpoint}}/api/profile/customer/:custId

  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL + '/api/profile/customer/' + custId,
    header,
  );
};


const UpdateCustomerProfile = (custId, token,body) => {
  // {{endpoint}}/api/profile/customer/:custId

  const header = getUserToken(token);

  return axios.put(
    urlConfig.baseURL + '/api/customer/' + custId,body,
    header,
  );
};

const getCustomerById = (custId, token) => {

  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL + '/api/customer/' + custId,
    header,
  );
};
const createNewStore = (token, body) => {
  // {{endpoint}}/api/store

  const header = getUserToken(token);

  return axios.post(urlConfig.baseURL + '/api/store/', body, header);
};

const getStoreById = (storeId, token) => {
  // {{endpoint}}/

  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + '/api/store/' + storeId, header);
};

const deleteStore = (storeId, token) => {
  // {{endpoint}}/api/store

  const header = getUserToken(token);

  return axios.delete(urlConfig.baseURL + '/api/store/' + storeId, header);
};

const deleteAgency = (custId, token, agencyId) => {
  // {{endpoint}}/

  const header = getUserToken(token);

  return axios.delete(
    urlConfig.baseURL + '/api/customer/' + custId + '/agency/' + agencyId,
    header,
  );
};

const updateStoreByCustomer = (storeId, token, body) => {
  // {{endpoint}}/

  const header = getUserToken(token);

  return axios.put(urlConfig.baseURL + '/api/store/' + storeId, body, header);
};

const getStoreByCustomer = (custId, token, page) => {
  // {{endpoint}}/api/store/page-query/CUST-ID?pageNumber=1&pageSize=1&sortBy=name&order=asc

  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL + `/api/store/page-query/customer/${custId}/${page}`,
    header,
  );
};

const getStaffList = (token, page, size, custId) => {
  // {{endpoint}}/api/store

  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL +
      '/api/user?page=' +
      page +
      '&size=10&customerId=' +
      custId,
    header,
  );
};

const InviteStaff = (token, body) => {
  const header = getUserToken(token);

  return axios.post(urlConfig.baseURL + '/api/user/invite', body, header);
};

const DeleteStaff = (token, username) => {
  const header = getUserToken(token);

  return axios.delete(urlConfig.baseURL + '/api/user/'+username, header);
};

const GetAgenciesByOmcID = (token, omcId) => {
  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + '/api/agency/omcId/' + omcId, header);
};

const AddAgencyToCustomer = (token, custId, agnId) => {
  const header = getUserToken(token);

  return axios.post(
    urlConfig.baseURL + '/api/customer/' + custId + '/agency/',
    {agencyId: agnId},
    header,
  );
};

const getAgenciesByCustomer = (custId, token, page, size) => {
  //
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL + `/api/agency/page-query/${custId}/${page}`,
    header,
  );
};

export {
  getCustomerProfile,
  getStoreByCustomer,
  createNewStore,
  deleteStore,
  getStaffList,
  getAgenciesByCustomer,
  deleteAgency,
  getStoreById,
  updateStoreByCustomer,
  InviteStaff,
  GetAgenciesByOmcID,
  AddAgencyToCustomer,
  DeleteStaff,
  getCustomerById,
  UpdateCustomerProfile
};
