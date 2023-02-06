import {
  IonButton,
  IonModal,
  IonButtons,
  IonBackButton,
  IonContent,
  IonHeader,
  IonInput,
  IonTextarea,
  IonItem,
  IonLabel,
  IonPage,
  IonRouterLink,
  IonToolbar,
  IonSpinner,
  IonToast,
  IonSelectOption,
  IonSelect,
  IonSearchbar,
  IonLoading,
} from '@ionic/react';
import { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

/* User */
import { useCurrentUser, useDispatchCurrentUser } from '../context/AuthContext';
import { callApi } from '../utils/utils';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import NavigationAccordion from '../ui/Navigation/NavigationAccordion';
import Footer from '../ui/Footer/Footer';
import DropdownGameAddUser from '../ui/Dropdown/DropdownGameAddUser';

import TypeUserModalUser from '../ui/User/TypeUserModalUser';

/* Search */
import Select from 'react-select';

/* Design */
import { ExclamationIcon } from '@heroicons/react/outline';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserId, editUser, addGame, removeGame, addCharacter, removeCharacter, addTypeuser, removeTypeuser} from '../redux/actions/coreActions';

const Account = () => {
  const user = useCurrentUser();
  const { id } = user;
  const dispatch = useDispatch();

  const loggedInUser = useSelector(state => state.user);
  const games = useSelector((state) => state.allData.games);
  const characters = useSelector((state) => state.allData.characters);
  const typeusers = useSelector((state) => state.allData.typeUsers);

  const [showTypeUserModalUser, setShowTypeUserModalUser] = useState(false);
  
  const {username, gamertag, email, first_name, last_name, introduction, tagline, type_user} = loggedInUser;

  const [formValues, setFormValues] = useState({
    username: loggedInUser?.username || "",
    gamertag: loggedInUser?.gamertag || "",
    email: loggedInUser?.email || "",
    first_name: loggedInUser?.first_name || "",
    last_name: loggedInUser?.last_name || "",
    introduction: "",
    tagline: "",
    games: loggedInUser?.games || [],
    type_user: loggedInUser?.type_user || [],
    characters: loggedInUser?.characters || [],
  })


  useEffect(() => {
    setFormValues({...formValues, username, gamertag, email, first_name, last_name, introduction, tagline, games, type_user, characters})

  }, [loggedInUser])

  const onChange = e => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  useEffect(() => {

    dispatch(fetchUserId(id));
    if(loggedInUser.id === undefined) {
      dispatch(fetchUserId(id));
    }

  }, []);
  

  const [showToast1, setShowToast1] = useState(false);
  const dispatchUser = useDispatchCurrentUser();
  
  const history = useHistory();

  const [gameId, setGameId] = useState(null);
  const [typeUserId, setTypeUserId] = useState({});
  const [characterId, setCharacterId] = useState({});
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);

