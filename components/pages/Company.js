import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonRouterLink,
  IonSpinner,
  IonToolbar,
} from '@ionic/react';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

/* Components */
import { NavButtons } from '../ui/Buttons/NavButtons';
import Hexagon from '../ui/Hexagon/Hexagon';
import TabSub from '../ui/Tabs/TabSub';
import CardGrid from '../ui/CardGrid/CardGrid';
import Footer from '../ui/Footer/Footer';

/* Design */
import ReactMarkdown from 'react-markdown';

/* User */
import { callApi } from '../utils/utils';
import { useCurrentUser } from '../context/AuthContext';

/* Search */
import Select from 'react-select';
import { useQuery, useQueryClient } from 'react-query';
import moment from 'moment/moment';

const Company = ({ match, history }) => {
  const { id } = match.params;

  const [about, setAbout] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [termsConditions, setTermsConditions] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const location = useLocation();
  const tabFromUrl = new URLSearchParams(location.search).get('tab');

  // Used for the edit form

  const fetchData = async () => {
    try {
      const legalsRes = await fetch(`https://hivefolio.herokuapp.com/api/legals?populate=*`);
      const blogsData = await fetch(`https://hivefolio.herokuapp.com/api/blogs?populate=*`);
      const legalsData = await legalsRes.json();

      setAbout(legalsData.data[0]);
      setTermsConditions(legalsData.data[3]);
      setBlogs(blogsData);
      setShowLoading(false);
    } catch (err) {
      setShowLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log("about==========",about)
  return (
    <IonPage>
      <IonHeader>
        <title>Company</title>
        <IonToolbar className="">
          <IonRouterLink
            routerLink="/"
            className="flex pl-4 xs:hidden sm:hidden md:block lg:block xl:block"
          >
            <Hexagon />
          </IonRouterLink>
          <IonButtons slot="start" className="xs:block sm:block md:hidden lg:hidden xl:hidden">
            <IonBackButton />
          </IonButtons>
          <IonButtons slot="end">
            <NavButtons />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="m-auto">
          <IonLoading
            cssClass="my-custom-class"
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={'Please wait...'}
          />
        </div>
        <div>
          <div>
            <div className="max-width">
              {/* <!-- Tabs --> */}
              <div className="max-width">
                <TabSub initialTab={tabFromUrl}>
                  {/* Tab 1 */}
                  <div label="About Hivefolio">
                    {about.length !== 0 && (
                      <div className="gap-5 mx-4 md:flex-row mt-8 mb-20">
                        {/* Section 1 */}
                        <div className="mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                          {/* Left */}
                          <section className="xs:my-8 lg:col-start-1 w-full lg:-mt-1 xl:-mt-1">
                            <div className="flex flex-col gap-5 w-full">
                              <div className="bg-light rounded-3xl border-none p-8 w-full">
                                <h3>{about.attributes.title}</h3>

                                {/* Title */}
                                <div className="flex flex-col mb-4">
                                  <p className="font-bold">Date published</p>
                                  <p className="flow-auto">{moment(about.attributes.date_publish).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                </div>
                              </div>
                            </div>
                          </section>
                          {/* Right */}
                          <div className="lg:-mt-1 xl:-mt-1 col-span-2">
                            <div className="flex flex-col gap-5 sm:w-full xs:w-full">
                              {about.attributes.description && (
                                <div className="bg-light rounded-3xl border-none p-8 sm:w-full h-auto bg-cover bg-no-repeat">
                                  {/* Description */}
                                  <div className="flex flex-wrap mb-4">
                                    <ReactMarkdown>{about.attributes.description}</ReactMarkdown>

                                    <ReactMarkdown>{about.attributes.description2}</ReactMarkdown>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/*  */}
                      </div>
                    )}
                  </div>

                  {/* Tab 2 */}
                  <div label="Blog">
                    {/* Section 1 */}
                    <div className="mx-4 mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                      {/* Filters */}
                      <section className="xs:my-8 lg:col-start-1 w-full">
                        <div className="bg-light px-4 py-5 shadow rounded-lg ">
                          <div className="flex flex-col w-full">
                            <Select
                              getOptionLabel={option => `${option.username} ${option.gamertag}`}
                              getOptionValue={option => option.id}
                              /* options={users} */
                              instanceId="blogs"
                              placeholder="filter by blogs"
                              isClearable
                              /* onChange={value => setUserId(value ? value.id : null)} */
                            />

                            <br />

                            <Select
                              getOptionLabel={option => `${option.name}`}
                              getOptionValue={option => option.id}
                              /* options={teams} */
                              instanceId="data"
                              placeholder="filter by data"
                              isClearable
                              /* onChange={value => setTeamId(value ? value.id : null)} */
                            />
                          </div>
                        </div>
                      </section>

                      {/* Content */}
                      <div className="lg:mt-8 xl:mt-8 col-span-2">
                        {/* Placeholder */}
                        <div className="bg-light rounded-3xl border-none p-8 sm:w-full h-auto bg-cover bg-no-repeat">
                          {/* Description */}
                          <div className="flex flex-wrap mb-4">
                            <h2>Coming soon</h2>
                          </div>
                        </div>

                        {/* Players */}
                        {status === 'loading' && <div>I'm loading your players</div>}
                        {status === 'error' && <div>Something went wrong</div>}
                        <CardGrid
                          style1={
                            'grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 '
                          }
                        >
                          {status === 'success' &&
                            data.map(user => (
                              <CardUser
                                id={user.id}
                                image_profile={user.image_profile}
                                email={user.email}
                                gamertag={user.gamertag}
                                team={user.teams.map(teamList => teamList.name)}
                                games={user.games.map(sub => sub.name)}
                              />
                            ))}
                        </CardGrid>
                      </div>
                    </div>
                  </div>

                  {/* Tab 2 */}
                  <div label="Terms and Conditions">
                    {termsConditions.length!==0 &&(
                    <div className="gap-5 mx-4 md:flex-row mt-8 mb-20">
                      {/* Section 1 */}
                      <div className="mb-8 grid grid-cols-1 lg:gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                        {/* Left */}
                        <section className="xs:my-8 lg:col-start-1 w-full lg:-mt-1 xl:-mt-1">
                          <div className="flex flex-col gap-5 w-full">
                            <div className="bg-light rounded-3xl border-none p-8 w-full">
                              <h3>{termsConditions.attributes.title}</h3>

                              {/* Title */}
                              <div className="flex flex-col mb-4">
                                <p className="font-bold">Date published</p>
                                <p className="flow-auto">{moment(termsConditions.attributes.date_publish).format('MMMM Do YYYY, h:mm:ss a')}</p>
                              </div>
                            </div>
                          </div>
                        </section>
                        {/* Right */}
                        <div className="lg:-mt-1 xl:-mt-1 col-span-2">
                          <div className="flex flex-col gap-5 sm:w-full xs:w-full">
                            {termsConditions.attributes.description && (
                              <div className="bg-light rounded-3xl border-none p-8 sm:w-full h-auto bg-cover bg-no-repeat">
                                {/* Description */}
                                <div className="flex flex-wrap mb-4">
                                  <ReactMarkdown>{termsConditions.attributes.description}</ReactMarkdown>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/*  */}
                    </div>
                    )}
                  </div>
                </TabSub>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Company;
