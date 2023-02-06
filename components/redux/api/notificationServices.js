import http from './http-common';

const fetchNotifications = () => {
  return http.get('/notifications?populate=*');
};

const notifiationDelete = id => {
  return http.delete(`/notifications/${id}`);
};

const createNotificationTeamMemberRequest = data => {
  return http.post(`/notifications`, data);
};

const notificationTeamMemberApprove = (data) => {
  return http.post(`/notifications`, data);
};

const createNotificationOrganisationMemberRequest = data => {
  return http.post(`/notifications`, data);
};

const notificationOrganisationMemberApprove = data => {
  return http.post(`/notifications`, data);
};
const createNotificationOrganisationTeamRequest = data => {
  return http.post(`/notifications`, data);
};
const notificationOrganisationTeamApprove = data => {
  return http.post(`/notifications`, data);
};
const createNotificationOrganisationCommunityRequest = data => {
  return http.post(`/notifications`, data);
};
const notificationOrganisationCommunityApprove = data => {
  return http.post(`/notifications`, data);
};

const createNotificationCommunityMemberRequest = data => {
  return http.post(`/notifications`, data);
};

const notificationCommunityMemberApprove = data => {
  return http.post(`/notifications`, data);
};

const createNotificationCommunityTeamRequest = data => {
  return http.post(`/notifications`, data);
};
const notificationCommunityTeamApprove = data => {
  return http.post(`/notifications`, data);
};

const notificationRead = (data, id) => {
  return http.put(`/notifications/${id}`, data);
};


const notificationServices = {
  fetchNotifications,
  notifiationDelete,
  createNotificationTeamMemberRequest,
  notificationTeamMemberApprove,
  createNotificationOrganisationMemberRequest,
  notificationOrganisationMemberApprove,
  createNotificationOrganisationTeamRequest,
  notificationOrganisationTeamApprove,
  createNotificationOrganisationCommunityRequest,
  notificationOrganisationCommunityApprove,
  createNotificationCommunityMemberRequest,
  notificationCommunityMemberApprove,
  createNotificationCommunityTeamRequest,
  notificationCommunityTeamApprove,
  notificationRead,
};

export default notificationServices;
