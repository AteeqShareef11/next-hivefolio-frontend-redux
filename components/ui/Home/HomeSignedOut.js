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
  import { Link } from 'react-router-dom';
  
  import { callApi } from '../../utils/utils';
  
  /* Components */
  import BannerAnnouncement from '../../ui/Banner/BannerAnnouncement';
  import CardProfile from '../../ui/Card/CardProfile';
  import CarouselProfiles from '../../ui/Carousel/CarouselProfiles';
  import Hexagon from '../../ui/Hexagon/Hexagon';
  import CardUser from '../../ui/Card/CardUser';
  import CardTeam from '../../ui/Card/CardTeam';

  import CardOrganisation from '../../ui/Card/CardOrganisation';
  import CardGame from '../../ui/Card/CardGame';
  import CardCharacter from '../../ui/Card/CardCharacter';
  import CardCommunity from '../../ui/Card/CardCommunity';
  import CardTwitch from '../../ui/Card/CardTwitch';
  import CarouselCards from '../../ui/Carousel/CarouselCards';
  import HeaderFeaturedUser from '../../ui/Header/HeaderFeaturedUser';
  import HeaderFeaturedTeam from '../../ui/Header/HeaderFeaturedTeam';
  import HeaderFeaturedOrganisation from '../../ui/Header/HeaderFeaturedOrganisation';
  import HeaderFeaturedCommunity from '../../ui/Header/HeaderFeaturedCommunity';
  import UpsellSignUp from '../../ui/Upsell/UpsellSignUp'

  import HeroSignedOut01 from '../Hero/HeroSignedOut01';
  import HeroSignedOut02 from '../Hero/HeroSignedOut02';
  import HeaderShowcasePlayers from '../../ui/Header/HeaderShowcasePlayers';
  import FeatureSignedOut01 from '../Feature/FeatureSignedOut01';
  import FeatureSignedOut02 from '../Feature/FeatureSignedOut02';
  import FeatureSignedOut03 from '../Feature/FeatureSignedOut03';

  import HeaderShowcaseOrganisations from '../Header/HeaderShowcaseOrganisations';
  import CallToActionSignUp01 from '../CallToAction/CallToActionSignUp01';

  import Callout01 from '../Callout/Callout01';
  import Callout01User from '../Callout/Callout01User';

  import TabSubTest from '../Tabs/TabSubTest';

  /* Images */
  import FeatureSignedOut from '../../assets/images/FeatureSignedOut.png';
  import FeatureJobs from '../../assets/images/Feature_Jobs.png';
  import JobTypes from '../../assets/images/JobTypes.png';
  import SocialShare from '../../assets/images/SocialShare.png';
  import OrganisationCustom from '../../assets/images/OrganisationCustom.png';
  import OrganisationCenter from '../../assets/images/OrganisationCenter.png';
  import AccountsTogether from '../../assets/images/AccountsTogether.png';
  

  /* Headless UI */
