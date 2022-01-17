import axios from 'axios';
import urlConfig from './config.json';


const getUserToken = token => {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
};

const resgisterCustomer = (customerBody) => {
  // {{endpoint}}/api/register/customer
  return axios.post(urlConfig.baseURL + '/api/register/customer', customerBody);
};

const resgisterAgency = (agencyBody) => {
  // {{endpoint}}/api/register/agency
  return axios.post(urlConfig.baseURL + '/api/register/agency', agencyBody);
};

const loginUser = ( loginBody ) => {
  // {{endpoint}}/api/user/login
  return axios.post(urlConfig.baseURL + '/api/user/login', loginBody);
}

//Forgot password

const GetOtp = ( body ) => {
  // {{endpoint}}/api/user/login
  return axios.post(urlConfig.baseURL + '/api/user/otp/generate', body);
}


const VerifyOtp = ( body ) => {
  // {{endpoint}}/api/user/login
  return axios.post(urlConfig.baseURL + '/api/user/otp/verify', body);
}

const ResetPassword = ( body ) => {
  // {{endpoint}}/api/user/login
  return axios.post(urlConfig.baseURL + '/api/user/forgotpassword', body);
}
const ChangeToNewPassword = ( body,username,token ) => {
  // {{endpoint}}/api/user/changepassword
  const header = getUserToken(token);
  return axios.post(urlConfig.baseURL + '/api/user/'+username+'/changepassword', body,header);
}
const getConfig = (token) => {
  // {{endpoint}}/api/config
  const header = getUserToken(token);
  return axios.get(urlConfig.baseURL + '/api/config',header);
}

export {
  resgisterAgency as registerAgencyUser,
  resgisterCustomer as registerCustomerUser,
  loginUser as LoginUser,
  GetOtp,
  VerifyOtp,
  ResetPassword,
  getConfig,
  ChangeToNewPassword
};
