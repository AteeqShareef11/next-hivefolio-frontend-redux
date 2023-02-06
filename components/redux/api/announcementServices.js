import http from './http-common';

const fetchAnnouncements = () => {
  return http.get('/announcements?populate=*');
};

const announcementServices = {
  fetchAnnouncements,
};

export default announcementServices;
