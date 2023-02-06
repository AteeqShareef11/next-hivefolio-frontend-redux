import {
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
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
import CardJob from '../../ui/Job/CardJob';
import CardTeamCopy from '../../ui/Card/CardTeamCopy';
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
import SlidesCards from '../../ui/Slides/SlideCards';
import UpsellSignUp from '../../ui/Upsell/UpsellSignUp';
import { NavButtons } from '../../ui/Buttons/NavButtons';
import DropdownAccount2 from '../../ui/Dropdown/DropdownAccount2';
import Accordion from '../../ui/Accordion/Accordion';
import Footer from '../../ui/Footer/Footer';
import FeatureCardUser from '../Feature/FeatureCardUser';

import DropdownHeadless from '../../ui/Dropdown/DropdownHeadless';
import ModalTest from '../../ui/Modal/ModalTest';
import CardUsers from '../../ui/Users/CardUsers';

import CardSkeleton from '../../ui/Card/CardSkeleton';
import CardProfileSkeleton from '../../ui/Card/CardProfileSkeleton';
import HeaderFeaturedSkeleton from '../../ui/Header/HeaderFeaturedSkeleton';

import TabSubTest from '../Tabs/TabSubTest';
import UpsellComingSoon from '../Upsell/UpsellComingSoon';

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

const HomeDefault = ({ query }) => {
  const user = useCurrentUser();
  const [showLoading, setShowLoading] = useState(true);
  const [randomBanner, setRandomBanner] = useState(randomBannerNumber);
  const tabFromUrl = new URLSearchParams(location.search).get('tab');

  const users = useSelector(state => state.allData.users);
  const teams = useSelector(state => state.allData.teams);
  const organisations = useSelector(state => state.allData.organisations);
  const communities = useSelector(state => state.allData.communities);
  const games = useSelector(state => state.allData.games);
  const characters = useSelector(state => state.allData.characters);
  const jobs = useSelector(state => state.allData.jobs);

  console.log('users HomeDefault', users);
  console.log('users length HomeDefault', users.length);

  const usersTwitch = users?.filter(stream => {
    return stream.stream_twitch !== undefined;
  });

  /* const teamsTwitch = teams.filter((stream) => {
    return stream.stream_twitch !== undefined;
  }) */

  /* const organisationsTwitch = organisations.filter((stream) => {
    return stream.stream_twitch !== undefined;
  }) */

  /* const communitiesTwitch = communities.filter((stream) => {
    return stream.stream_twitch !== undefined;
  }) */

  /* const gamesTwitch = games.filter((stream) => {
    return stream.stream_twitch !== undefined;
  }) */

  //const combinedTwitch = [...usersTwitch, ...teamsTwitch, ...organisationsTwitch, ...communitiesTwitch, ...gamesTwitch ];

  let randomBannerNumber = Math.floor(Math.random() * 4 + 1);
  console.log('randomBannerNumber', randomBannerNumber);

  /* const challongeFetch = async key => {

    const resUsers = await fetch(`https://api.challonge.com/v1/tournaments`);
    return resUsers.json();
  };

  useEffect(() => {
    challongeFetch();
  }, [])

  console.log("HomeDefault challongeFetch", challongeFetch) */

  return (
    <div>
      {/* <!-- Tabs --> */}
      {query}
      <TabSubTest initialTab={tabFromUrl}>
        {/* Tab 1 */}
        <div label="Discover">
          {users !== undefined && users.length <= 0 && <HeaderFeaturedSkeleton />}

          {randomBannerNumber === 1 && users && (
            <div>
              {users
                ?.sort(() => Math.random() - 0.5)
                .slice(0, 1)
                ?.map(user => (
                  <HeaderFeaturedUser
                    key={user.id}
                    id={user.id}
                    type_user={user.type_user}
                    games={user.games}
                    username={user.username}
                    gamertag={user.gamertag}
                    introduction={user.introduction}
                    image_profile={user.image_profile}
                    image_background={user.image_background}
                  />
                ))}
            </div>
          )}

          {randomBannerNumber === 2 && teams && (
            <div>
              {teams
                ?.sort(() => Math.random() - 0.5)
                .slice(0, 1)
                ?.map(team => (
                  <HeaderFeaturedTeam
                    team={team}
                    key={team.id}
                    id={team.id}
                    type_team={team.attributes.type_team}
                    games={team.attributes.games}
                    username={team.attributes.username}
                    gamertag={team.attributes.gamertag}
                    introduction={team.attributes.introduction}
                    image_profile={team.attributes.image_profile.data}
                    image_background={team.attributes.image_background.data}
                  />
                ))}
            </div>
          )}

          {randomBannerNumber === 3 && organisations.data && (
            <div>
              {organisations.data
                ?.sort(() => Math.random() - 0.5)
                .slice(0, 1)
                ?.map(organisation => (
                  <HeaderFeaturedOrganisation
                    organisation={organisation}
                    key={organisation.id}
                    id={organisation.id}
                    type_organisation={organisation.attributes.type_organisation}
                    games={organisation.attributes.games}
                    username={organisation.attributes.username}
                    gamertag={organisation.attributes.gamertag}
                    introduction={organisation.attributes.introduction}
                    image_profile={organisation.attributes.image_profile.data}
                    image_background={organisation.attributes.image_background.data}
                  />
                ))}
            </div>
          )}

          {randomBannerNumber === 4 && communities.data && (
            <div>
              {communities.data
                ?.sort(() => Math.random() - 0.5)
                .slice(0, 1)
                ?.map(community => (
                  <HeaderFeaturedCommunity
                    community={community}
                    key={community.id}
                    id={community.id}
                    type_community={community.attributes.type_community}
                    games={community.attributes.games}
                    username={community.attributes.username}
                    gamertag={community.attributes.gamertag}
                    introduction={community.attributes.introduction}
                    image_profile={community.attributes.image_profile.data}
                    image_background={community.attributes.image_background.data}
                  />
                ))}
            </div>
          )}

          {/* <UsersList /> */}

          {users !== undefined && users.length <= 0 ? (
            <CarouselProfiles>
              {Array(12)
                .fill(0)
                .map((item, i) => (
                  <CardProfileSkeleton id={i} />
                ))}
            </CarouselProfiles>
          ) : (
            <CarouselProfiles>
              {users
                ?.sort(() => Math.random())
                ?.map(user => (
                  <CardProfile
                    id={user.id}
                    username={user.username}
                    image_profile={user.image_profile}
                    gamertag={user.gamertag}
                  />
                ))}
            </CarouselProfiles>
          )}

          <div className="max-width">
            {/* {jobs && (
              <CarouselCards 
                titleText="Featured Jobs" 
                infinite={false}
                xl={1280} xlItems={3} xlScroll={3} xlInfinite={false}
                lg={1108} lgItems={2} lgScroll={2} lgInfinite={false}
                md={800} mdItems={2} mdScroll={2} mdInfinite={false}
                sm={700} smItems={1} smScroll={1} smInfinite={false}
                xs={320} xsItems={1} xsScroll={1} xsInfinite={false}
                linktext={"jobs"}
                link={`/jobs`}
              >
                {
                  jobs?.sort(() => Math.random() - 0.5)?.map(job => (
                    <CardJob
                      id={job.id}
                      job={job}
                      standard={true}
                    />
                  ))}
              </CarouselCards>
            )} */}

            {users !== undefined && users.length <= 0 ? (
              <div></div>
            ) : (
              <CarouselCards
                titleText="Featured Streams"
                infinite={false}
                xl={1280}
                xlItems={3}
                xlScroll={3}
                xlInfinite={false}
                lg={1108}
                lgItems={3}
                lgScroll={3}
                lgInfinite={false}
                md={800}
                mdItems={3}
                mdScroll={2}
                mdInfinite={false}
                sm={700}
                smItems={2}
                smScroll={1}
                smInfinite={false}
                xs={320}
                xsItems={1}
                xsScroll={1}
                xsInfinite={false}
                linktext={'players'}
                link={`/players`}
              >
                {usersTwitch
                  ?.sort(() => Math.random() - 0.5)
                  ?.map(user => (
                    <div>
                      <Link to={`/user/${user.username}`} className="z-20 hover:bg-primary">
                        <CardTwitch
                          twitchId={user.stream_twitch}
                          height="99.99%"
                          link1={`/user/${user.username}`}
                          gamertag={user.gamertag}
                          games={user.games?.map(sub => sub.name)}
                        />
                      </Link>
                    </div>
                  ))}
              </CarouselCards>
            )}

            {/* <div classNmae="xxs:hidden xs:hidden sm:block md:block lg:block xl:block">
              {
                users?.sort(() => Math.random() - 0.5).slice(0,1).map(user => (
                  <FeatureCardUser
                    id={user.id}
                    user={user}
                    style1="p-8 bg-light border-none"
                  />
              ))}
            </div> */}

            {users !== undefined && users.length <= 0 ? (
              <CarouselCards
                titleText="Featured Players"
                infinite={false}
                xl={1280}
                xlItems={6}
                xlScroll={6}
                xlInfinite={false}
                lg={1108}
                lgItems={4}
                lgScroll={3}
                lgInfinite={false}
                md={800}
                mdItems={3}
                mdScroll={2}
                mdInfinite={false}
                sm={700}
                smItems={2}
                smScroll={1}
                smInfinite={false}
                xs={320}
                xsItems={1}
                xsScroll={1}
                xsInfinite={false}
                linktext={'players'}
                link={`/players`}
              >
                {Array(8)
                  .fill(0)
                  .map((item, i) => (
                    <CardSkeleton key={i} full={true} />
                  ))}
              </CarouselCards>
            ) : (
              <CarouselCards
                titleText="Featured Players"
                infinite={false}
                xl={1280}
                xlItems={6}
                xlScroll={6}
                xlInfinite={false}
                lg={1108}
                lgItems={4}
                lgScroll={3}
                lgInfinite={false}
                md={800}
                mdItems={3}
                mdScroll={2}
                mdInfinite={false}
                sm={700}
                smItems={2}
                smScroll={1}
                smInfinite={false}
                xs={320}
                xsItems={1}
                xsScroll={1}
                xsInfinite={false}
                linktext={'players'}
                link={`/players`}
              >
                {users
                  ?.sort(() => Math.random() - 0.5)
                  ?.map(user => (
                    <CardUser
                      id={user.id}
                      username={user.username}
                      user={user}
                      image_profile={user.image_profile}
                      email={user.email}
                      gamertag={user.gamertag}
                      type_user={user.type_user}
                      team={user.teams?.map(teamList => teamList.name)}
                      games={user.games?.map(sub => sub.name)}
                      full={true}
                    />
                  ))}
              </CarouselCards>
            )}

            {/* {!user.isAuthenticated && (
                <UpsellSignUp />
              )} */}

            {teams !== undefined && teams.length <= 0 ? (
              <CarouselCards
                titleText="Featured Teams"
                infinite={false}
                xl={1280}
                xlItems={6}
                xlScroll={6}
                xlInfinite={false}
                lg={1108}
                lgItems={4}
                lgScroll={3}
                lgInfinite={false}
                md={800}
                mdItems={3}
                mdScroll={2}
                mdInfinite={false}
                sm={700}
                smItems={2}
                smScroll={1}
                smInfinite={false}
                xs={320}
                xsItems={1}
                xsScroll={1}
                xsInfinite={false}
                linktext={'teams'}
                link={`/teams`}
              >
                {Array(8)
                  .fill(0)
                  .map((item, i) => (
                    <CardSkeleton key={i} full={true} />
                  ))}
              </CarouselCards>
            ) : (
              <CarouselCards
                titleText="Featured teams"
                infinite={false}
                xl={1280}
                xlItems={6}
                xlScroll={6}
                xlInfinite={false}
                lg={1108}
                lgItems={4}
                lgScroll={3}
                lgInfinite={false}
                md={800}
                mdItems={3}
                mdScroll={2}
                mdInfinite={false}
                sm={700}
                smItems={2}
                smScroll={1}
                smInfinite={false}
                xs={320}
                xsItems={1}
                xsScroll={1}
                xsInfinite={false}
                linktext={'teams'}
                link={`/teams`}
              >
                {teams
                  ?.sort(() => Math.random() - 0.5)
                  ?.map(team => (
                    <CardTeam
                      id={team.id}
                      team={team}
                      username={team.attributes.username}
                      image_profile={team.attributes.image_profile}
                      name={team.attributes.name}
                      organisation={team?.attributes.organisations.data?.map(
                        teamList => teamList.attributes.name
                      )}
                      games={team?.attributes.games.data?.map(sub => sub.attributes.name)}
                      full={true}
                    />
                  ))}
              </CarouselCards>
            )}

            {organisations.data !== undefined && organisations.data.length <= 0 ? (
              <CarouselCards
                titleText="Featured Organisations"
                infinite={false}
                xl={1280}
                xlItems={6}
                xlScroll={6}
                xlInfinite={false}
                lg={1108}
                lgItems={4}
                lgScroll={3}
                lgInfinite={false}
                md={800}
                mdItems={3}
                mdScroll={2}
                mdInfinite={false}
                sm={700}
                smItems={2}
                smScroll={1}
                smInfinite={false}
                xs={320}
                xsItems={1}
                xsScroll={1}
                xsInfinite={false}
                linktext={'organisations'}
                link={`/organisations`}
              >
                {Array(8)
                  .fill(0)
                  .map((item, i) => (
                    <CardSkeleton key={i} full={true} />
                  ))}
              </CarouselCards>
            ) : (
              <CarouselCards
                titleText="Featured organisations"
                infinite={false}
                xl={1280}
                xlItems={6}
                xlScroll={6}
                xlInfinite={false}
                lg={1108}
                lgItems={4}
                lgScroll={3}
                lgInfinite={false}
                md={800}
                mdItems={3}
                mdScroll={2}
                mdInfinite={false}
                sm={700}
                smItems={2}
                smScroll={1}
                smInfinite={false}
                xs={320}
                xsItems={1}
                xsScroll={1}
                xsInfinite={false}
                linktext={'organisations'}
                link={`/organisations`}
              >
                {organisations.data
                  ?.sort(() => Math.random() - 0.5)
                  ?.map(organisation => (
                    <CardOrganisation
                      key={organisation.id}
                      id={organisation.id}
                      organisation={organisation}
                      username={organisation.attributes.username}
                      image_profile={organisation.attributes.image_profile}
                      name={organisation.attributes.name}
                      team={organisation.attributes.teams.data?.map(
                        teamList => teamList.attributes.name
                      )}
                      games={organisation.attributes.games.data?.map(sub => sub.attributes.name)}
                      full={true}
                    />
                  ))}
              </CarouselCards>
            )}

            {games.data !== undefined && games.data.length <= 0 ? (
              <CarouselCards
                titleText="Featured Games"
                infinite={false}
                xl={1280}
                xlItems={6}
                xlScroll={6}
                xlInfinite={false}
                lg={1108}
                lgItems={4}
                lgScroll={3}
                lgInfinite={false}
                md={800}
                mdItems={3}
                mdScroll={2}
                mdInfinite={false}
                sm={700}
                smItems={2}
                smScroll={1}
                smInfinite={false}
                xs={320}
                xsItems={1}
                xsScroll={1}
                xsInfinite={false}
                linktext={'games'}
                link={`/games`}
              >
                {Array(8)
                  .fill(0)
                  .map((item, i) => (
                    <CardSkeleton key={i} full={true} />
                  ))}
              </CarouselCards>
            ) : (
              <CarouselCards
                titleText="Featured games"
                infinite={false}
                xl={1280}
                xlItems={6}
                xlScroll={6}
                xlInfinite={false}
                lg={1108}
                lgItems={4}
                lgScroll={3}
                lgInfinite={false}
                md={800}
                mdItems={3}
                mdScroll={2}
                mdInfinite={false}
                sm={700}
                smItems={2}
                smScroll={1}
                smInfinite={false}
                xs={320}
                xsItems={1}
                xsScroll={1}
                xsInfinite={false}
                linktext={'games'}
                link={`/games`}
              >
                {games.data
                  ?.sort(() => Math.random() - 0.5)
                  ?.map(game => (
                    <CardGame
                      id={game.id}
                      game={game}
                      image_profile={game.attributes.image_profile}
                      name={game.attributes.name}
                      team={game.attributes.teams.data?.map(teamList => teamList.attributes.name)}
                      /* genres={game.typegenre?.map((genreList) =>
                          genreList.name
                        )} */
                      full={true}
                    />
                  ))}
              </CarouselCards>
            )}

            {communities.data !== undefined && communities.data.length <= 0 ? (
              <CarouselCards
                titleText="Featured Communities"
                infinite={false}
                xl={1280}
                xlItems={6}
                xlScroll={6}
                xlInfinite={false}
                lg={1108}
                lgItems={4}
                lgScroll={3}
                lgInfinite={false}
                md={800}
                mdItems={3}
                mdScroll={2}
                mdInfinite={false}
                sm={700}
                smItems={2}
                smScroll={1}
                smInfinite={false}
                xs={320}
                xsItems={1}
                xsScroll={1}
                xsInfinite={false}
                linktext={'communities'}
                link={`/communities`}
              >
                {Array(8)
                  .fill(0)
                  .map((item, i) => (
                    <CardSkeleton key={i} full={true} />
                  ))}
              </CarouselCards>
            ) : (
              <CarouselCards
                titleText="Featured communities"
                infinite={false}
                xl={1280}
                xlItems={6}
                xlScroll={6}
                xlInfinite={false}
                lg={1108}
                lgItems={4}
                lgScroll={3}
                lgInfinite={false}
                md={800}
                mdItems={3}
                mdScroll={2}
                mdInfinite={false}
                sm={700}
                smItems={2}
                smScroll={1}
                smInfinite={false}
                xs={320}
                xsItems={1}
                xsScroll={1}
                xsInfinite={false}
                linktext={'communities'}
                link={`/communities`}
              >
                {communities.data?.map(community => (
                  <CardCommunity
                    id={community.id}
                    community={community}
                    username={community.attributes.username}
                    image_profile={community.attributes.image_profile}
                    name={community.attributes.name}
                    team={community.attributes.teams.data?.map(
                      teamList => teamList.attributes.name
                    )}
                    games={community.attributes.games.data?.map(sub => sub.attributes.name)}
                    full={true}
                  />
                ))}
              </CarouselCards>
            )}

            {characters.data !== undefined && characters.data.length <= 0 ? (
              <CarouselCards
                titleText="Featured Characters"
                infinite={false}
                xl={1280}
                xlItems={6}
                xlScroll={6}
                xlInfinite={false}
                lg={1108}
                lgItems={4}
                lgScroll={3}
                lgInfinite={false}
                md={800}
                mdItems={3}
                mdScroll={2}
                mdInfinite={false}
                sm={700}
                smItems={2}
                smScroll={1}
                smInfinite={false}
                xs={320}
                xsItems={1}
                xsScroll={1}
                xsInfinite={false}
                linktext={'characters'}
                link={`/characters`}
              >
                {Array(8)
                  .fill(0)
                  .map((item, i) => (
                    <CardSkeleton key={i} full={true} />
                  ))}
              </CarouselCards>
            ) : (
              <CarouselCards
                titleText="Featured characters"
                infinite={false}
                xl={1280}
                xlItems={6}
                xlScroll={6}
                xlInfinite={false}
                lg={1108}
                lgItems={4}
                lgScroll={3}
                lgInfinite={false}
                md={800}
                mdItems={3}
                mdScroll={2}
                mdInfinite={false}
                sm={700}
                smItems={2}
                smScroll={1}
                smInfinite={false}
                xs={320}
                xsItems={1}
                xsScroll={1}
                xsInfinite={false}
                linktext={'characters'}
                link={`/characters`}
              >
                {characters.data
                  ?.sort(() => Math.random() - 0.5)
                  ?.map(character => (
                    <CardCharacter
                      id={character.id}
                      character={character}
                      image_profile={character.attributes.image_profile}
                      name={character.attributes.name}
                      style1={'grid text-center border-none rounded-3xl bg-light hover:bg-primary'}
                      style2={
                        'mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full bg-white'
                      }
                      style3={
                        'mx-auto bg-cover bg-no-repeat h-28 w-28 image-placeholder rounded-full placeholder overflow-hidden text-transparent'
                      }
                      games={character.attributes.games.data?.map(sub => sub.attributes.name)}
                      full={true}
                    />
                  ))}
              </CarouselCards>
            )}
          </div>
        </div>

        {/* Tab 2 */}
        <div label="For you">
          <UpsellComingSoon className="max-width xs:x-4 sm:x-4 md:x-4" />
        </div>
      </TabSubTest>
    </div>
  );
};

export default HomeDefault;
