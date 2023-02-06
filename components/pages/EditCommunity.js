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
import Axios from 'axios';
    
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
import { fetchCommunityId, fetchCommunities, editCommunity, addGameToCommunity, removeGameFromCommunity, addTypecommunity, removeTypecommunity } from '../redux/actions/communityActions';
import { fetchGames } from '../redux/actions/gameActions';
import { fetchCharacters } from '../redux/actions/characterActions';
import { fetchTypecommunities } from '../redux/actions/typeActions';

/* Search */
import Select from 'react-select';
  
  const EditCommunity = ({match}) => {
  
    const {id} = useParams();
    const dispatch = useDispatch();

    const [showLoading, setShowLoading] = useState(true);
    const user = useCurrentUser();
    const history = useHistory();

    const [showToast1, setShowToast1] = useState(false);


    // Used for the edit form
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [tagline, setTagline] = useState('');
    //const [community, setCommunity] = useState({});
    const [openCommunity, setOpenCommunity] = useState();
    const [games, setGames] = useState([]);
    const [gameId, setGameId] = useState(null);
    const [typeCommunity, setTypeCommunity] = useState({});
    const [typeCommunityId, setTypeCommunityId] = useState({});
    const [error, setError] = useState('');


    const community = useSelector(state => state.community);
    const typecommunities = useSelector((state) => state.allTypecommunities.typecommunities);


    useEffect(() => {
      fetchCommunity();
      dispatch(fetchCommunityId(id));
      dispatch(fetchTypecommunities(typecommunities));
    }, []);


      /* Add game to organisation game list */
      const handleAddGame = async (event) => {
        //event.preventDefault()
        dispatch(addGameToCommunity(id, community, games, gameId))
      }
  
      /* Remove game to organisation game list */
      const handleRemoveGame = async (event, removeId) => {
        //event.preventDefault()
        dispatch(removeGameFromCommunity(id, community, removeId))
      }
  
  
      /* Add type to organisation type list */
      const handleAddTypeCommunity = async (event) => {
        //event.preventDefault()
        dispatch(addTypecommunity(id, community, typecommunities, typeCommunityId))
      }
  
      /* Remove type to organisation type list */
      const handleRemoveTypeCommunity = async (event, removeId) => {
        //event.preventDefault()
        dispatch(removeTypecommunity(id, community, removeId))
      }


    const fetchCommunity = async () => {
  
      try {
      const communityRes = await fetch(`https://hivefolio.herokuapp.com/api/communities/${id}`);
      const gamesRes = await fetch(`https://hivefolio.herokuapp.com/api/games`);
      const typeCommunityRes = await fetch(`https://hivefolio.herokuapp.com/api/typecommunities`);

      const communityData = await communityRes.json();
      const gamesData = await gamesRes.json();
      const typeCommunityData = await typeCommunityRes.json();
  
  
      //setCommunity(communityData);
      setGames(gamesData);
      setTypeCommunity(typeCommunityData);
      setName(communityData.name);
      setUsername(communityData.username);
      setIntroduction(communityData.introduction);
      setTagline(communityData.tagline);
      setOpenCommunity(communityData.boolean_open_community);
      setShowLoading(false);
      } catch (err) {
      setShowLoading(false)
      console.error(err)
      }
    }

    const adminId = community.admins?.find((person) => {
      return person.id === user.id;
    })

    /* Open Community is true */
    const communityIsOpen = openCommunity === true;
  
    /* Edit data */

    const handleEditSubmit = async (event) => {
      event.preventDefault()

      const updatedValue = !openCommunity;

      setOpenCommunity(updatedValue);
      setShowToast1(value => !value);

      const res = await fetch(`https://hivefolio.herokuapp.com/api/communities/${id}`,
      {
          method: 'PUT',
          headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
              name,
              username: username.split(' ').join('').toLowerCase(),
              introduction,
              tagline,
              boolean_open_community: updatedValue
          })
      })

      const data = await res.json()
      fetchCommunity()

    }
  
      
        return (
            <IonPage >
          <IonHeader >
          <title>Edit Community - {username}</title>
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
              <div className="m-auto">
                <IonLoading
                  cssClass='my-custom-class'
                  isOpen={showLoading}
                  onDidDismiss={() => setShowLoading(false)}
                  message={'Please wait...'}
                />
              </div>

                {(!showLoading && !adminId) && (history.push(`/community/${username}`))}
                <div className="mt-8 mx-8">
                  <h1>{community.name}</h1>
                  <Link to={`/community/${community.username}`}>
                  <button  className="bg-primary sm-mt-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                      View {community.name}'s profile
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
  
                      link_05='edit-social'
                      link_05_title='Social'
                      style_05='hover:bg-primary'
  
                      link_06='edit-streams'
                      link_06_title='Streams'
                      style_06='hover:bg-primary'

                      link_07='edit-settings'
                      link_07_title='Settings'
                      style_07='hover:bg-primary'
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
                                  <IonLabel position="stacked">Community name</IonLabel>
                                  <IonInput 
                                      value={name} 
                                      onIonChange={(event) => setName(event.target.value)}
                                      placeholder="Name"
                                      >
                                  </IonInput>
                                </IonItem>

                                <IonItem className="mb-4 rounded-lg" >
                                  <IonLabel position="stacked">Community username</IonLabel>
                                  <IonInput 
                                      value={username} 
                                      onIonChange={(event) => setUsername(event.target.value)}
                                      placeholder="Username"
                                      >
                                  </IonInput>
                                </IonItem>
  
                                <IonItem className="mb-4 rounded-lg" >
                                  <IonLabel position="stacked">Tagline</IonLabel>
                                  <IonInput 
                                      value={tagline} 
                                      onIonChange={(event) => setTagline(event.target.value)}
                                      placeholder="Express yourself"
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
                                        id="about" 
                                        name="about" 
                                        rows="3"
                                        value={introduction} 
                                        onIonChange={(event) => setIntroduction(event.target.value)}
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
                                  <h4>Community types</h4>
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
                                        options={typeCommunity}
                                        instanceId="types"
                                        placeholder="filter by types"
                                        isClearable
                                        onChange={value => setTypeCommunityId(value ? value.id : null)}
                                      />
                                      <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                          handleAddTypeCommunity();
                                          /* setShowToast1(true); */
                                        }}
                                      >
                                        {error && <p>{error}</p>}
                                        Add type
                                      </button>
                                    </div>

                                  </div>

                                  <div className="px-4 py-5 w-full">
                                    {community.type_community?.map(type => (
                                      <div className="grid grid-cols-2 bg-white p-2 mb-2">
                                        <p>{type.name}</p>
                                        <button
                                          className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                          
                                          onClick={(event) => {
                                            handleRemoveTypeCommunity(event, type.id);
                                            /* setShowToast1(true); */
                                          }}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                      
                                    ))}
                                    
                                  </div>

                                </div>
                              </section>
                            </div>

                          {/* Section 3 */}
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
                                    {community.games?.map(game => (
                                      <div className="grid grid-cols-2 bg-white p-2 mb-2">
                                        <p>{game.name}</p>
                                        <button
                                          className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                          
                                          onClick={(event) => {
                                            handleRemoveGame(event, game.id);
                                            /* setShowToast1(true); */
                                          }}
                                        >
                                          Remove
                                        </button>
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
                                        <h4>Open community</h4>
                                      </div>
                                    </section>
          
                                    {/* Content */}
                                    <section className="col-span-2">
                                      {!communityIsOpen ? (
                                        <button
                                          type="submit"
                                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        
                                        
                                        >
                                          {error && <p>{error}</p>}
                                          Open community
                                        </button>
                                      ) : (
                                        <button
                                          type="submit"
                                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                          
                                        
                                        >
                                          {error && <p>{error}</p>}
                                          Close community
                                        </button>
                                      )}
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
    
    export default EditCommunity