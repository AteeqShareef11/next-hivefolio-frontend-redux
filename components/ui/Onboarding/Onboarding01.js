import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { 
    IonContent,
    IonInput, 
    IonItem, 
    IonLabel,
    IonLoading,
    IonToast, 
  } from '@ionic/react';

import { callApi } from "../../utils/utils";
import { useCurrentUser } from '../../context/AuthContext';

import FeatureSignedOut from '../../assets/images/FeatureSignedOut.png';
import HeaderProfileUserOnboarding from '../Header/HeaderProfileUserOnboarding';

/* Images */
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png';
import hexagon_background from '../../assets/images/hexagon_background.png';
import Gravatar from 'react-gravatar';

/* Search */
import Select from 'react-select';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoreData ,fetchUser, fetchUsers, fetchUserId, editUser, addTypeuser, removeTypeuser, addGame, removeGame, addCharacter, removeCharacter, addUserImage, onboardingUser, removeCoreData } from '../../redux/actions/coreActions';
//import { fetchUsers } from '../../redux/actions/userActions';

const Onboarding01 = ({ steps, setSelectedStep, page, setPage }) => {

    const dispatch = useDispatch();

    //const { username } = useParams();

    const user = useCurrentUser();
    

    const loggedInUser = useSelector(state => state.user);
    const users = useSelector((state) => state.allData.users);  
    const teams = useSelector((state) => state.allData.teams);
    const typeusers = useSelector((state) => state.allData.typeUsers.data);

    const games = useSelector((state) => state.allData.games);
    const characters = useSelector((state) => state.allData.characters.data);

    const [typeUserId, setTypeUserId] = useState({});
    const [gameId, setGameId] = useState(null);
    const [characterId, setCharacterId] = useState({});

    const selectedUser = Array.isArray(users) ? users?.find((person) => {
        return person.id === user.id;
    }) : []

    //console.log("selectedUser Onboarding01", selectedUser)

    const { id, username, gamertag, email } = user;


    const [showToastAddGame, setShowToastAddGame] = useState(false);
    const [showToastRemoveGame, setShowToastRemoveGame] = useState(false);
    const [showToastAddCharacter, setShowToastAddCharacter] = useState(false);
    const [showToastRemoveCharacter, setShowToastRemoveCharacter] = useState(false);
    const [showToastAddType, setShowToastAddType] = useState(false);
    const [showToastRemoveType, setShowToastRemoveType] = useState(false);
    const [showToastAddUser, setShowToastAddUser] = useState(false);
    const [showToastRemoveUser, setShowToastRemoveUser] = useState(false);
    const [showToastAddTeam, setShowToastAddTeam] = useState(false);
    const [showToastRemoveTeam, setShowToastRemoveTeam] = useState(false);
    const [showToastAddOrganisation, setShowToastAddOrganisation] = useState(false);
    const [showToastRemoveOrganisation, setShowToastRemoveOrganisation] = useState(false);
    const [showToastAddCommunity, setShowToastAddCommunity] = useState(false);
    const [showToastRemoveCommunity, setShowToastRemoveCommunity] = useState(false);
    const [showToastUploadImage, setShowToastUploadImage] = useState(false);
    const [showToastComplete, setShowToastComplete] = useState(false);


    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);

    const [showLoading, setShowLoading] = useState(false);
    const [showToast1, setShowToast1] = useState(false);

    const history = useHistory();
    const [error, setError] = useState('');

    /* Upload file funtion */
    const uploadImage = async file => {
        try {
        const formData = new FormData();
        formData.append('files', file)
        formData.append('fileInfo', JSON.stringify({"name":file.name}));
        const uploadRes = await fetch(`https://hivefolio.herokuapp.com/api/upload`,{
            method: 'POST',
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
            body: formData
        })
        if(!uploadRes.ok) {
            throw new Error('Could not upload file')
        }
        const jsonRes= await uploadRes.json();
        const imageId = jsonRes[0].id;
        const imageBackgroundId = jsonRes[0].id;
        return imageId, imageBackgroundId;
        }
        catch(e) {
            console.error('Could not upload image');
            throw(e);
        }
  }

  /* Username and gamertag */

const [formValues, setFormValues] = useState({
    username: user?.username || "",
    gamertag: user?. gametag || "",
});

useEffect(() => {
    setFormValues({...formValues, username, gamertag})

}, [user])

const onChange = e => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
}

