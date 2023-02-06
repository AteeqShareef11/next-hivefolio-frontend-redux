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
import { useCurrentUser, useDispatchCurrentUser } from '../context/AuthContext';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import NavigationAccordion from '../ui/Navigation/NavigationAccordion';
import Footer from '../ui/Footer/Footer';

import SelectListTeams from '../ui/Community/SelectListTeams';
import SelectListTeamsMembers from '../ui/Community/SelectListTeamsMembers';
import SelectTeams from '../ui/Community/SelectTeams';

/* Headless UI */
import TabsHeadlessUi from '../ui/Tabs/TabsHeadlessUi';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../redux/actions/teamActions';
import { fetchCommunityId, removeSelectedCommunity } from '../redux/actions/communityActions';
  
  const EditCommunityTeams = () => {
  
    const { id } = useParams();
    const dispatch = useDispatch();

    const teams = useSelector((state) => state.allTeams.teams);  
    const community = useSelector((state) => state.community);

    const user = useCurrentUser();
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(true);

    const [teamId, setTeamId] = useState([]);
 
    useEffect(() => {

      const getData = async () => {
        
        try {
          setShowLoading(false)
        } catch (err) {
          console.error(err)
        }
      }
      getData();
    }, []);

    const adminId = community.admins?.find((person) => {
      return person.id === user.id;
    })

    useEffect(() => {
      dispatch(fetchCommunityId(id));
      dispatch(fetchTeams(teams));
    }, []);

  
    return (
      <IonPage >
        <IonHeader >
          <title>Edit Community Teams - {community.username}</title>
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

                {(!showLoading && !adminId) && (history.push(`/community/${community.username}`))}
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
                      <h3 className="">Community's teams</h3>

                      <TabsHeadlessUi
                        tab1title="Teams"
                        tab1={
                          <SelectListTeamsMembers
                            teamId={teamId}
                          />
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
  
  export default EditCommunityTeams