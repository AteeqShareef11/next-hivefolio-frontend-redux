import { memo, useContext, useEffect, useState } from 'react';

/* Components */
import CardOrganisation from '../Card/CardOrganisation';
import CardGrid from '../CardGrid/CardGrid';

/* Search */
import { useQuery, useQueryClient } from 'react-query';

const SelectListTeams = ({ userId, teamId, team, organisationId, gameId, source1, source2 }) => {
  const [page, setPage] = useState(0);
  const [cardData, setCardData] = useState([]);

  const getUsersData = async key => {
    console.log('key', key);
    const organisationId = key.queryKey[1].organisation;
    const userId = key.queryKey[2].user;
    const teamId = key.queryKey[3].team;
    const gameId = key.queryKey[4].game;
    const page = key.queryKey[5];

    console.log('organisationId', organisationId);
    console.log('gameId', gameId);

    /* const gamesQueryString = gameId.join('&')
      console.log("gamesQueryString+++", gamesQueryString) */

    if (organisationId) {
      const res = await fetch(
        `https://hivefolio.herokuapp.com/api/organisations/${organisationId}?populate=*`
      );
      const data = await res.json();
      let arr = [];
      arr.push(data.data);
      let result = {
        data: arr,
        meta: data.meta,
      };
      return result;
    }

    if (userId) {
      const res = await fetch(
        `https://hivefolio.herokuapp.com/api/organisations?members.id=${userId}&populate=*`
      );
      const data = await res.json();
      return data;
    }

    if (teamId) {
      const res = await fetch(
        `https://hivefolio.herokuapp.com/api/organisations?teams.id=${teamId}&populate=*`
      );
      const data = await res.json();
      return data;
    }

    if (gameId) {
      const res = await fetch(
        `https://hivefolio.herokuapp.com/api/organisations?games.id=${gameId}&populate=*`
      );
      const data = await res.json();
      return data;
    }

    if (source1) {
      const resOrganisations = await fetch(
        `https://hivefolio.herokuapp.com/api/${source1}?_limit=48&_start=${page * 48}&populate=*`
      );
      let data = await resOrganisations.json();
      return data;
    }

    if (source2) {
      const resOrganisations = await fetch(
        `https://hivefolio.herokuapp.com/api/teams/${source2}?organisations.id=${organisationId}?_limit=48&_start=${
          page * 48
        }&populate=*`
      );
      return resOrganisations.json();
    }
  };

  const { data, status, isFetching, isPreviousData } = useQuery(
    [
      'organisations',
      { organisation: organisationId },
      { user: userId },
      { team: teamId },
      { game: gameId },
      page,
    ],
    getUsersData
  );

  console.log('data data', data);
  return (
    <div>
      {/* Organisations */}
      {status === 'loading' && <div>I'm loading organisaions</div>}
      {status === 'error' && <div>Something went wrong</div>}
      <CardGrid
        style1={
          'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4'
        }
      >
        {status === 'success' &&
          Array.isArray(data.data) &&
          data.data.map(organisation => (
            <CardOrganisation
            key={organisation.id} 
              id={organisation.id}
              organisation={organisation}
              username={organisation.attributes.username}
              image_profile={organisation.attributes.image_profile}
              name={organisation.attributes.name}
              team={organisation.attributes.teams.data?.map((teamList) =>
                teamList.attributes.name
              )}
              games={organisation.attributes.games.data?.map((sub) =>
                sub.attributes.name
              )}
              responsive={true}
            />
          ))}
      </CardGrid>

      <div className="pt-16">
        {/* Pagination */}
        <span>Current Page: {page + 1}</span>
        <button
          onClick={() => setPage(old => Math.max(old - 1, 0))}
          disabled={page === 0}
          className="inline-flex items-center justify-center h-12  
                                px-6 mr-2 font-medium tracking-wide transition 
                                duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                focus:shadow-outline focus:outline-none"
        >
          Previous Page
        </button>{' '}
        <button
          onClick={() => {
            console.log('isPreviousData:', isPreviousData);
            console.log('data:', data);
            if (!isPreviousData && data.length == 48) {
              setPage(old => old + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          /*  disabled={isPreviousData || !data?.hasMore} */
          className="inline-flex items-center justify-center h-12  
                                px-6 mr-2 font-medium tracking-wide transition 
                                duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                focus:shadow-outline focus:outline-none"
        >
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null}{' '}
      </div>
    </div>
  );
};

export default SelectListTeams;
