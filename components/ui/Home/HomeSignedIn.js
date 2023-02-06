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
  
  import { callApi } from '../../utils/utils';
  
  /* Components */
  import BannerAnnouncement from '../Banner/BannerAnnouncement';
  import CardProfile from '../Card/CardProfile';
  import CarouselProfiles from '../Carousel/CarouselProfiles';
  import Hexagon from '../Hexagon/Hexagon';
  import CardUser from '../Card/CardUser';
  import CardTeam from '../Card/CardTeam';

  import CardOrganisation from '../Card/CardOrganisation';
  import CardGame from '../Card/CardGame';
  import CardCharacter from '../Card/CardCharacter';
  import CardCommunity from '../Card/CardCommunity';
  import CardTwitch from '../Card/CardTwitch';
  import CarouselCards from '../Carousel/CarouselCards';
  import HeaderFeaturedUser from '../Header/HeaderFeaturedUser';
  import HeaderFeaturedTeam from '../Header/HeaderFeaturedTeam';
  import HeaderFeaturedOrganisation from '../Header/HeaderFeaturedOrganisation';
  import HeaderFeaturedCommunity from '../Header/HeaderFeaturedCommunity';
  import UpsellSignUp from '../Upsell/UpsellSignUp'

  /* Headless UI */
import TabsHeadlessUi from '../Tabs/TabsHeadlessUi';
  
  
  /* Contexts */
  import { useCurrentUser } from '../../context/AuthContext';
  
  /* Redux */
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchUsers } from '../../redux/actions/userActions';
  import { fetchTeams } from '../../redux/actions/teamActions';
  import { fetchOrganisations } from '../../redux/actions/organisationActions';
  import { fetchCommunities } from '../../redux/actions/communityActions';
  import { fetchGames } from '../../redux/actions/gameActions';
  import { fetchCharacters } from '../../redux/actions/characterActions';
  import { fetchTypeusers } from '../../redux/actions/typeuserActions';
  import { fetchJobs } from '../../redux/actions/jobActions';
  
  const HomeSignedIn = () => {
  
    const user = useCurrentUser();
    const [showLoading, setShowLoading] = useState(true);
    const [randomBanner, setRandomBanner] = useState(randomBannerNumber)
  
    /* Redux */
    const dispatch = useDispatch();
  
    const users = useSelector((state) => state.allData.users);
    const teams = useSelector((state) => state.allData.teams);
    const organisations = useSelector((state) => state.allData.organisations);
    const communities = useSelector((state) => state.allData.communities);
    const games = useSelector((state) => state.allData.games);
    const characters = useSelector((state) => state.allData.characters);
    const jobs = useSelector((state) => state.allData.jobs);
    const typeusers = useSelector((state) => state.allData.typeusers);

    const experiences = useSelector((state) => state.allData.experiences);

    const history = useHistory();
  
    const usersTwitch = users.filter((stream) => {
      return stream.stream_twitch !== undefined;
    })
  
    const teamsTwitch = teams.filter((stream) => {
      return stream.stream_twitch !== undefined;
    })
  
    const organisationsTwitch = organisations.filter((stream) => {
      return stream.stream_twitch !== undefined;
    })
  
    const communitiesTwitch = communities.filter((stream) => {
      return stream.stream_twitch !== undefined;
    })
  
    const gamesTwitch = games.filter((stream) => {
      return stream.stream_twitch !== undefined;
    })
  
    const combinedTwitch = [...usersTwitch, ...teamsTwitch, ...organisationsTwitch, ...communitiesTwitch, ...gamesTwitch ];
  
    let randomBannerNumber = Math.floor((Math.random() * 4) +1);
    console.log("randomBannerNumber", randomBannerNumber)
  
  
    
    return (


            <div>

                <TabsHeadlessUi
                    tab1title="Overview"
                    tab1={
                        <div>

                        </div>
                    
                    }
                    tab2title="For you"
                    tab2={
                        <div>
                            
                        </div>
                    }
                />
  
            </div>

    );
  };
  
  
  export default HomeSignedIn;
  