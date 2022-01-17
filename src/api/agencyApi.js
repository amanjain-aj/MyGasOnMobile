import axios from 'axios';
import urlConfig from './config.json';

const getUserToken = token => {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
     
    },
  };
};

const getAgencyProfile = (userId, token) => {
  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + '/api/profile/agency/' + userId, header);
};

const GetAgencyById = (userId, token) => {
  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + '/api/agency/' + userId, header);
};

const UpdateAgencyProfile = (userId, token, body) => {
  const header = getUserToken(token);

  return axios.put(urlConfig.baseURL + '/api/agency/' + userId, body, header);
};

// GODOWN CRUD-------------------------------------------------------------------------

const CreateGodown = (token, body) => {
  const header = getUserToken(token);

  return axios.post(urlConfig.baseURL + '/api/godown/', body, header);
};
const GetAllGodownByAgency = (token, userId, page, size) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL + `/api/godown/page-query/${userId}/${page}`,
    header,
  );
};
const GetGowDownById = (godownId, token) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL + '/api/godown/' + godownId,

    header,
  );
};

const UpdateGodown = (godownId, token, body) => {
  const header = getUserToken(token);

  return axios.put(urlConfig.baseURL + '/api/godown/' + godownId, body, header);
};
const DeleteGodown = (godownId, token) => {
  const header = getUserToken(token);

  return axios.delete(
    urlConfig.baseURL + '/api/godown/' + godownId,

    header,
  );
};

// Delivery Slot CRUD-------------------------------------------------------------------------

const CreateDeliverySlot = (token, body) => {
  const header = getUserToken(token);

  return axios.post(urlConfig.baseURL + '/api/deliveryslot/', body, header);
};
const GetAllDeliverySlotByAgency = (token, userId, page, size) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL +
      `/api/deliveryslot/page-query/
      ${userId}/${page}`,
    header,
  );
};
const UpdateDeliverySlot = (slotId, token, body) => {
  const header = getUserToken(token);

  return axios.put(
    urlConfig.baseURL + '/api/deliveryslot/' + slotId,
    body,
    header,
  );
};
const GetDeliverySLotById = (slotId, token) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL + '/api/deliveryslot/' + slotId,

    header,
  );
};

const DeleteDeliverySlot = (slotId, token) => {
  const header = getUserToken(token);

  return axios.delete(
    urlConfig.baseURL + '/api/deliveryslot/' + slotId,

    header,
  );
};
// Vehicle Slot CRUD-------------------------------------------------------------------------

const CreateVehicle = (token, body) => {
  const header = getUserToken(token);

  return axios.post(urlConfig.baseURL + '/api/vehicle/', body, header);
};
const GetAllVehicleByAgency = (token, userId, page, size) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL +
      `/api/vehicle/page-query/
      ${userId}/${page}`,
    header,
  );
};
const UpdateVehicle = (vehicleId, token, body) => {
  const header = getUserToken(token);

  return axios.put(
    urlConfig.baseURL + '/api/vehicle/' + vehicleId,
    body,
    header,
  );
};
const GetVehicleById = (vehicleId, token) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL + '/api/vehicle/' + vehicleId,

    header,
  );
};

const GetAllCustomerByAgency = (token, agnId, page) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL +
      `/api/customer/page-query/
      ${agnId}/${page}`,
    header,
  );
};

const GetAllChannelPartnerrByAgency = (token, agnId, page) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL +
      `/api/channelpartner/page-query/
      ${agnId}/${page}`,
    header,
  );
};

const GetAllAgentsByAgency = (token, agnId, page) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL +
      `/api/agent/page-query/
      ${agnId}/${page}`,
    header,
  );
};

const DeleteVehicle = (vehicleId, token) => {
  const header = getUserToken(token);

  return axios.delete(
    urlConfig.baseURL + '/api/vehicle/' + vehicleId,

    header,
  );
};

//Contract Customer ------------------------------------------------

const  GetAllCustomerContract = ( userId, token) => {
  const header = getUserToken(token);

  // const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/itemprice/contract/page-query/customer/'+userId+'/1',header);

};


const  GetAllCustomerByAgencyContract = ( userId,agnId, token) => {
  const header = getUserToken(token);

  // const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/itemprice/contract/page-query/agency/'+agnId+'/customer/'+userId+'/1',header);

};

const AddContractForCustomer = (token,body) => {
  const header = getUserToken(token);

  // const header = getUserToken(token);
    return axios.post(urlConfig.baseURL + '/api/itemprice/contract',body,header);

};

const UpdateContractForCustomer = (token,body,id) => {
  const header = getUserToken(token);

  // const header = getUserToken(token);
    return axios.put(urlConfig.baseURL + '/api/itemprice/contract/'+id,body,header);

};

const GetContractByID = (token,id) => {
  const header = getUserToken(token);

  // const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/itemprice/contract/'+id,header);

};

 
const AddContractForAgent = (token,body) => {
  const header = getUserToken(token);

  // const header = getUserToken(token);
    return axios.post(urlConfig.baseURL + '/api/itemprice/agent',body,header);

};

 
const UpdateContractForAgent = (token,body,id) => {
  const header = getUserToken(token);

  // const header = getUserToken(token);
    return axios.put(urlConfig.baseURL + '/api/itemprice/agent/'+id,body,header);

};

