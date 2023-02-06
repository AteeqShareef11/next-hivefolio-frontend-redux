import http from './http-common';

const fetchTypenotifications = () => {
  return http.get('/typenotifications');
};

const typeNotificationServices = {
  fetchTypenotifications,
};

export default typeNotificationServices;
