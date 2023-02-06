import { memo, useContext, useEffect, useState } from 'react';

/* Components */
import CardUser from '../Card/CardUser';
import CardGrid from '../CardGrid/CardGrid';

import CardUsers from '../Users/CardUsers';

/* Search */
import { useQuery, useQueryClient } from 'react-query';

const getUsersData = async key => {
  const userId = key.queryKey[1].user;
  const teamId = key.queryKey[2].team;
  const organisationId = key.queryKey[3].organisation;
  const gamesId = key.queryKey[4].games.map(id => `games.id=${id}`);
  const typeuserId = key.queryKey[5].typeuser;
  const page = key.queryKey[6];
  console.log('userId', userId);
  console.log('teamId', teamId);
  console.log('typeuserId', typeuserId);

  const gamesQueryString = gamesId.join('&');
  console.log('gamesQueryString+++', gamesQueryString);

  if (userId) {
    const res = await fetch(`https://hivefolio.herokuapp.com/api/users/${userId}?populate=*`);
    const data = await res.json();
    return [data];
  }

  if (teamId) {
    const res = await fetch(
      `https://hivefolio.herokuapp.com/api/users?teams.id=${teamId}&populate=*`
    );
    return res.json();
  }

  if (organisationId) {
    const res = await fetch(
      `https://hivefolio.herokuapp.com/api/users?organisations.id=${organisationId}&populate=*`
    );
    return res.json();
  }

  if (gamesQueryString) {
    const res = await fetch(
      `https://hivefolio.herokuapp.com/api/users?${gamesQueryString}&populate=*`
    );
    return res.json();
  }

  if (typeuserId) {
    const res = await fetch(
      `https://hivefolio.herokuapp.com/api/users?typeuser.id=${typeuserId}&populate=*`
    );
    return res.json();
  }

  if (teamId && gamesQueryString) {
    const res = await fetch(
      `https://hivefolio.herokuapp.com/api/users?teams.id=${teamId}&${gamesQueryString}&populate=*`
    );
    return res.json();
  }

  const resUsers = await fetch(
    `https://hivefolio.herokuapp.com/api/users?_limit=48&_start=${page * 48}&populate=*`
  );
  return resUsers.json();
};

const SelectListUsers = ({ userId, teamId, organisationId, gamesId, typeuserId }) => {
  const [page, setPage] = useState(0);

  const { data, status, isFetching, isPreviousData } = useQuery(
    [
      'users',
      { user: userId },
      { team: teamId },
      { organisation: organisationId },
      { games: gamesId },
      { typeuser: typeuserId },
      page,
    ],
    getUsersData
  );

  console.log("===================",data)

  return (
    <div>
      {/* Players */}
      {status === 'loading' && <div>I'm loading your players</div>}
      {status === 'error' && <div>Something went wrong</div>}
      <CardGrid
        style1={
          'grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 '
        }
      >
        {status === 'success' &&
          data
            .sort(() => Math.random() - 0.5)
            .map(user => (
              <CardUser
                id={user.id}
                user={user}
                username={user.username}
                image_profile={user.image_profile}
                email={user.email}
                gamertag={user.gamertag}
                /* team={user.teams.map((teamList) =>
                      teamList.name
                    )} */
                /* games={user.games.map((sub) =>
                      sub.name
                    )} */
                responsive={true}
              />
            ))}
      </CardGrid>

      <div className="pt-16 flex flex-col justify-center">
        {/* Pagination */}
        <div className="mb-4">
          <div className="mb-4">Current Page: {page + 1}</div>
          <div>
            <button
              onClick={() => setPage(old => Math.max(old - 1, 0))}
              disabled={page === 0}
              className="inline-flex items-center justify-center h-12  
                                    px-4 mr-2 font-medium tracking-wide transition 
                                    duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                    focus:shadow-outline focus:outline-none"
            >
              Previous Page
            </button>{' '}
            <button
              onClick={() => {
                /* console.log("isPreviousData:",isPreviousData);
                            console.log("data:",data); */
                if (!isPreviousData && data.length == 48) {
                  setPage(old => old + 1);
                }
              }}
              // Disable the Next Page button until we know a next page is available
              /*  disabled={isPreviousData || !data?.hasMore} */
              className="inline-flex items-center justify-center h-12  
                                    px-4 mr-2 font-medium tracking-wide transition 
                                    duration-200 bg-primary text-dark rounded-full hover:bg-dark hover:text-light
                                    focus:shadow-outline focus:outline-none"
            >
              Next Page
            </button>
          </div>
        </div>

        <div>{isFetching ? <span> Loading...</span> : null} </div>
      </div>
    </div>
  );
};

export default SelectListUsers;