import TabsHeadlessUi from '../../ui/Tabs/TabsHeadlessUi';
  
  
  /* Contexts */
  import { useCurrentUser } from '../../context/AuthContext';
  
  /* Redux */
  import { useDispatch, useSelector } from 'react-redux';
  
  const HomeSignedOut = ({query}) => {
  
    const user = useCurrentUser();
    const [showLoading, setShowLoading] = useState(true);
    //const [randomBanner, setRandomBanner] = useState(randomBannerNumber)
    const tabFromUrl = new URLSearchParams(location.search).get('tab');
  
    /* Redux */
    //const dispatch = useDispatch();

    const users = useSelector((state) => state.allData.users);
    const teams = useSelector((state) => state.allData.teams);
    const organisations = useSelector((state) => state.allData.organisations);
    const communities = useSelector((state) => state.allData.communities);
    const games = useSelector((state) => state.allData.games);
    const characters = useSelector((state) => state.allData.characters);

    const gamesWithBackground = Array.isArray(games) && games?.filter((game) => {
      return game.image_background !== undefined;
    })
    

    return (


            <div>

              {/* <!-- Tabs --> */}
              {query}
              <TabSubTest initialTab={tabFromUrl}>
                {/* Tab 1 */}
                <div label="For individuals">

                    <HeroSignedOut01/>
                    {/* <FeatureSignedOut01/> */}

                    {users && (
                      <div>
                      `{
                          users?.sort(() => Math.random() - 0.5).slice(0,1).map(user => (
                        <Callout01User
                          style01="flex flex-col px-12 py-16 mx-auto max-w-7xl lg:flex-row tails-selected-element"
                          style02="lg:mx-4 xl:mx-4 relative flex flex-col items-center justify-center flex-shrink-0 w-full max-w-2xl py-16 mx-auto rounded-lg lg:w-1/2 xl:w-5/12 px-4"
                          //subtitle="What Is tails?"
                          title01="Create and customize your profile in minutes"
                          text01="Connect your socials, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert."
                          bulletTitle01="Show"
                          bullet01="your experiences"
                          bulletTitle02="Integrate"
                          bullet02="your social and game activities"
                          buttonText="Get Stated - it's free"
                          buttonLink="/authportal"
                          image01={FeatureSignedOut}

                          id={user.id}
                          user={user}
                          styleProfile01="p-8 bg-light border-none"
                        />
                      ))}`
                      </div>
                    )}

                    {gamesWithBackground && (
                      <div className='max-width'>
                        {
                          gamesWithBackground?.sort(() => Math.random() - 0.5).slice(0,1).map(game =>
                          <CallToActionSignUp01
                            game={game}
                          />
                        )} 
                      </div>
                    )}

                    <Callout01
                      style01="flex flex-col px-12 py-16 mx-auto max-w-7xl lg:flex-row tails-selected-element lg:flex-row-reverse xl:flex-row-reverse"
                      style02="lg:mx-4 xl:mx-4 relative flex flex-col items-center justify-center flex-shrink-0 w-full max-w-2xl py-16 mx-auto rounded-lg lg:w-1/2 xl:w-5/12"
                      //subtitle="What Is tails?"
                      title01="Find new job opportunities for your career"
                      //title02="done right."
                      text01="Add your unique Hivefolio URL to all the platforms and places you find your audience."
                      bulletTitle01="Search"
                      bullet01="based your own preferences."
                      bulletTitle02="Discover"
                      bullet02="new career opportunities."
                      buttonText="Get Stated - it's free"
                      buttonLink="/authportal"
                      image01={FeatureJobs}
                    />     

                    <Callout01
                      style01="flex flex-col px-12 py-16 mx-auto max-w-7xl lg:flex-row tails-selected-element"
                      style02="lg:mx-4 xl:mx-4 relative flex flex-col items-center justify-center flex-shrink-0 w-full max-w-2xl py-16 mx-auto rounded-lg lg:w-1/2 xl:w-5/12"
                      //subtitle="What Is tails?"
                      title01="All your activities and experiences in one space."
                      //title02="done right."
                      text01="Bring all of your social network and gaming experiences into one space."
                      bulletTitle01="Gather"
                      bullet01="your social activies across many platforms."
                      bulletTitle02="Showcase"
                      bullet02="your experiences and activities."
                      bulletTitle03="Centralize"
                      bullet03="your achivements and scores in one profile."
                      buttonText="Get Stated - it's free"
                      buttonLink="/authportal"
                      image01={AccountsTogether}
                    /> 


                    <Callout01
                      style01="flex flex-col px-12 py-16 mx-auto max-w-7xl lg:flex-row tails-selected-element"
                      style02="lg:mx-4 xl:mx-4 relative flex flex-col items-center justify-center flex-shrink-0 w-full max-w-2xl py-16 mx-auto rounded-lg lg:w-1/2 xl:w-5/12"
                      subtitle="Network"
                      title01="Share your profile"
                      title02="anywhere you like!"
                      text01="Add your unique Hivefolio URL to all the platforms and places you find your audience."
                      bulletTitle01="Grow"
                      bullet01="your network and strengthen your brand."
                      bulletTitle02="Follow"
                      bullet02="and connect with your favourite players, organizations and more."
                      buttonText="Get Stated - it's free"
                      buttonLink="/authportal"
                      image01={SocialShare}
                    />

                    <Callout01
                      style01="flex flex-col px-12 py-16 mx-auto max-w-7xl lg:flex-row tails-selected-element"
                      style02="lg:mx-4 xl:mx-4 relative flex flex-col items-center justify-center flex-shrink-0 w-full max-w-2xl py-16 mx-auto rounded-lg lg:w-1/2 xl:w-5/12"
                      //subtitle="What Is tails?"
                      title01="Become more"
                      title02="than a player"
                      text01="Behind a player or a team is around 50 people in different roles who make the show happen."
                      bulletTitle01="Choose"
                      bullet01="your career path in esports"
                      //bulletTitle02="Discover"
                      //bullet02="new career opportunities."
                      //buttonText="Get Stated - it's free"
                      buttonLink="/authportal"
                      image01={JobTypes}
                    /> 

                    <HeaderShowcasePlayers/>
                    {gamesWithBackground && (
                      <div>
                        {
                          gamesWithBackground?.sort(() => Math.random() - 0.5).slice(0,1).map(game =>
                          <CallToActionSignUp01
                            game={game}
                          />
                        )} 
                      </div>
                    )}

                </div>


                {/* Tab 2 */}
                <div label="For organisations">
        
                    <HeroSignedOut02/>
                    <Callout01
                      style01="flex flex-col px-12 py-16 mx-auto max-w-7xl lg:flex-row tails-selected-element"
                      style02="lg:mx-4 xl:mx-4 relative flex flex-col items-center justify-center flex-shrink-0 w-full max-w-2xl py-16 mx-auto rounded-lg lg:w-1/2 xl:w-5/12 px-4"
                      subtitle="Be in control"
                      title01="Manage your organisation and become a leader"
                      //title02="anywhere you like!"
                      text01="Manage your organisation and become a leader."
                      bulletTitle01="Manage"
                      bullet01="your players and teams."
                      bulletTitle02="Manage"
                      bullet02="your communities and your brand."
                      buttonText="Get Stated - it's free"
                      buttonLink="/authportal"
                      image01={OrganisationCustom}
                    />

                    <Callout01
                      style01="flex flex-col px-12 py-16 mx-auto max-w-7xl lg:flex-row tails-selected-element lg:flex-row-reverse xl:flex-row-reverse"
                      style02="lg:mx-4 xl:mx-4 relative flex flex-col items-center justify-center flex-shrink-0 w-full max-w-2xl py-16 mx-auto rounded-lg lg:w-1/2 xl:w-5/12"
                      //subtitle="What Is tails?"
                      title01="Create"
                      title02="new opportunities."
                      text01="Post jobs and discover new talent to grow your organisation."
                      bulletTitle01="Find"
                      bullet01="talent from a wide range of specialisms."
                      bulletTitle02="Customize"
                      bullet02="preferences to narrow down your search."
                      buttonText="Get Stated - it's free"
                      buttonLink="/authportal"
                      image01={FeatureJobs}
                    /> 

                    {gamesWithBackground && (
                      <div className='max-width'>
                        {
                          gamesWithBackground?.sort(() => Math.random() - 0.5).slice(0,1).map(game =>
                          <CallToActionSignUp01
                            game={game}
                          />
                        )} 
                      </div>
                    )}

                    <Callout01
                      style01="flex flex-col px-12 py-16 mx-auto max-w-7xl lg:flex-row tails-selected-element"
                      style02="lg:mx-4 xl:mx-4 relative flex flex-col items-center justify-center flex-shrink-0 w-full max-w-2xl py-16 mx-auto rounded-lg lg:w-1/2 xl:w-5/12"
                      //subtitle="What Is tails?"
                      title01="All your activities and experiences in one space."
                      //title02="done right."
                      text01="Bring all of your social network and gaming experiences into one space."
                      bulletTitle01="Gather"
                      bullet01="your social activies across many platforms."
                      bulletTitle02="Showcase"
                      bullet02="your experiences and activities."
                      bulletTitle03="Centralize"
                      bullet03="your achivements and scores in one profile."
                      buttonText="Get Stated - it's free"
                      buttonLink="/authportal"
                      image01={AccountsTogether}
                    /> 

                    <Callout01
                      style01="flex flex-col px-12 py-16 mx-auto max-w-7xl lg:flex-row tails-selected-element"
                      style02="lg:mx-4 xl:mx-4 relative flex flex-col items-center justify-center flex-shrink-0 w-full max-w-2xl py-16 mx-auto rounded-lg lg:w-1/2 xl:w-5/12"
                      subtitle="Network"
                      title01="Share your profile"
                      title02="anywhere you like!"
                      text01="Add your unique Hivefolio URL to all the platforms and places you find your audience."
                      bulletTitle01="Grow"
                      bullet01="your network and strengthen your brand."
                      bulletTitle02="Follow"
                      bullet02="and connect with your favourite players, organizations and more."
                      buttonText="Get Stated - it's free"
                      buttonLink="/authportal"
                      image01={SocialShare}
                    />
                    <HeaderShowcaseOrganisations/>
                    {gamesWithBackground && (
                      <div>
                        {
                          gamesWithBackground?.sort(() => Math.random() - 0.5).slice(0,1).map(game =>
                          <CallToActionSignUp01
                            game={game}
                          />
                        )} 
                      </div>
                    )}

                </div>


              </TabSubTest>

                {/* <TabsHeadlessUi
                    tab1title="For individuals"
                    style1={"border-solid border-white border-t-8 border-b-8 sticky top-0 z-40"}
                    tab1={
                        <div>
                            <HeroSignedOut01/>
                            <FeatureSignedOut01/>
                            <HeaderShowcasePlayers/>
                        </div>
                    
                    }
                    tab2title="For organisations"
                    tab2={
                        <div>
                            
                        </div>
                    }
                /> */}
  
            </div>

    );
  };
  
  
  export default HomeSignedOut;
  