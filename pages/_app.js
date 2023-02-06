import Head from 'next/head';

import 'tailwindcss/tailwind.css';
import '@ionic/react/css/core.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '../styles/global.css';
import '../styles/variables.css';
import '../styles/index.css';
import '../styles/indextest.scss';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Provider } from 'react-redux';
import store from '../components/redux/store';
// import { store2 } from '../components/redux/store';

/* Apollo */
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

/* Apollo client */
const apolloClient = new ApolloClient({
  uri: 'https://hivefolio.herokuapp.com/graphql',
  cache: new InMemoryCache()
})

/* Context */
import {CurrentUserProvider} from '../components/context/AuthContext';
import FollowsTeamsContext from '../components/context/FollowsTeamsContext';
import FollowsOrganisationsContext from '../components/context/FollowsOrganisationsContext';
import FollowsCharactersContext from '../components/context/FollowsCharactersContext';
import FollowsGamesContext from '../components/context/FollowsGamesContext';
import FollowsCommunitiesContext from '../components/context/FollowsCommunitiesContext';
import FollowsEventsContext from '../components/context/FollowsEventsContext';
import FollowsUsersContext from '../components/context/FollowsUsersContext';


/* Analytics */
import * as gtag from '../components/utils/gtag';
import { hotjar } from 'react-hotjar';

/* hotjar.initialize({hjid:2539368,hjsv:6});
hotjar.identify('USER_ID', { userProperty: 'value' }); */

/* Search */
import {QueryClientProvider, QueryClient} from 'react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});


import { ReactQueryDevtools } from 'react-query/devtools'

/* Dark Mode */
import { DarkModeProvider } from '../components/context/DarkModeContext';

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  


  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        ></meta>
        <script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></script>
      </Head>
      <QueryClientProvider client={queryClient}>
        <CurrentUserProvider>
          <ApolloProvider client={apolloClient}>
            <FollowsUsersContext>
              <FollowsOrganisationsContext>
                <FollowsTeamsContext>
                  <FollowsCharactersContext>
                    <FollowsGamesContext>
                      <FollowsCommunitiesContext>
                        <FollowsEventsContext>
                          <Provider store={store}>
                            {/* <Provider store={store2}> */}
                              <Component {...pageProps} />
                              <ReactQueryDevtools initialIsOpen={false} className="bottom-right" />
                            {/* </Provider> */}
                          </Provider>
                        </FollowsEventsContext>
                      </FollowsCommunitiesContext>
                    </FollowsGamesContext>
                  </FollowsCharactersContext>
                </FollowsTeamsContext>
              </FollowsOrganisationsContext>
            </FollowsUsersContext>
          </ApolloProvider>
        </CurrentUserProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
