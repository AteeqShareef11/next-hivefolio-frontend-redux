import { memo, useContext, useEffect, useState } from 'react';

/* Components */
import CardCommunity from '../Card/CardCommunity';
import CardGrid from '../CardGrid/CardGrid';

/* Search */
import { useQuery, useQueryClient } from 'react-query';

const getUsersData = async key => {
  console.log('key', key);
  const communityId = key.queryKey[1].community;
  const userId = key.queryKey[2].user;
  const gamesId = key.queryKey[3].games.map(id => `games.id=${id}`);
  const page = key.queryKey[4];
  console.log('communityId', communityId);
  console.log('userId', userId);

  const gamesQueryString = gamesId.join('&');
  console.log('gamesQueryString+++', gamesQueryString);

  if (communityId) {
    const res = await fetch(
      `https://hivefolio.herokuapp.com/api/communities/${communityId}?populate=*`
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
      `https://hivefolio.herokuapp.com/api/communities?members.id=${userId}&populate=*`
    );
    return res.json();
  }

  if (gamesQueryString) {
    const res = await fetch(
      `https://hivefolio.herokuapp.com/api/communities?${gamesQueryString}&populate=*`
    );
    return res.json();
  }

  /* if(teamId && gamesQueryString) {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/users?teams.id=${teamId}&${gamesQueryString}`);
      return res.json()
    } */

  const resUsers = await fetch(
    `https://hivefolio.herokuapp.com/api/communities?_limit=48&_start=${page * 48}&populate=*`
  );
  /* const resUsers = await fetch(`https://hivefolio.herokuapp.com/api/communities`); */
  return resUsers.json();
};

const SelectListTeams = ({ userId, teamId, organisationId, communityId, gamesId }) => {
  const [page, setPage] = useState(0);

  const { data, status, isFetching, isPreviousData } = useQuery(
    ['communities', { community: communityId }, { user: userId }, { games: gamesId }, page],
    getUsersData
  );

  return (
    <div>
      {/* Communities */}
      {status === 'loading' && <div>I'm loading your communities</div>}
      {status === 'error' && <div>Something went wrong</div>}
      <CardGrid
        style1={
          'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 '
        }
      >
        {status === 'success' &&
          data.data.map(community => (
            <CardCommunity
              id={community.id}
              community={community.attributes}
              username={community.attributes.username}
              image_profile={
                community.attributes.image_profile && community.attributes.image_profile
              }
              name={community.attributes.name}
              games={community.attributes.games?.data.map(sub => sub.attributes.name)}
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
