import axios from 'axios';
import {Platform} from 'react-native';

import urlConfig from './config.json';

const getUserToken = token => {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
      responseType: 'blob',
    },
  };
};

const UploadAvatar = async (token, fileName, photo) => {
  //   const header = getUserToken(token);

  var formData = new FormData();
  const data = {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  };

  formData.append('file', data);

  formData.append('username', fileName);

  return axios.post(urlConfig.digitalUrl + '/profile/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  });
};


const UploadLogo = async (token, fileName, photo) => {
  //   const header = getUserToken(token);

  var formData = new FormData();
  const data = {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  };

  formData.append('file', data);

  formData.append('resourceId', fileName);

  return axios.post(urlConfig.digitalUrl + '/profile/logo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  });
};


const UploadImage = async (token, fileName, photo) => {
  //   const header = getUserToken(token);

  var formData = new FormData();
  const data = {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  };

  formData.append('file', data);

  formData.append('resourceId', fileName);

  return axios.post(urlConfig.digitalUrl + '/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  });
};


const DownloadImage = (token, username) => {
  const header = getUserToken(token);

  return axios.get(
    urlConfig.digitalUrl + '/profile/' + username + '?height=140&width=140',
    header,
  );
};

export {UploadImage, DownloadImage,UploadAvatar,UploadLogo};