const handleEditSubmit = async (event) => {
    event.preventDefault()
   
    const formData = new FormData();
    formData.append('data', JSON.stringify({
      gamertag: formValues.gamertag,
      username: formValues.username.split(' ').join(''),
      email: formValues.email,
      introduction: formValues.introduction,
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      tagline: formValues.tagline,
    }));
    const body = {
      gamertag: formValues.gamertag,
      username: formValues.username.split(' ').join(''),
      email: formValues.email,
      introduction: formValues.introduction,
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      tagline: formValues.tagline,
    }
    
    //formData.append('files.image_profile', file)

    dispatch(editUser(body, id, user));
    dispatch(fetchUserId(id));
    setShowToast1(true)

}

  /* Add game to user game list */
  const handleAddGame = async (event) => {
    //event.preventDefault()
    dispatch(addGame(id, loggedInUser, games, gameId))
  }

  /* Remove game to user game list */
  const handleRemoveGame = async (event, removeId) => {
    event.preventDefault()
    dispatch(removeGame(id, loggedInUser, removeId))
  }


  /* Add character to user character list */
  const handleAddCharacter = async (event) => {
    //event.preventDefault()
    dispatch(addCharacter(id, loggedInUser, characters, characterId))
  }

  /* Remove character to user character list */
  const handleRemoveCharacter = async (event, removeId) => {
    event.preventDefault()
    dispatch(removeCharacter(id, loggedInUser, removeId))
  }

  /* Add type to user type list */
  const handleAddTypeUser = async (event) => {
    //event.preventDefault()
    dispatch(addTypeuser(id, loggedInUser, typeusers, typeUserId))
  }

  /* Remove type to user type list */
  const handleRemoveTypeUser = async (event, removeId) => {
    event.preventDefault()
    dispatch(removeTypeuser(id, loggedInUser, removeId))
  }

  /* Sign out */
  const handleLogout = async () => {
    localStorage.removeItem('token');
    setShowModal(false)
    await callApi({ path: '/logout', method: 'POST' });
    dispatchUser({ type: 'LOGOUT' });
    
    history.push('/');
  };


  /* useEffect(() => {
    if(user.id !== loggedInUser.id) {
      dispatch(fetchUserId(id));
    }

  }, []); */

  return (
    <IonPage>
      <IonHeader>
        <title>Account - {loggedInUser.username}</title>
        <IonToolbar className="">
            <IonRouterLink 
              routerLink="/" 
              className="flex pl-4 xs:hidden sm:hidden md:block lg:block xl:block"
            >
              <Hexagon/>
            </IonRouterLink>
            <IonButtons 
              slot="start"
              className='xs:block sm:block md:hidden lg:hidden xl:hidden'
            >
              <IonBackButton />
            </IonButtons>
            <IonButtons slot="end">
              <NavButtons/>
            </IonButtons>
          </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="">
        <div className="max-width">

          <div className="mt-8 mx-8">
            <h1>{loggedInUser.gamertag}</h1>
            <Link to={`/user/${loggedInUser.username}`}>
              <button className="bg-primary sm-mt-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                View {loggedInUser.gamertag}'s profile
              </button>
            </Link>
          </div>

          <main className="relative mt-8">
            <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
            <NavigationAccordion
                header="Menu"
                link_01="account"
                link_01_title="Overall"
                style_01="bg-primary"

                link_02="account-media"
                link_02_title="Media"
                style_02="hover:bg-primary"

                link_03="account-social"
                link_03_title="Social"
                style_03="hover:bg-primary"

                link_04="account-streams"
                link_04_title="Streams"
                style_04="hover:bg-primary"

                link_05="account-settings"
                link_05_title="Settings"
                style_05="hover:bg-primary"
              />

              <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
                <div className="divide-y divide-gray-200 lg:grid lg:divide-y-0 lg:divide-x">
                  {/* Form */}
                  <form
                    className="divide-y divide-gray-200 lg:col-span-9"
                    onSubmit={(e)=>handleEditSubmit(e)}
                  >
                    {/* Section 1 */}
                    <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Title */}
                      <section className="lg:col-start-1 w-full">
                        <div className="px-4 py-5">
                          <h4>Basic information</h4>
                        </div>
                      </section>

                      {/* Content */}
                      <section className="col-span-2">
                        <div className="px-4 py-5">
                          <IonItem className="mb-4 rounded-lg">
                            <IonLabel position="stacked">Gamertag</IonLabel>
                            <IonInput
                              value={formValues.gamertag}
                              name="gamertag"
                              onIonChange={onChange}
                              placeholder="Gamertag"
                            ></IonInput>
                          </IonItem>

                          <IonItem className="mb-4 rounded-lg">
                            <IonLabel position="stacked">Username</IonLabel>
                            <IonInput
                              value={formValues.username}
                              name="username"
                              onIonChange={onChange}
                              placeholder="Username"
                            ></IonInput>
                          </IonItem>

                          <IonItem className="mb-4 rounded-lg">
                            <IonLabel position="stacked">First name</IonLabel>
                            <IonInput
                              value={formValues.first_name}
                              name="first_name"
                              onIonChange={onChange}
                              placeholder="First name"
                            ></IonInput>
                          </IonItem>

                          <IonItem className="mb-4 rounded-lg">
                            <IonLabel position="stacked">Last name</IonLabel>
                            <IonInput
                              value={formValues.last_name}
                              name="last_name"
                              onIonChange={onChange}
                              placeholder="Last name"
                            ></IonInput>
                          </IonItem>

                          <IonItem className="mb-4 rounded-lg">
                            <IonLabel position="stacked">Email</IonLabel>
                            <IonInput
                              value={formValues.email}
                              name="email"
                              onIonChange={onChange}
                              placeholder="Email address"
                            ></IonInput>
                          </IonItem>

                          <IonItem className="mb-4 rounded-lg">
                            <IonLabel position="stacked">Tagline</IonLabel>
                            <IonInput
                              value={formValues.tagline}
                              name="tagline"
                              onIonChange={onChange}
                              placeholder="Express yourself"
                            ></IonInput>
                          </IonItem>
                        </div>
                      </section>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Title */}
                      <section className="lg:col-start-1 w-full">
                        <div className="px-4 py-5">
                          <h4>Introduction</h4>
                        </div>
                      </section>

                      {/* Content */}
                      <section className="col-span-2">
                        <div className="px-4 py-5 w-full">
                          <IonItem className="rounded-lg">
                            <div className="py-4 w-full">
                              <IonLabel
                                for="about"
                                className=" block text-sm font-medium text-gray-700"
                              >
                                Introduction
                              </IonLabel>
                              <p className="mt-2 text-sm text-gray-500">
                                Brief description for your profile. URLs are hyperlinked.
                              </p>
                              <div className="mt-2">
                                <IonTextarea
                                  id="introduction"
                                  rows="3"
                                  value={formValues.introduction}
                                  name="introduction"
                                  onIonChange={onChange}
                                  className="shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                ></IonTextarea>
                              </div>
                            </div>
                          </IonItem>
                        </div>
                      </section>
                    </div>

                    {/* Section 4 */}
                    <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      
                      <section className="lg:col-start-1 w-full">
                        <div className="px-4 py-5">
                          <h4>My user types</h4>
                        </div>
                      </section>

                     
                      <section className="col-span-2">
                        <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2">

                         {/* <button
                            className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                            
                            onClick={() => {
                              setShowTypeUserModalUser(true);
                            }}
                          >
                            Edit
                          </button> */}

                          {/* <TypeUserModalUser
                            showTypeUserModalUser={showTypeUserModalUser}
                            setShowTypeUserModalUser={setShowTypeUserModalUser}
                            setTypeUserId={setTypeUserId}
                            typeusers={typeusers}
                            error={error}
                          /> */}


                          <div className="px-4 py-5 w-full">

                            <div className="grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 bg-white p-2 md:grid-cols-2">
                              <Select
                              className="lg:mb-2 xl:mb-2"
                                getOptionLabel={option => `${option.name}`}
                                getOptionValue={option => option.id}
                                options={typeusers}
                                instanceId="types"
                                placeholder="filter by types"
                                isClearable
                                onChange={value => setTypeUserId(value ? value.id : null)}
                              />
                              <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => {
                                  handleAddTypeUser();
                                  //setShowToast1(true);
                                }}
                              >
                                {error && <p>{error}</p>}
                                Add type
                              </button>
                            </div>

                          </div>

                          
                          <div className="px-4 py-5 w-full">
                            {type_user?.map(type => (
                              <div className="grid grid-cols-2 bg-white p-2 mb-2">
                                <p>{type.name}</p>
                                <div
                                  className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                  
                                  onClick={(event) => {
                                    handleRemoveTypeUser(event, type.id);                                   
                                  }}
                                >
                                  Remove
                                </div>
                              </div>  
                            ))}    
                          </div>
                        

                        </div>
                      </section>
                    </div>

                    {/* Section 3 */}
                    <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                 
                      <section className="lg:col-start-1 w-full">
                        <div className="px-4 py-5">
                          <h4>My competitive games</h4>
                        </div>
                      </section>

                      <section className="col-span-2">
                        <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2">
                          <div className="px-4 py-5 w-full">

                            <div className="grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 bg-white p-2 md:grid-cols-2">
                              <Select
                              className="lg:mb-2 xl:mb-2"
                                getOptionLabel={option => `${option.name}`}
                                getOptionValue={option => option.id}
                                options={games}
                                instanceId="games"
                                placeholder="filter by games"
                                isClearable
                                onChange={value => setGameId(value ? value.id : null)}
                              />
                              <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => {
                                  handleAddGame();
                                  setShowToast1(true);
                                }}
                              >
                                {error && <p>{error}</p>}
                                Add game
                              </button>
                            </div>

                          </div>

                          <div className="px-4 py-5 w-full">
                            {loggedInUser.games?.map(game => (
                              <div className="grid grid-cols-2 bg-white p-2 mb-2">
                                <p>{game.name}</p>
                                <div
                                  className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                  
                                  onClick={(event) => {
                                    handleRemoveGame(event, game.id);
                                    //setShowToast1(true);
                                  }}
                                >
                                  Remove
                                </div>
                              </div>
                              
                            ))}
                            
                          </div>

                        </div>
                      </section>
                    </div>

                    {/* Section 4 */}
                    <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      
                      <section className="lg:col-start-1 w-full">
                        <div className="px-4 py-5">
                          <h4>My competitive characters</h4>
                        </div>
                      </section>

                      
                      <section className="col-span-2">
                        <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2">
                          <div className="px-4 py-5 w-full">

                            <div className="grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 bg-white p-2 md:grid-cols-2">
                              <Select
                              className="lg:mb-2 xl:mb-2"
                                getOptionLabel={option => `${option.name} / ${option.games?.map(game => (game.name))}`}
                                getOptionValue={option => option.id}
                                options={characters}
                                instanceId="character"
                                placeholder="Filter by characters"
                                isClearable
                                onChange={value => setCharacterId(value ? value.id : null)}
                              />
                              <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => {
                                  handleAddCharacter();
                                  //setShowToast1(true);
                                }}
                              >
                                {error && <p>{error}</p>}
                                Add character
                              </button>
                            </div>

                          </div>

                          <div className="px-4 py-5 w-full">
                            {loggedInUser.characters?.map(character => (
                              <div className="grid grid-cols-2 bg-white p-2 mb-2">
                                <p>{character.name} / {character.games?.map(game => (game.name))}</p>
                                <div
                                  className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                  
                                  onClick={(event) => {
                                    handleRemoveCharacter(event, character.id);
                                    //setShowToast1(true);
                                  }}
                                >
                                  Remove
                                </div>
                              </div>
                              
                            ))}
                            
                          </div>

                        </div>
                      </section>
                    </div>

                    {/* <!-- Privacy section --> */}
                    <div className="pt-6 divide-y divide-gray-200">
                      <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                        {/* <button
                          type="button"
                          className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                        >
                          Cancel
                        </button> */}
                        <button
                          type="submit"
                          className="ml-5 bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                          onClick={() => setShowToast1(true)} expand="block"
                        >
                          Save
                        </button>
                        <IonToast
                          isOpen={showToast1}
                          onDidDismiss={() => setShowToast1(false)}
                          message="Your settings have been saved."
                          duration={1000}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="">

                {/* IonModal */}

                <IonModal
                  isOpen={showModal}
                  swipeToClose={true}
                  onDidDismiss={() => setShowModal(false)}>

                  <div className="sm:items-start m-8">
                    <div className="sm:flex">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center mt-2 h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left mb-4 w-full">
                      <h3>Account sign out</h3>
                      <div className="mb-8">
                        
                        <p>If you would like to sign out please use the button below</p>
                        
                      </div>
                      <button
                        className="w-full px-3 py-4 font-medium text-white bg-blue-600 rounded-lg"
                        onClick={handleLogout}
                      >
                        Sign out
                      </button>
                      
                    </div>
                    </div>
                  </div>

                  
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <IonToast
                      isOpen={showToast1}
                      onDidDismiss={() => setShowToast1(false)}
                      message={`Your account ${user.username} has been updated`}
                      duration={1000}
                    />
                  </div>
                    
                  <IonButton onClick={() => {setShowModal(false)}}>Close Modal</IonButton>
                </IonModal>

                <button
                  className="w-full px-3 py-4 font-medium text-white bg-blue-600 rounded-lg"
                  onClick={() => setShowModal(true)}
                >
                  Sign out
                </button>
              </div>
            </div>
          </main>
          </div>

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Account;