const GetContractByIDAgent = (token,id) => {
  const header = getUserToken(token);

  // const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/itemprice/agent/'+id,header);

};



const GetAllAgentContract = (token, agnId, page) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL + `/api/itemprice/agent/page-query/${agnId}/${page}`,
    header,
  );
};

 
const AddContractForChannelPartner = (token,body) => {
  const header = getUserToken(token);

  // const header = getUserToken(token);
    return axios.post(urlConfig.baseURL + '/api/itemprice/channelpartner',body,header);

};

 
const UpdateContractForChannelPartner = (token,body,id) => {
  const header = getUserToken(token);

  // const header = getUserToken(token);
    return axios.put(urlConfig.baseURL + '/api/itemprice/channelpartner/'+id,body,header);

};

const GetContractByIDChannelPartner = (token,id) => {
  const header = getUserToken(token);

  // const header = getUserToken(token);
    return axios.get(urlConfig.baseURL + '/api/itemprice/channelpartner/'+id,header);

};


const GetAllChannelPartnerContract = (token, agnId, page) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL +
      `/api/itemprice/channelpartner/page-query/${agnId}/${page}`,
    header,
  );
};



//Item Curd ---------------------------------------------------------------------

const getItems = token => {
  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + '/api/item/page-query/1', header);
};

const CreateItem = (token, body) => {
  const header = getUserToken(token);

  return axios.post(urlConfig.baseURL + '/api/itemprice/', body, header);
};
const GetItemListing = (token, agnId, page) => {
  const header = getUserToken(token);

  console.log(token, agnId)

  return axios.get(
    urlConfig.baseURL +
      `/api/itemprice/page-query/${agnId}/
      ${page}`,
    header,
  );
};
const UpdateItem = (itemId, token, body) => {
  const header = getUserToken(token);

  return axios.put(urlConfig.baseURL + '/api/itemprice/' + itemId, body, header);
};
const GetItemById = (id, token) => {
  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + '/api/itemprice/' + id, header);
};

const DeleteItem = (itemId, token) => {
  const header = getUserToken(token);

  return axios.delete(
    urlConfig.baseURL + '/api/itemprice/' + itemId,

    header,
  );
};

// Staff Listing CRUD ---------------------------------------------------------------------------------

const getStaffListByAgency = (token, page, size, agnId) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.baseURL + '/api/user?page=' + page + '&size=10&agencyId=' + agnId,
    header,
  );
};

//Bank Info CRUD 

const updateBankInfo = (body,token,id) => {
  const header = getUserToken(token);
  return axios.put(urlConfig.baseURL + '/api/bankinfo/'+id, body, header);
}

const createBankInfo = (body,token) => {
  const header = getUserToken(token);
  return axios.post(urlConfig.baseURL + '/api/bankinfo', body, header);
}

const getBankInfo = (userId,token) => {
  const header = getUserToken(token);
  return axios.get(urlConfig.baseURL + '/api/bankinfo/agency/'+userId,header);
}

const CreateCustomerPaymentmapping = (body,token) => {
  const header = getUserToken(token);
  return axios.post(urlConfig.baseURL + '/api/agency/payment',body,header);
}


const UpdateCustomerPaymentmapping = (paymentId,body,token) => {
  const header = getUserToken(token);
  return axios.put(urlConfig.baseURL + '/api/agency/payment/'+paymentId,body,header);
}


const GetCustomerPaymentmapping = (agnId,custId,token) => {
  const header = getUserToken(token);
  return axios.get(urlConfig.baseURL + `/api/agency/payment/${agnId}/customer/${custId}`,header);
}


export {
  getAgencyProfile,
  CreateGodown,
  GetAllGodownByAgency,
  UpdateGodown,
  GetGowDownById,
  DeleteGodown,
  CreateDeliverySlot,
  DeleteDeliverySlot,
  GetAllDeliverySlotByAgency,
  UpdateDeliverySlot,
  GetDeliverySLotById,
  CreateVehicle,
  UpdateVehicle,
  DeleteVehicle,
  GetAllVehicleByAgency,
  GetVehicleById,
  GetAllCustomerByAgency,
  getStaffListByAgency,
  GetItemListing,
  CreateItem,
  UpdateItem,
  DeleteItem,
  GetAllChannelPartnerrByAgency,
  GetAllAgentsByAgency,
  GetAllCustomerContract,
  GetAllAgentContract,
  GetAllChannelPartnerContract,
  GetAgencyById,
  UpdateAgencyProfile,
  createBankInfo,
  getBankInfo,
  GetItemById,
  getItems,
  AddContractForCustomer,
  AddContractForAgent,
  GetContractByID,
  UpdateContractForAgent,
  UpdateContractForCustomer,
  GetContractByIDAgent,
  AddContractForChannelPartner,
  UpdateContractForChannelPartner,
  GetContractByIDChannelPartner,
  updateBankInfo,
  GetCustomerPaymentmapping,
  UpdateCustomerPaymentmapping,
  CreateCustomerPaymentmapping,
  GetAllCustomerByAgencyContract
  

  
};