/* Add User Image */
const handleAddUserImage = async (event) => {
    setShowLoading(true);
    
    let imageId = '';
    let imageBackgroundId = '';
    const request = {
    };

    try {
        if(file) {
            imageId = await uploadImage(file);
            request['image_profile'] =  imageId;   
            
        }
        if(file2) {
            imageBackgroundId = await uploadImage(file2);
            request['image_background'] =  imageBackgroundId;
        }

        dispatch(addUserImage(request, id));
        //console.log("handleAddUserImage data", data);
        setShowLoading(false);

        } catch (err) {
        setError(err);
        setShowLoading(false);
        }
    }

  
  /* Edit data */
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    setShowLoading(true);
    
    let imageId = '';
    let imageBackgroundId = '';
    const request = {
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify({
        gamertag: formValues.gamertag,
        username: formValues.username.split(' ').join(''),
    }));
    const body = {
        gamertag: formValues.gamertag,
        username: formValues.username.split(' ').join(''),
    }
    
    dispatch(editUser(body, id, loggedInUser, fetchUsers));
  
    try {
        if(file) {
            imageId = await uploadImage(file);
            request['image_profile'] =  imageId;   
            
        }
        if(file2) {
            imageBackgroundId = await uploadImage(file2);
            request['image_background'] =  imageBackgroundId;
        }

        dispatch(addUserImage(setShowLoading, request, id));
    
        const res = await fetch(`https://hivefolio.herokuapp.com/api/users/${id}?populate=*`,
        {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(request)
        })
        const data = await res.json()
        //fetchUser()
        console.log("handleEditSubmit data", data);
        //dispatch(fetchUserId(id));
        setShowLoading(false);
        /* setSignedInUser(response.data) */
        //window.location.reload();
    
        } catch (err) {
        setError(err);
        setShowLoading(false);
        }
    }

    

    /* const handleEditIntroductionSubmit = async (event) => {
        event.preventDefault()
       
        const formData = new FormData();
        formData.append('data', JSON.stringify({
          gamertag: formValues.gamertag,
          username: formValues.username.split(' ').join('').toLowerCase(),
        }));
        const body = {
          gamertag: formValues.gamertag,
          username: formValues.username.split(' ').join('').toLowerCase(),
        }
        
        //formData.append('files.image_profile', file)
    
        dispatch(editUser(body, id, user))
    
    } */

    console.log("gamesOnBoardng===>",games)
    console.log("charcters===>", characters)
    console.log("typeusers====>", typeusers)
    console.log("loggedInUser.games=====>",loggedInUser.games)

    /* Add type to user type list */
    const handleAddTypeUser = async (event) => {
    //event.preventDefault()
    dispatch(addTypeuser(loggedInUser.id, loggedInUser, typeusers, typeUserId))
    }

    /* Remove type to user type list */
    const handleRemoveTypeUser = async (event, removeId) => {
    //event.preventDefault()
    dispatch(removeTypeuser(loggedInUser.id, loggedInUser, removeId))
    }

    /* Add game to user game list */
    const handleAddGame = async (event) => {
        //event.preventDefault()
        dispatch(addGame(id, loggedInUser, games, gameId))
    }

    /* Remove game to user game list */
    const handleRemoveGame = async (event, removeId) => {
        //event.preventDefault()
        dispatch(removeGame(id, loggedInUser, removeId))
    }


    /* Add character to user character list */
    const handleAddCharacter = async (event) => {
        //event.preventDefault()
        dispatch(addCharacter(id, loggedInUser, characters, characterId))
    }

    /* Remove character to user character list */
    const handleRemoveCharacter = async (event, removeId) => {
        //event.preventDefault()
        dispatch(removeCharacter(id, loggedInUser, removeId))
    }

    /* Add type to user type list */
    const handleOnboardingUser = async (event) => {
        //event.preventDefault()
        dispatch(onboardingUser(id, loggedInUser, history, setShowLoading, fetchCoreData,  removeCoreData))
    }


    const handleNavigate = direction => {
        if (direction === "forward" ) {
            setPage(page+1)
        } else {
            if (page) {
                setPage(page-1)
            }

        }
    }



    useEffect(() => {

        /* dispatch(fetchUserId(id));
        if(loggedInUser.id === undefined) {
            dispatch(fetchUserId(id));
        } */

        if(user.isAuthenticated === false) {
            history.push(`/authportal`)
        }

    }, [loggedInUser]);


    return (

        <div>
            {(loggedInUser !== undefined) && (

            
        
        <div onSubmit={handleEditSubmit}>

            <div className="m-auto">
                <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                />
            </div>

            {/* Welcome */}
            {page === 0 && (
                <div>
                   <div className="xs:block sm:block md:block lg:hidden xl:hidden">

                    <h2 class="mb-6 text-center">Welcome</h2>
                    <h3 class="mb-6 text-center">{gamertag}</h3>
                    <p class="mb-6 text-center">Let's help you setup your profile.</p>

                    </div>

                    <div className="relative w-full px-8 mb-12 rounded-lg cursor-pointer md:px-0 lg:mb-0 lg:pl-10 md:w-full lg:w-full group">
                        <div className="relative rounded-md">
                            <img src={FeatureSignedOut} className="z-10 object-cover w-full h-full"/>
                        </div>

                        {/* <IonItem className="mb-4 rounded-lg">
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
                        </IonItem> */}

                        {/* <button
                          type="submit"
                          className="ml-5 bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                          //onClick={() => setShowToast1(true)} expand="block"
                        >
                          Save
                        </button> */}
                        
                    </div>
                </div>
            )}

            
            {/* Games */}
            {page === 1 && (
                <div className=''>

                    <div className='xs:block sm:block md:block lg:hidden xl:hidden'>
                        <h2 class="mb-6 text-center">Your games</h2>
                        <p class="mb-6 text-center">Select the games you play</p>
                    </div>
                    
                    
                    <div className="w-full pb-4">

                        <div className="grid grid-row-2 bg-white">
                            <Select
                              className=""
                                getOptionLabel={option => `${option.attributes.name}`}
                                getOptionValue={option => option.id}
                                options={games}
                                instanceId="games"
                                placeholder="filter by games"
                                isClearable
                                onChange={value => setGameId(value ? value.id : null)}
                              />
                              <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm mt-2"
                                onClick={() => {
                                  handleAddGame();
                                  setShowToastAddGame(true);
                                }}
                              >
                                {error && <p>{error}</p>}
                                Add game
                              </button>

                                <IonToast
                                    isOpen={showToastAddGame}
                                    onDidDismiss={() => setShowToastAddGame(false)}
                                    message="You have successfully added a game."
                                    duration={1000}
                                />
                        </div>   

                        <div>


                        <div className=" py-5 w-full">
                            {loggedInUser.games?.map(game => (
                              <div className="grid grid-cols-2 bg-white p-2 mb-2">
                                <p>{game.name}</p>
                                <button
                                  className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                  
                                  onClick={(event) => {
                                    handleRemoveGame(event, game.id);
                                    console.log("selected game id", game.id)
                                    setShowToastRemoveGame(true);
                                  }}
                                >
                                  Remove
                                </button>

                                <IonToast
                                    isOpen={showToastRemoveGame}
                                    onDidDismiss={() => setShowToastRemoveGame(false)}
                                    message="You have successfully removed a game."
                                    duration={1000}
                                />
                              </div>
                              
                            ))}   
                        </div>
                        

                        {/*  */}

                        
                        </div>           

                    </div>

                </div>
            )}

            {/* Characters */}
            {page === 2 && (
                <div className=''>

                    <div className='xs:block sm:block md:block lg:hidden xl:hidden'>
                        <h2 class="mb-6 text-center">Your characters</h2>
                        <p class="mb-6 text-center">Select the characters you play</p>
                    </div>
                    
                    
                    <div className="w-full pb-4">

                        <div className="grid grid-row-2 bg-white">
                            <Select
                              className=""
                                getOptionLabel={option => option.attributes.name}
                                getOptionValue={option => option.id}
                                options={characters}
                                instanceId="character"
                                placeholder="Filter by characters"
                                isClearable
                                onChange={value => setCharacterId(value ? value.id : null)}
                              />
                              <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm mt-2"
                                onClick={() => {
                                  handleAddCharacter();
                                  setShowToastAddCharacter(true);
                                }}
                              >
                                {error && <p>{error}</p>}
                                Add character
                            </button>

                            <IonToast
                                isOpen={showToastAddCharacter}
                                onDidDismiss={() => setShowToastAddCharacter(false)}
                                message="You have successfully added a character."
                                duration={1000}
                            />
                        </div>   

                        <div>


                        <div className=" py-5 w-full">
                            {loggedInUser.characters?.map(character => (
                              <div className="grid grid-cols-2 bg-white p-2 mb-2">
                                <p>{character.name} / {character.games?.map(game => (game.name))}</p>
                                <button
                                  className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                  
                                  onClick={(event) => {
                                    handleRemoveCharacter(event, character.id);
                                    console.log("selected character id", character.id)
                                    setShowToastRemoveCharacter(true);
                                  }}
                                >
                                  Remove
                                </button>

                                <IonToast
                                    isOpen={showToastRemoveCharacter}
                                    onDidDismiss={() => setShowToastRemoveCharacter(false)}
                                    message="You have successfully removed a character."
                                    duration={1000}
                                />
                            </div>
                            
                            ))}   
                        </div>
                        

                        {/*  */}

                        
                        </div>           

                    </div>

                </div>
            )}

            {/* Types */}
            {page === 3 && (
                <div className=''>

                    <div className='xs:block sm:block md:block lg:hidden xl:hidden'>
                        <h2 class="mb-6 text-center">User types</h2>
                        <p class="mb-6 text-center">Select the types you relate to.</p>
                    </div>
                    
                    
                    <div className="w-full pb-4">

                        <div className="grid grid-row-2 bg-white">
                            <Select
                            className=""
                            getOptionLabel={option => `${option.attributes.name}`}
                            getOptionValue={option => option.id}
                            options={typeusers}
                            instanceId="types"
                            placeholder="filter by types"
                            isClearable
                            onChange={value => setTypeUserId(value ? value.id : null)}
                            />
                            <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm mt-2"
                            onClick={() => {
                                handleAddTypeUser();
                                setShowToastAddType(true);
                            }}
                            >
                            {error && <p>{error}</p>}
                            Add type
                            </button>

                            <IonToast
                                isOpen={showToastAddType}
                                onDidDismiss={() => setShowToastAddType(false)}
                                message="You have successfully added a type."
                                duration={1000}
                            />
                        </div>   

                        <div>


                        <div className=" py-5 w-full">
                            {loggedInUser.type_user?.map(type => (
                                <div className="grid grid-cols-2 bg-light p-2 mb-2">
                                <p>{type.name}</p>
                                <button
                                    className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                    
                                    onClick={(event) => {
                                    handleRemoveTypeUser(event, type.id);
                                    setShowToastRemoveType(true);                                    
                                    }}
                                >
                                    Remove
                                </button>

                                <IonToast
                                    isOpen={showToastRemoveType}
                                    onDidDismiss={() => setShowToastRemoveType(false)}
                                    message="You have successfully added a type."
                                    duration={1000}
                                />
                                </div>  
                            ))}    
                        </div>
                        

                        {/*  */}

                        
                        </div>           

                    </div>

                </div>
                
            )}

            {/* Profile and background image */}
            {page === 4 && (
                <form>
                    <div className='xs:block sm:block md:block lg:hidden xl:hidden'>
                        <h2 class="mb-6 text-center">Profile and background</h2>
                        <p class="mb-6 text-center">Upload a profile image and a background image</p>
                    </div>

                    <div className="border-b-4 border-solid pb-4">
                        <div className=" relative rounded-full overflow-hidden mb-4">

                        {loggedInUser.image_profile ? (
                        <div
                            className="mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full"
                            style={{
                            backgroundImage: `url(${loggedInUser.image_profile && loggedInUser.image_profile.url})`,
                            }}
                            alt={`Profile name ${user.gamertag}`}
                        >
                        </div>
                        ) : (
                        <div
                        className="mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full placeholder overflow-hidden text-transparent"
                        style={{ backgroundImage: `url(${ProfilePlaceholder})` }}
                        alt={`Profile name ${gamertag}`}
                        >
                            {/* Change default to placeholder image */}
                            <Gravatar
                                email={email}
                                size={1600}
                                rating="pg"
                                default={ProfilePlaceholder}
                                className="CustomAvatar-image overflow-hidden h-10 w-10 rounded-full bg-cover bg-no-repeat my-auto "
                            />
                        </div>
                        )}


                        {/* <img className="relative rounded-full w-40 h-40 bg-no-repeat bg-cover overflow-hidden" 
                        style={{
                            backgroundImage: `url(${user.image_profile && user.image_profile.url})`
                        }}
                        /> */}

                        <label for="user-photo" className="absolute inset-0  bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100">
                            <span>Change</span>
                            <span className="sr-only">user photo</span>
                            <input 
                            type="file" 
                            id="user-photo" 
                            name="user-photo" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                            onChange={(event) => setFile(event.target.files[0])}
                            />
                        </label>


                        </div>
                        {/* Button */}
                        <div className="rounded-md shadow-sm">
                        <div className="group relative border bg-primary text-dark hover:bg-dark hover:text-white rounded-md py-2 px-3 flex items-center justify-center focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-light-blue-500">
                            <label for="user_photo" className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none">
                            <span>Change image</span>
                            <span className="sr-only">user photo</span>
                            </label>
                            <input 
                            id="user_photo"
                            
                            name="user_photo" 
                            type="file" className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                            onChange={(event) => setFile(event.target.files[0])}
                            />
                            {error && <p>{error.message}</p>}
                        </div>
                        </div>
                    </div>

                    <div className="w-full my-4 border-b-4 border-solid pb-4">
                        <div className=" relative rounded-lg overflow-hidden w-full mb-4">

                            { loggedInUser.image_background ? (
                                <img 
                                src={loggedInUser.image_background.url} 
                                alt={`Profile name ${loggedInUser.gamertag}`} 
                                className="object-cover w-full h-40 lg:h-full md:h-60 rounded-md"
                                />
                            ) : (
                                <img src={hexagon_background} className="relative w-full h-40 bg-no-repeat bg-cover overflow-hidden"/>
                            )}
                            

                            <label for="user-photo" className="absolute inset-0  bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100">
                                <span>Change</span>
                                <span className="sr-only">background image</span>
                                <input 
                                type="file" 
                                id="user-photo" 
                                name="user-photo" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                onChange={(event) => setFile2(event.target.files[0])}
                                />
                            </label>
                        </div>

                        {/* Button */}
                        <div className="rounded-md shadow-sm">
                        <div className="group relative border bg-primary text-dark hover:bg-dark hover:text-light rounded-md py-2 px-3 flex items-center justify-center focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-light-blue-500">
                            <label for="user_photo" className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none">
                            <span>Change image</span>
                            <span className="sr-only">background image</span>
                            </label>
                            <input 
                            id="user_photo"
                            
                            name="user_photo" 
                            type="file" className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                            onChange={(event) => setFile2(event.target.files[0])}
                            />
                            {error && <p>{error.message}</p>}
                        </div>
                        </div>
                    </div>

                    {/* Save */}
                    {(file || file2) && (
                    <div className="">

                        <button  className="group relative border bg-dark text-white hover:bg-primary hover:text-dark rounded-md py-2 px-3 flex items-center justify-center focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-light-blue-500 w-full"
                        onClick={() => setShowToastUploadImage(true)} expand="block"
                        >
                            Upload
                        </button>
                        <IonToast
                            isOpen={showToastUploadImage}
                            onDidDismiss={() => setShowToastUploadImage(false)}
                            message="Your image(s) have been updated."
                            duration={1000}
                        />
                    </div>
                    )}
                </form>
                
            )}

            {/* Complete */}
            {page === 5 && (
                <div>
                    <div className='xs:block sm:block md:block lg:hidden xl:hidden'>
                        <h2 class="mb-6 text-center">Good game!</h2>
                        <p class="mb-6 text-center">Let's take you to your profile</p>
                    </div>
                    {loggedInUser !== undefined && (
                        <HeaderProfileUserOnboarding
                            style1="p-8 bg-light border-none"
                        />
                    )}
                    
                </div>
            )}


            

            <div className="flex mt-4 justify-end space-x-4">
                {page > 0 && (
                    <button className="px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg place-content-start"
                    onClick={() => handleNavigate("backward")}
                    >
                        Previous
                    </button>
                )}
                
                
                {(page >= 0 && page < 5) && (
                    <button 
                        className=" px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg "
                        onClick={() => handleNavigate("forward")}
                    >
                        Next
                    </button>
                )}


                {page === 5 && (
                    <div>
                        <button 
                            className=" px-3 py-4 font-medium text-dark bg-primary hover:bg-dark hover:text-light rounded-lg "
                            onClick={() => {
                                handleOnboardingUser(event, loggedInUser);
                                setShowToastComplete(true);
                            }}
                        >
                            Finish onboarding
                        </button>

                        <IonToast
                            isOpen={showToastComplete}
                            onDidDismiss={() => setShowToastComplete(false)}
                            message="You have completed your onboarding. GG!"
                            duration={1000}
                        />
                    </div>
                )}

                
            </div>


            {error && <p>{error}</p>}

        </div>
        )}
        </div>
    )
}

export default Onboarding01