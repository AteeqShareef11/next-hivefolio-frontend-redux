import http from './http-common';

const fetchTypeusers = () => {
  return http.get('/typeusers');
};

const typeUserServices = {
  fetchTypeusers,
};

export default typeUserServices;
