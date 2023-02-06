import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonModal,
  IonPage,
  IonRouterLink,
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
import Dropdown from '../ui/Dropdown/Dropdown';

/* Search */
import Select from 'react-select';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchJob, editJob, addTypejob, removeTypejob, addGameToJob, removeGameFromJob} from '../redux/actions/jobActions';
import { fetchGames } from '../redux/actions/gameActions';
import { fetchCharacters } from '../redux/actions/characterActions';
import { fetchTypejobs } from '../redux/actions/typeActions';

const EditJob = (  ) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useCurrentUser();
  const history = useHistory();

  const team = useSelector(state => state.team);
  const job = useSelector(state => state.job);
  const games = useSelector((state) => state.allGames.games);
  const characters = useSelector((state) => state.allCharacters.characters);
  const typeteams = useSelector((state) => state.allTypeteams.typeteams);
  const typejobs = useSelector((state) => state.allTypejobs.typejobs);

  //const {name, username, introduction, tagline} = team;
  const {title, description} = job;

  const [formValues, setFormValues] = useState({
    title: job?.title || "",
    description: "",
    date: "",
  })



  const [showToast1, setShowToast1] = useState(false);

  const [gameId, setGameId] = useState(null);
  const [typeJob, setTypeJob] = useState({});
  const [typeJobId, setTypeJobId] = useState({});
  const [error, setError] = useState('');
  const [showLoading, setShowLoading] = useState(true);

  const fetchData = async () => {
    try {
      const typeTeamRes = await fetch(`https://hivefolio.herokuapp.com/api/type-jobs`);
      const gamesRes = await fetch(`https://hivefolio.herokuapp.com/api/games`);

      const typeTeamData = await typeTeamRes.json();
      const gamesData = await gamesRes.json();

      setTypeJob(typeTeamData);
      setGames(gamesData);
      setShowLoading(false)
    } catch (err) {
      console.error(err);
    }
  };


  const adminId = job.admins?.find((person) => {
    return person.id === user.id;
  })

  const handleEditSubmit = async (event) => {
    event.preventDefault()
   

    const formData = new FormData();
    formData.append('data', JSON.stringify({
      title: formValues.title,
      description: formValues.description,
    }));
    const body = {
      title: formValues.title,
      description: formValues.description,
    }
    
    //formData.append('files.image_profile', file)

    dispatch(editJob(body, id))

}


/* Add game to team game list */
const handleAddGame = async (event) => {
  //event.preventDefault()
  dispatch(addGameToJob(id, job, games, gameId))
}

/* Remove game to team game list */
const handleRemoveGame = async (event, removeId) => {
  //event.preventDefault()
  dispatch(removeGameFromJob(id, job, removeId))
}


/* Add type to user type list */
const handleAddTypeTeam = async (event) => {
  //event.preventDefault()
  dispatch(addTypejob(id, job, typejobs, typeJobId))
}

