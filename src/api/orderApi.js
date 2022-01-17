import axios from 'axios';
import urlConfig from './config.json';

const getUserToken = token => {

    return {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
};

const getAllCustomersByAgency=(userId,token) => {
    const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/customer/page-query/'+userId+'/1',header);
}

const getAllAgentsByAgency = (userId,token) => {
    const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/agent/page-query/'+userId+'/1',header);
}

const getAllChannelPartnersByAgency = (userId,token) => {
    const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/channelpartner/page-query/'+userId+'/1',header);
}


const getAllContractsCustomer = (userId,token) => {

    const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/itemprice/contract/page-query/customer/'+userId+'/1',header);

}
const getAllContractsAgent = (userId,token) => {

    const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/itemprice/agent/page-query/'+userId+'/1',header);

}
const getAllContractsChannelpartner = (userId,token) => {

    const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/itemprice/channelpartner/page-query/'+userId+'/1',header);

}

const getHolidaysByAgency = (userId,token) => {

    const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/holiday/page-query/'+userId+'/1',header);
}

const getDeliverySlotsByAgency = (userId,token) => {

    console.log(token)
    const header = getUserToken(token);
 
    return axios.get(urlConfig.baseURL + '/api/deliveryslot/page-query/'+userId+'/1',header);
}

const getStoreAddressByCustomer = (userId,token) => {

    const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/store/page-query/customer/'+userId+'/1',header);
}
const getStoreAddressByAgent = (userId,token) => {

    const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/store/page-query/agent/'+userId+'/1',header);
}
const getStoreAddressByChannelPartner = (userId,token) => {

    const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/store/page-query/channelpartner/'+userId+'/1',header);
}
const getGodownAddressByAgency = (userId,token) => {
    const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/godown/page-query/'+userId+'/1',header);
}

const getPaymentInfoByAgency = (userId,token) => {
    const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/bankinfo/agency/'+userId,header);
}

const createOrder = (body,token) => {
    const header = getUserToken(token);
    return axios.post(urlConfig.baseURL + '/api/order/',body,header);
} 

const getOrderById = (orderId,token) => {
    const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/order/'+orderId,header);
}

const listOrder = (token,body) => {
    const header = getUserToken(token);
    return axios.post(urlConfig.baseURL + '/api/order/filter',body,header);
}


const updateOrder =(body,token,orderId) => {
    const header = getUserToken(token);
    return axios.put(urlConfig.baseURL + '/api/order/'+orderId,body,header);
}

const createImpersonateOrder = (body,token) => {
    const header = getUserToken(token);
    return axios.post(urlConfig.baseURL + '/api/order/',body,header);
} 

const createOrderWithPayment = (body,token) => {
    const header = getUserToken(token);
    return axios.post(urlConfig.baseURL + '/api/order/',body,header);
}


const getWorkingDays = (token,id) => {
    const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/agency/holiday/work/'+id,header);
}




export {
    getAllContractsCustomer,
    getHolidaysByAgency,
    getDeliverySlotsByAgency,
    getStoreAddressByCustomer,
    getGodownAddressByAgency,
    getPaymentInfoByAgency,
    createOrder,
    getOrderById,
    listOrder,
    updateOrder,
    getAllCustomersByAgency,
    getAllAgentsByAgency,
    getAllChannelPartnersByAgency,
    getStoreAddressByAgent,
    getStoreAddressByChannelPartner,
    getAllContractsAgent,
    getAllContractsChannelpartner,
    createImpersonateOrder,
    getWorkingDays
};
  