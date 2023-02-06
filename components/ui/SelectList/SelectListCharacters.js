import { memo, useContext, useEffect, useState } from 'react';

/* Components */
import CardCharacter from '../Card/CardCharacter';
import CardGrid from '../CardGrid/CardGrid';

/* Search */
import { useQuery, useQueryClient } from 'react-query';

const getCharactersData = async key => {
  console.log('key', key);
  const characterId = key.queryKey[1].character;
  const gameId = key.queryKey[2].game;
  const userId = key.queryKey[3].user;
  const page = key.queryKey[4];
  console.log('characterId', characterId);
  console.log('gameId', gameId);

  /* const gamesQueryString = gameId.join('&')
    console.log("gamesQueryString+++", gamesQueryString) */

  if (characterId) {
    const res = await fetch(`https://hivefolio.herokuapp.com/api/characters/${characterId}?populate=*`);
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

  if (gameId) {
    const res = await fetch(`https://hivefolio.herokuapp.com/api/characters?games.id=${gameId}&populate=*`);
    return res.json();
  }

  if (userId) {
    const res = await fetch(`https://hivefolio.herokuapp.com/api/characters?players.id=${userId}&populate=*`);
    return res.json();
  }

  /* if(gamesQueryString) {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/teams?${gamesQueryString}`);
      return res.json()
    } */

  /* if(teamId && gamesQueryString) {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/users?teams.id=${teamId}&${gamesQueryString}`);
      return res.json()
    } */

  const resTeams = await fetch(
    `https://hivefolio.herokuapp.com/api/characters?_limit=48&_start=${page * 48}&populate=*`
  );
  return resTeams.json();
};

const SelectListTeams = ({ userId, teamId, organisationId, gameId, characterId }) => {
  const [page, setPage] = useState(0);

  const { data, status, isFetching, isPreviousData } = useQuery(
    ['characters', { character: characterId }, { game: gameId }, { user: userId }, page],
    getCharactersData
  );

  return (
    <div>
      {/* Players */}
      {status === 'loading' && <div>I'm loading characters</div>}
      {status === 'error' && <div>Something went wrong</div>}
      <CardGrid
        style1={
          'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4'
        }
      >
        {status === 'success' &&
          data.data
            .sort(() => Math.random() - 0.5)
            .map(character => (
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
                games={character.attributes.games.data.map(sub => sub.attributes.name)}
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
