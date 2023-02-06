import http from './http-common';

const fetchCharacters = () => {

  return http.get('/achievements?populate=*');

};

const fetchCharacter = id => {
  return http.get(`/characters/${id}?populate=*`);
};


const characterServices = {
  fetchCharacters,
  fetchCharacter
};

export default characterServices;
