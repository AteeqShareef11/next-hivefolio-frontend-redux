import { 
  IonBackButton,
  IonButton,
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
  IonSpinner, 
  IonToast, 
  IonToolbar, 
} from '@ionic/react';
import { useState, useEffect } from 'react';


import { Link, useHistory, useParams } from 'react-router-dom';

/* User */
import { useCurrentUser } from '../context/AuthContext';
import { callApi } from "../utils/utils";



/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import NavigationAccordion from '../ui/Navigation/NavigationAccordion';
import Footer from '../ui/Footer/Footer';

import SelectListTeams from '../ui/Organisation/SelectListTeams';
import SelectListTeamsMembers from '../ui/Organisation/SelectListTeamsMembers';
import SelectTeams from '../ui/Organisation/SelectTeams';

/* Search */
import Select from 'react-select';
import {useQuery, useQueryClient} from 'react-query';

/* Headless UI */
import TabsHeadlessUi from '../ui/Tabs/TabsHeadlessUi';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/actions/userActions';
import { fetchOganisationId, removeSelectedOrganisation } from '../redux/actions/organisationActions';
  
  const EditOrganisationTeams = () => {
  
    const { id } = useParams();
    const dispatch = useDispatch();

    const user = useCurrentUser();
    const [showToast1, setShowToast1] = useState(false);

    const users = useSelector((state) => state.allUsers.users);  
    const organisation = useSelector((state) => state.organisation);

    const [showLoading, setShowLoading] = useState(true);
    const history = useHistory();


    const [teamId, setTeamId] = useState([]);


    useEffect(() => {
    const fetchOrganisation = async () => {
    
      try {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/organisations/${id}`);
      const teamData = await callApi({ path: '/teams' });
      const data = await res.json()
      
      setUsername(data.username)
      setTeams(teamData)
      setOrganisation(data)
      /* setTeam(data) */
      setImage(data.image_profile)
      setName(data.name)
      setShowLoading(false)
      } catch (err) {
      setShowLoading(false)
      console.error(err)
      }
    }
    fetchOrganisation()
  }, [])

    const adminId = organisation.admins?.find((person) => {
      return person.id === user.id;
    })

    
    useEffect(() => {
      dispatch(fetchUsers(users));
      dispatch(fetchOganisationId(id));
    }, []);



  
    return (
      <IonPage >
        <IonHeader >
          <title>Edit Organisation Teams - {organisation.username}</title>
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

              {(!showLoading && !adminId) && (history.push(`/organisation/${organisation.username}`))}
                  <div className="mt-8 mx-8">
                    <h1>{organisation.name}</h1>
                    <Link to={`/organisation/${organisation.username}`}>
                    <button  className="bg-primary sm-mt-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                        View {organisation.name}'s profile
                    </button>
                    </Link>
                    
                  </div>
                  
  
              <main className="relative ">

                  <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">

                  <NavigationAccordion 
                    header='Menu'
                    link_01='edit'
                    link_01_title='Overall'
                    style_01='hover:bg-primary'

                    link_02='edit-media'
                    link_02_title='Media'
                    style_02='hover:bg-primary'

                    link_03='edit-members'
                    link_03_title='Members'
                    style_03='hover:bg-primary'

                    link_04='edit-teams'
                    link_04_title='Teams'
                    style_04='bg-primary'

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
                      <h3 className="">Team members</h3>

                      <TabsHeadlessUi
                        tab1title="Teams"
                        tab1={
                          <SelectListTeamsMembers/>
                        }
                        tab2title="Add teams"
                        tab2={
                          <div>
                            <SelectTeams
                              setTeamId={setTeamId}
                            />

                            <SelectListTeams
                              teamId={teamId}
                            />
                            
                          </div>
                        }
                      />
                    
                  </div>
                </main>

            </div>
            <Footer/>
        </IonContent>
      </IonPage>
      )
  }
  
  export default EditOrganisationTeams