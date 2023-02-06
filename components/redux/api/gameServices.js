
import http from './http-common';

const fetchGames = () => {
  return http.get('/games?populate=*');
};

const fetchGame = () => {
  return http.get(`/games/${id}?populate=*`);
};

const gameServices = {
  fetchGames,
  fetchGame,
};

export default gameServices;

