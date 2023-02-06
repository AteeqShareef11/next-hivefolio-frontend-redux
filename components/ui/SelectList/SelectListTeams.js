import { memo, useContext, useEffect, useState } from 'react';

/* Components */
import CardTeam from '../Card/CardTeam';
import CardGrid from '../CardGrid/CardGrid';

/* Search */
import { useQuery, useQueryClient } from 'react-query';

const getUsersData = async key => {
  console.log('key', key);
  const teamId = key.queryKey[1].team;
  const userId = key.queryKey[2].user;
  const organisationId = key.queryKey[3].organisation;
  const gameId = key.queryKey[4].game;
  const page = key.queryKey[5];
  // console.log("Team Id is Here",  teamId)
  /* const gamesQueryString = gameId.join('&')
    console.log("gamesQueryString+++", gamesQueryString) */

  if (teamId) {
    const res = await fetch(`https://hivefolio.herokuapp.com/api/teams/${teamId}?populate=*`);
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
      `https://hivefolio.herokuapp.com/api/teams?members.id=${userId}?populate=*`
    );
    const data = await res.json();
    return data;
  }

  if (organisationId) {
    const res = await fetch(
      `https://hivefolio.herokuapp.com/api/teams?organisations.id=${organisationId}?populate=*`
    );
    const data = await res.json();
    return data;
  }

  if (gameId) {
    const res = await fetch(
      `https://hivefolio.herokuapp.com/api/teams?games.id=${gameId}?populate=*`
    );
    const data = await res.json();
    return data;
  }

  const resTeams = await fetch(
    `https://hivefolio.herokuapp.com/api/teams?populate=*&_limit=48&_start=${page * 48}?populate=*`
  );
  const data = await resTeams.json();
  console.log("pageresTeams==========",data);
  return data;
};

const SelectListTeams = ({ userId, teamId, organisationId, gameId }) => {
  const [page, setPage] = useState(0);

  const { data, status, isFetching, isPreviousData } = useQuery(
    [
      'teams',
      { team: teamId },
      { user: userId },
      { organisation: organisationId },
      { game: gameId },
      page,
    ],
    getUsersData
  );
  console.log('The All Data is Here', data);
  return (
    <div>
      {/* Players */}
      {status === 'loading' && <div>I'm loading your Teams</div>}
      {status === 'error' && <div>Something went wrong</div>}
      <CardGrid
        style1={
          'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4'
        }
      >
        {status === 'success' &&
          Array.isArray(data.data) &&
          data.data
            .sort(() => Math.random() - 0.5)
            .map(team => (
              <CardTeam
                id={team.id}
                team={team}
                username={team.attributes.username}
                image_profile={team.attributes?.image_profile}
                name={team.attributes.name}
                location={team.attributes.location}
                games={team.attributes.games.data?.map(sub => sub.attributes.name)}
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
