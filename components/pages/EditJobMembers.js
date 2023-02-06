import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
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

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import NavigationAccordion from '../ui/Navigation/NavigationAccordion';
import Footer from '../ui/Footer/Footer';
import SelectListUsers from '../ui/Team/SelectListUsers';
import SelectListMembers from '../ui/Team/SelectListMembers';
import SelectUsers from '../ui/Team/SelectUsers';

/* Headless UI */
import TabsHeadlessUi from '../ui/Tabs/TabsHeadlessUi';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/actions/userActions';
import { fetchTeamId, removeSelectedTeam } from '../redux/actions/teamActions';
import { fetchNotifications } from '../redux/actions/notificationActions';
import { fetchTypenotifications } from '../redux/actions/typenotificationActions';


const EditJobMembers = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const user = useCurrentUser();
  const history = useHistory();

  const users = useSelector((state) => state.allUsers.users);  
  const team = useSelector(state => state.team);
  const notifications = useSelector((state) => state.allNotifications.notifications);
  //const typenotifications = useSelector((state) => state.allTypenotifications.typenotifications);

  const [showLoading, setShowLoading] = useState(true);

  const [userId, setUserId] = useState(null);

  /* const adminId = team.admins?.find((person) => {
    return person.id === user.id;
  }) */

  useEffect(() => {
    dispatch(fetchUsers(users));
    dispatch(fetchTeamId(id));
    dispatch(fetchNotifications(notifications));
    //dispatch(fetchTypenotifications());
    
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <title>Edit Team Members - {team.username}</title>
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
        {/* <IonLoading
          cssClass='my-custom-class'
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Please wait...'}
        /> */}
        <div className="max-width mx-8">
          <div className="mt-8 mx-8">
            <h1>{team.name}</h1>
            <Link to={`/team/${team.username}`}>
              <button className="bg-primary sm-mt-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-dark hover:bg-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                View {team.name}'s profile
              </button>
            </Link>
          </div>

          {/* {(!showLoading && !adminId) && (history.push(`/team/${team.username}`))} */}

          <main className="relative mx-8">
            <div >
              <NavigationAccordion
                header="Menu"
                link_01="edit"
                link_01_title="Overall"
                style_01="hover:bg-primary"
                
                link_02="edit-media"
                link_02_title="Media"
                style_02="hover:bg-primary"

                link_03="edit-members"
                link_03_title="Members"
                style_03="bg-primary"

                link_04="edit-settings"
                link_04_title="Settings"
                style_04="hover:bg-primary"
              />

              <h3 className="">Team members</h3>


              <TabsHeadlessUi
                tab1title="Members"
                tab1={
                  <SelectListMembers
                    setShowLoading={setShowLoading}
                  />
                }
                tab2title="Add members"
                tab2={
                  <div>
                    <SelectUsers
                      users={users}
                      setUserId={setUserId}
                    />
                    <SelectListUsers
                      userId={userId} 
                    />
                  </div>
                }
              />

            </div>
          </main>
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default EditJobMembers;
