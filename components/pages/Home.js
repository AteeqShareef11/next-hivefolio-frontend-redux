import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonLoading, 
  IonPage, 
  IonRouterLink, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

/* Apollo */
import { useQuery, gql } from '@apollo/client';

const usersData = gql`
  query GetUsers {
    users {
      gamertag,
      id
    }
  }
`

/* Components */
import BannerAnnouncement from '../ui/Banner/BannerAnnouncement';
import HomeDefault from '../ui/Home/HomeDefault';
import HomeSignedOut from '../ui/Home/HomeSignedOut';
import Hexagon from '../ui/Hexagon/Hexagon';
import { NavButtons } from '../ui/Buttons/NavButtons';
import Footer from '../ui/Footer/Footer';

import CarouselCards from '../ui/Carousel/CarouselCards';
import CarouselProfiles from '../ui/Carousel/CarouselProfiles';
import CardSkeleton from '../ui/Card/CardSkeleton';
import CardProfileSkeleton from '../ui/Card/CardProfileSkeleton';
import HeaderFeaturedSkeleton from '../ui/Header/HeaderFeaturedSkeleton';

/* Images */
import hivefolioLogo from '../assets/logo-hivefolio.png';

/* Contexts */
import { useCurrentUser } from '../context/AuthContext';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
// import {fetchUsers} from '../redux/slices/userSlice'
// import { fetchCoreData } from '../redux/actions/coreActions';


const Home = () => {

  const loggedInUser = useCurrentUser();
  const users = useSelector((state) => state.allData.users);


  /* Apollo */
  const { loading, error, data} = useQuery(usersData);
  console.log("Home data", data);

  /* Redux */
  const dispatch = useDispatch();

  const [showLoading, setShowLoading] = useState(true);

  const allDataUsers = useSelector((state) => state.allData.users);
  console.log("Home allDataUsers", allDataUsers)

  /* useEffect(() => {
    dispatch(fetchCoreData());
  }, []); */

  
  return (
    <IonPage className="">
     
      <IonHeader className="">
        <IonToolbar className="">
          <div className="flex pl-4">
            <IonRouterLink routerLink="/"><Hexagon/></IonRouterLink>
          </div>
          <IonButtons slot="end" >
            <NavButtons className=""/>
          </IonButtons>
        </IonToolbar>
        <title>Hivefolio</title>
      </IonHeader>
      <IonContent fullscreen>     


        <div className="mt-8">
        <BannerAnnouncement/>

          {loggedInUser.isAuthenticated ? (
            <div>
              {users !== undefined ? (
                <div>
                  <HomeDefault/>
                </div>
              ) : (
                <div className="max-width">
                  <HeaderFeaturedSkeleton/>
                </div>
              )}
              
            </div>
            
          ) : (

            <div>
              <HomeSignedOut/>
            </div>
          )}
          

        </div>
        
      </IonContent>
    </IonPage>
  );
};


export default Home;