/* Remove type to user type list */
const handleRemoveTypeTeam = async (event, removeId) => {
  //event.preventDefault()
  dispatch(removeTypejob(id, job, removeId))
}


  useEffect(() => {
    fetchData();
    dispatch(fetchJob(id));
    dispatch(fetchGames(games));
    dispatch(fetchCharacters(characters));
    dispatch(fetchTypejobs(typejobs));
  }, []);

  useEffect(() => {
    setFormValues({...formValues, title, description})

  }, [job])

  const onChange = e => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }
    

  return (
    <IonPage>
      <IonHeader>
        <title>Edit Job - {title}</title>
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
          {/* <div className="m-auto">
            <IonLoading
              cssClass='my-custom-class'
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}
              message={'Please wait...'}
            />
          </div> */}

          {(!showLoading && !adminId) && (history.push(`/job/${id}`))}

          <div className="mt-8 mx-8">
            <h1>{title}</h1>
            <Link to={`/job/${id}`}>
              <button className="bg-primary sm-mt-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                View {title}'s page
              </button>
            </Link>
          </div>

          <main className="relative ">
            <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
              <NavigationAccordion
                header="Menu"
                link_01="edit"
                link_01_title="Overall"
                style_01="bg-primary"
                
                link_02="edit-media"
                link_02_title="Media"
                style_02="hover:bg-primary"

                link_03="edit-members"
                link_03_title="Members"
                style_03="hover:bg-primary"

                link_04="edit-settings"
                link_04_title="Settings"
                style_04="hover:bg-primary"
              />
              <h3 className="">Overall</h3>
              <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
                <div className="divide-y divide-gray-200 lg:grid lg:divide-y-0 lg:divide-x">
                  {/* Form */}
                  <form
                    className="divide-y divide-gray-200 lg:col-span-9"
                    onSubmit={handleEditSubmit}
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
                            <IonLabel position="stacked">Job title</IonLabel>
                            <IonInput
                              value={formValues.title}
                              name="title"
                              onIonChange={onChange}
                              placeholder="Title"
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
                          <h4>Description</h4>
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
                                Description
                              </IonLabel>
                              <p className="mt-2 text-sm text-gray-500">
                                Brief description for the job. URLs are hyperlinked.
                              </p>
                              <div className="mt-2">
                                <IonTextarea
                                  id="about"
                                  rows="3"
                                  value={formValues.description}
                                  name="description"
                                  onIonChange={onChange}
                                  className="shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                ></IonTextarea>
                              </div>
                            </div>
                          </IonItem>
                        </div>
                      </section>
                    </div>


                    {/* Section 2 */}
                    <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Title */}
                      <section className="lg:col-start-1 w-full">
                        <div className="px-4 py-5">
                          <h4>Requirements</h4>
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
                                Requirements
                              </IonLabel>
                              <p className="mt-2 text-sm text-gray-500">
                                Brief outline for the job's requirements.
                              </p>
                              <div className="mt-2">
                                <IonTextarea
                                  id="about"
                                  rows="3"
                                  value={formValues.requirements}
                                  name="requirements"
                                  onIonChange={onChange}
                                  className="shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                ></IonTextarea>
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
                          <h4>Games</h4>
                        </div>
                      </section>

                      {/* Content */}
                      <section className="col-span-2">
                        {/* <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2">
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
                                }}
                              >
                                {error && <p>{error}</p>}
                                Add game
                              </button>
                            </div>

                          </div>

                          <div className="px-4 py-5 w-full">
                            {job.games?.map(game => (
                              <div className="grid grid-cols-2 bg-white p-2 mb-2">
                                <p>{game.name}</p>
                                <button
                                  className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                  
                                  onClick={(event) => {
                                    handleRemoveGame(event, game.id);
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                              
                            ))}
                            
                          </div>

                        </div> */}
                      </section>
                    </div>

                    {/* Section 4 */}
                    <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Title */}
                      <section className="lg:col-start-1 w-full">
                        <div className="px-4 py-5">
                          <h4>Job types</h4>
                        </div>
                      </section>

                      {/* Content */}
                      <section className="col-span-2">
                        <div className="bg-light mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2">
                          <div className="px-4 py-5 w-full">

                            <div className="grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 bg-white p-2 md:grid-cols-2">
                              <Select
                              className="lg:mb-2 xl:mb-2"
                                getOptionLabel={option => `${option.title}`}
                                getOptionValue={option => option.id}
                                options={typeJob}
                                instanceId="types"
                                placeholder="filter by types"
                                isClearable
                                onChange={value => setTypeJobId(value ? value.id : null)}
                              />
                              <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => {
                                  handleAddTypeTeam();
                                }}
                              >
                                {error && <p>{error}</p>}
                                Add type
                              </button>
                            </div>

                          </div>

                          <div className="px-4 py-5 w-full">
                            {job.type_job?.map(type => (
                              <div className="grid grid-cols-2 bg-white p-2 mb-2">
                                <p>{type.title}</p>
                                <button
                                  className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                  
                                  onClick={(event) => {
                                    handleRemoveTypeTeam(event, type.id);
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

                    {/* <!-- Privacy section --> */}
                    <div className="pt-6 divide-y divide-gray-200">
                      {/* Save */}
                      <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                        <button
                          type="button"
                          className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                        >
                          Cancel
                        </button>
                        <button
                          className="ml-5 bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                          onClick={() => setShowToast1(true)}
                          expand="block"
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
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default EditJob;