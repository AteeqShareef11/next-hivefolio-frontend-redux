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
    IonToolbar,
  } from '@ionic/react';
  
  import { useLocation } from 'react-router';
  import { useContext, useEffect, useState } from 'react';
  
  /* Components */
  import { NavButtons } from '../ui/Buttons/NavButtons';
  import Hexagon from '../ui/Hexagon/Hexagon';
  import Footer from '../ui/Footer/Footer';

  import CardNotification from '../ui/Notifications/CardNotification';
  import SelectListNotifications from '../ui/Notifications/SelectListNotifications';

  /* Headless UI */
  import TabsHeadlessUi from '../ui/Tabs/TabsHeadlessUi';
  
  /* Contexts */
  import { useCurrentUser } from '../context/AuthContext';

  /* Design */
  import { Link } from 'react-router-dom';

  /* Redux */
  import { useDispatch, useSelector } from 'react-redux';
  
  const Notifications = ({  }) => {

    const dispatch = useDispatch();
    //const notifications = useSelector((state) => state.allNotifications.notifications);
    const notifications = useSelector((state) => state.allData.notifications);
   
  
    /* useEffect(() => {
      //dispatch(fetchUsers());
      //dispatch(fetchTeams());
      //dispatch(fetchOrganisations());
      //dispatch(fetchCommunities());
      //dispatch(fetchNotifications(notifications));
    }, []); */
  
    return (
      <IonPage>
      <IonHeader>
        <title>Notifications</title>
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
        <div className="max-width">
          

            <div className="max-width px-4">
              <h1 className="">Notifications</h1>

              <TabsHeadlessUi
                tab1title="Received"
                tab1={
                  <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    {/* Filters */}
                    <section className="xs:my-8 lg:col-start-1 w-full">
                      <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                    </section>
                    {/* Content */}
                    <div className="lg:mt-6 xl:mt-6 col-span-2">

                      <SelectListNotifications/>
                      
                    </div>
                  </div>
                }   
                tab2title="Sent"
                tab2={
                  <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    {/* Filters */}
                    <section className="xs:my-8 lg:col-start-1 w-full">
                      <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                    </section>
                    {/* Content */}
                    <div className="lg:mt-6 xl:mt-6 col-span-2">
                      
                    </div>
                  </div>
                }
              />
              
            </div>

            {/* <div className="max-width px-4">

              <div className=" mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">

                <section className="xs:my-8 lg:col-start-1 w-full">
                  <div className="bg-light px-4 py-5 shadow rounded-lg ">Filter</div>
                </section>
               
                <div className="lg:-mt-10 xl:-mt-10 col-span-2">
                  
                </div>
              </div>
            </div> */}

        </div>
        <Footer />
      </IonContent>
    </IonPage>
    );
  };
  
  export default Notifications;
  