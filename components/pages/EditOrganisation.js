import { 
  IonBackButton,
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonLoading, 
  IonPage, 
  IonRouterLink, 
  IonSpinner, 
  IonTextarea, 
  IonToast, 
  IonToolbar, 
} from '@ionic/react';
import { useState, useEffect } from 'react';
    
import { Link, useHistory, useParams } from 'react-router-dom';

/* User */
import { useCurrentUser } from '../context/AuthContext';
    
/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import NavigationAccordion from '../ui/Navigation/NavigationAccordion';
import Footer from '../ui/Footer/Footer';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchOganisationId, editOrganisation, fetchGames, addGameToOrganisation, fetchTypeorganisations, fetchTypeteams, removeGameFromOrganisation, addTypeorganisation, removeTypeorganisation } from '../redux/actions/coreActions';
//import {} from '../redux/actions/typeActions'

/* Search */
import Select from 'react-select';
  
  const EditOrganisation = () => {
  
    const {id} = useParams();
    const dispatch = useDispatch();

    const user = useCurrentUser();
    const history = useHistory();

    const [showToast1, setShowToast1] = useState(false);

    const selectedOrganisation = useSelector(state => state.organisation);
    const games = useSelector(state => state.allGames.games);
    const typeOrganisations = useSelector((state) => state.allData.typeOrganisations);

    const { name, username, introduction, tagline, admins,  type_organisation} = selectedOrganisation;

    const [gameId, setGameId] = useState(null);
    const [typeOrganisationId, setTypeOrganisationId] = useState({});
    const [error, setError] = useState('');


    const [formValues, setFormValues] = useState({
      username: selectedOrganisation?.username || "",
      name: selectedOrganisation?.name || "",
      introduction: selectedOrganisation?.introduction || "",
      tagline: selectedOrganisation?.tagline || "",
      games: selectedOrganisation?.games || [],
      type_organisation: selectedOrganisation?.type_organisation || [],
    });

    useEffect(() => {
      setFormValues({...formValues, name, username, introduction, tagline, games, type_organisation})
  
    }, [selectedOrganisation])
  
    const onChange = e => {
      setFormValues({...formValues, [e.target.name]: e.target.value})
    }


    const handleEditSubmit = async (event) => {
      event.preventDefault()
     
      const formData = new FormData();
      formData.append('data', JSON.stringify({
        name: formValues.name,
        username: formValues.username.split(' ').join(''),
        introduction: formValues.introduction,
        tagline: formValues.tagline,
      }));
      const body = {
        name: formValues.name,
        username: formValues.username.split(' ').join(''),
        introduction: formValues.introduction,
        tagline: formValues.tagline,
      }
      
      //formData.append('files.image_profile', file)
  
      dispatch(editOrganisation(body, id));
      dispatch(fetchOganisationId(id));
      setShowToast1(true)
  
  } 



    /*  */

    useEffect(() => {

      dispatch(fetchOganisationId(id));
      dispatch(fetchGames());
      if(selectedOrganisation.id === undefined) {
        dispatch(fetchOganisationId(id));
      }
  
    }, []);

    useEffect(() => {
      //dispatch(fetchTypeteams());
      dispatch(fetchTypeorganisations(typeOrganisations));
    }, []);


    /* Add game to organisation game list */
    const handleAddGame = async (event) => {
      //event.preventDefault()
      dispatch(addGameToOrganisation(id, selectedOrganisation, games, gameId))
    }

    /* Remove game to organisation game list */
    const handleRemoveGame = async (event, removeId) => {
      event.preventDefault()
      dispatch(removeGameFromOrganisation(id, selectedOrganisation, removeId))
    }


    /* Add type to organisation type list */
    const handleAddTypeOrganisation = async (event) => {
      //event.preventDefault()
      dispatch(addTypeorganisation(id, selectedOrganisation, typeOrganisations, typeOrganisationId))
    }

    /* Remove type to organisation type list */
    const handleRemoveTypeOrganisation = async (event, removeId) => {
      event.preventDefault()
      dispatch(removeTypeorganisation(id, selectedOrganisation, removeId))
    }
    

    const adminId = admins?.find((person) => {
      return person.id === user.id;
    })


        return (
            <IonPage >
          <IonHeader >
            {selectedOrganisation ? (
              <title>Edit Organisation - {username}</title>
            ): (
              <title>Hivefolio</title>
            )}
            
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

              {(!adminId) && (history.push(`/organisation/${username}`))}

                <div className="mt-8 mx-8">
                  <h1>{name}</h1>
                  <Link to={`/organisation/${username}`}>
                  <button  className="bg-primary sm-mt-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                      View {name}'s profile
                  </button>
                  </Link>
                </div>
                    
    
                <main className="relative ">
  
                    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                    <NavigationAccordion 
                      header='Menu'
                      link_01='edit'
                      link_01_title='Overall'
                      style_01='bg-primary'
  
                      link_02='edit-media'
                      link_02_title='Media'
                      style_02='hover:bg-primary'
  
                      link_03='edit-members'
                      link_03_title='Members'
                      style_03='hover:bg-primary'
  
                      link_04='edit-teams'
                      link_04_title='Teams'
                      style_04='hover:bg-primary'

                      link_05='edit-communities'
                      link_05_title='Communities'
                      style_05='hover:bg-primary'
  
                      link_06='edit-social'
                      link_06_title='Social'
                      style_06='hover:bg-primary'
  
                      link_07='edit-streams'
                      link_07_title='Streams'
                      style_07='hover:bg-primary'

                      link_08='edit-settings'
                      link_08_title='Settings'
                      style_08='hover:bg-primary'
                    />
                      <h3 className="">Overall</h3>
                      <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
                        <div className="divide-y divide-gray-200 lg:grid lg:divide-y-0 lg:divide-x">
   
                          {/* Form */}
                          <form className="divide-y divide-gray-200 lg:col-span-9" onSubmit={handleEditSubmit}>
                            
                            
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
                                
                                <IonItem className="mb-4 rounded-lg" >
                                  <IonLabel position="stacked">Organisation name</IonLabel>
                                  <IonInput 
                                      value={formValues.name}
                                      name="name"
                                      onIonChange={onChange}
                                      placeholder="Name"
                                      >
                                  </IonInput>
                                </IonItem>

                                <IonItem className="mb-4 rounded-lg" >
                                  <IonLabel position="stacked">Organisation username</IonLabel>
                                  <IonInput 
                                      value={formValues.username}
                                      name="username"
                                      onIonChange={onChange}
                                      placeholder="Username"
                                      >
                                  </IonInput>
                                </IonItem>
  
                                <IonItem className="mb-4 rounded-lg" >
                                  <IonLabel position="stacked">Tagline</IonLabel>
                                  <IonInput 
                                      value={formValues.tagline}
                                      name="tagline"
                                      onIonChange={onChange}
                                      placeholder="Tagline"
                                    >
                                  </IonInput>
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
                                    <IonLabel for="about" className=" block text-sm font-medium text-gray-700">
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
                                        className="shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md">  
                                      </IonTextarea >
                                    </div>
                                  </div>
                                </IonItem>
                              </div>
                            </section>
                          </div>


                          {/* Section 3 */}
                          <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            {/* Title */}
                            <section className="lg:col-start-1 w-full">
                              <div className="px-4 py-5">
                                <h4>Organisation type</h4>
                              </div>
                            </section>

                            {/* Content */}
                            <section className="col-span-2">
                              <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2">
                                <div className="px-4 py-5 w-full">

                                  <div className="grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 bg-white p-2 md:grid-cols-2">
                                    <Select
                                    className="lg:mb-2 xl:mb-2"
                                      getOptionLabel={option => `${option.name}`}
                                      getOptionValue={option => option.id}
                                      options={typeOrganisations}
                                      instanceId="types"
                                      placeholder="filter by types"
                                      isClearable
                                      onChange={value => setTypeOrganisationId(value ? value.id : null)}
                                    />
                                    <button
                                      type="button"
                                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                      onClick={() => {
                                        handleAddTypeOrganisation();
                                        /* setShowToast1(true); */
                                      }}
                                    >
                                      {error && <p>{error}</p>}
                                      Add type
                                    </button>
                                  </div>

                                </div>

                                <div className="px-4 py-5 w-full">
                                  {selectedOrganisation.type_organisation?.map(type => (
                                    <div className="grid grid-cols-2 bg-white p-2 mb-2">
                                      <p>{type.name}</p>
                                      <div
                                        className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                        
                                        onClick={(event) => {
                                          handleRemoveTypeOrganisation(event, type.id);
                                          /* setShowToast1(true); */
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
                            {/* Title */}
                            <section className="lg:col-start-1 w-full">
                              <div className="px-4 py-5">
                                <h4>My competitive games</h4>
                              </div>
                            </section>

                            {/* Content */}
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
                                        handleAddGame(id);
                                        /* setShowToast1(true); */
                                      }}
                                    >
                                      {error && <p>{error}</p>}
                                      Add game
                                    </button>
                                  </div>

                                </div>

                                <div className="px-4 py-5 w-full">
                                  {selectedOrganisation.games?.map(game => (
                                    <div className="grid grid-cols-2 bg-white p-2 mb-2">
                                      <p>{game.name}</p>
                                      <div
                                        className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                        
                                        onClick={(event) => {
                                          handleRemoveGame(event, game.id);
                                          //("selected game id", game.id)
                                          /* setShowToast1(true); */
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
                              
                              {/* Save */}
                              <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                                <button type="button" className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                                  Cancel
                                </button>
                                <button  className="ml-5 bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
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
                    </div>
                  </main>
                  
                  
                
                  
              </div>
              <Footer/>
          </IonContent>
        </IonPage>
        )
    }
    
    export default EditOrganisation