import { memo, useContext, useEffect, useState } from 'react';

/* Components */
import CardGame from '../Card/CardGame';
import CardGrid from '../CardGrid/CardGrid';

/* Search */
import { useQuery, useQueryClient } from 'react-query';

const getGamesData = async key => {
  console.log('key', key);
  const gameId = key.queryKey[1].game;
  const userId = key.queryKey[2].user;
  const teamId = key.queryKey[3].team;
  const organisationId = key.queryKey[4].organisation;
  const page = key.queryKey[5];
  /* const organisationId = key.queryKey[3].organisation */

  console.log('teamId', teamId);
  console.log('gameId', gameId);

  /* const gamesQueryString = gameId.join('&')
    console.log("gamesQueryString+++", gamesQueryString) */

  if (gameId) {
    const res = await fetch(`https://hivefolio.herokuapp.com/api/games/${gameId}?populate=*`);
    const data = await res.json();
    // console.log('gameId======', data);
    let arr = [];
    arr.push(data.data);
    let result = {
      data: arr,
      meta: data.meta,
    };
    return result;
  }

  if (teamId) {
    const res = await fetch(
      `https://hivefolio.herokuapp.com/api/games?teams.id=${teamId}&populate=*`
    );
    return res.json();
  }

  if (userId) {
    const res = await fetch(
      `https://hivefolio.herokuapp.com/api/games?players.id=${userId}&populate=*`
    );
    return res.json();
  }

  if (organisationId) {
    const res = await fetch(
      `https://hivefolio.herokuapp.com/api/games?organisations.id=${organisationId}&populate=*`
    );
    return res.json();
  }

  const resGames = await fetch(
    `https://hivefolio.herokuapp.com/api/games?_limit=48&_start=${page * 48}&populate=*`
  );
  return resGames.json();
};

const SelectListTeams = ({ userId, teamId, organisationId, gameId }) => {
  const [page, setPage] = useState(0);

  const { data, status, isFetching, isPreviousData } = useQuery(
    [
      'games',
      { game: gameId },
      { user: userId },
      { team: teamId },
      { organisation: organisationId },
      page,
    ],
    getGamesData
  );
  console.log('games data===>', data);
  return (
    <div>
      {/* Players */}
      {status === 'loading' && <div>I'm loading your games</div>}
      {status === 'error' && <div>Something went wrong</div>}
      <CardGrid
        style1={
          'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4'
        }
      >
        {status === 'success' &&
          data.data
            .sort(() => Math.random() - 0.5)
            .map(game => (
              <CardGame
                id={game.id}
                image_profile={game.attributes.image_profile}
                name={game.attributes.name}
                game={game}
                team={
                  game.attributes.teams.data !== null &&
                  Array.isArray(game.attributes.teams.data) &&
                  game.attributes.teams.data?.map(teamList => teamList.attributes.name)
                }
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
