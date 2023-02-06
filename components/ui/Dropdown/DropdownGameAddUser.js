import { IonButton, IonCardContent, IonItem, IonLabel, IonModal, IonSelect, IonSelectOption, IonToast } from '@ionic/react';

import { Fragment, useRef, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import Gravatar from 'react-gravatar';
import Axios from 'axios';

import { callApi } from '../../utils/utils';

const DropdownGameAddUser = ({  userId, users, games, username, image_profile, email, gamertag, team, user }) => {


  const [showModal, setShowModal] = useState(false);
  const [clickedUser, setClickedUser] = useState('');
  const [game, setGame] = useState('');
  const [teamData, setTeamData] = useState({});
  const [error, setError] = useState('');
  const [showToast1, setShowToast1] = useState(false);
  const [id, setUserGame] = useState("");

  useEffect(() => {
    Axios.get(`https://hivefolio.herokuapp.com/api/users/${userId}?populate=*`)
      .then(data => {
        setTeamData(data.data.games);
      })
      .catch(err => {
        console.log('ERR: ', err);
      });
  }, []);
  console.log("id++__", id)

/* Add user to member list */
  const handleAddUser = async id => {
    event.preventDefault();

    if (game === user.games) {
      setError('Please sign in first');
      return;
    }

    /* console.log('id', id);
    console.log('User', users);
    console.log('Before issue', teamData); */

    // first get the user object from users prop
    const newUser = games.find(x => x.id == id);

    if (newUser) {
      // add it to members
      teamData.push(newUser.id);

      /* console.log('*****', teamData); */

      let newMember = {
        members: teamData,
      };

      var config = {
        method: 'PUT',
        /* url: callApi({ path: `/teams/${userId}`}), */
        url: `https://hivefolio.herokuapp.com/api/users/${userId}`,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: newMember,
      };
      Axios(config)
        .then(response => {
          console.log('RESP: ', response.data);
        })
        .catch(err => {
          console.log('ERR: ', err.response.data);
        });
    }
    window.location.reload();
  };

  return (
    <IonCardContent className="flex flex-row flex-wrap w-full">
      <div className="px-4 py-5 w-full">
      <IonItem>
        <IonLabel>Select</IonLabel>
        <IonSelect>
        
        {
          games.map(game => (
            <IonSelectOption 
            onClick={() => {
              handleAddUser(id);
            }}
            onIonChange={event => setUserGame(event.target.value)}
            >
              {game.name}</IonSelectOption>
        ))}
        {/* <button
          onClick={handleAddUser(id)}
          className="inline-flex items-center justify-center h-12  
              px-6 font-medium tracking-wide transition 
              duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
              focus:shadow-outline focus:outline-none"
          >
          Add games
        </button> */}
        </IonSelect>
      </IonItem>
      </div>
    </IonCardContent>
  );
};

export default DropdownGameAddUser;
