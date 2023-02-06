import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/actions/userActions';

/* Components */
import CardUserListAddOrganisation from './CardUserListAddOrganisation';

/* Search */
import {useQuery, useQueryClient} from 'react-query';

const getUsersData = async key => {
    console.log('key', key);
    const userId = key.queryKey[1].user;
    const page = key.queryKey[2];
  
    if (userId) {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/users/${userId}?populate=*`);
      const data = await res.json();
      return [data];
    }
  
    const resUsers = await fetch(`https://hivefolio.herokuapp.com/api/users?_limit=4&_start=${page * 4}?populate=*`);
    return resUsers.json();
};

const SelectListUsers = ({userId}) => {
  const { id } = useParams()

  const users = useSelector((state) => state.allUsers.users);
  const dispatch = useDispatch();

  const [page, setPage]  =  useState(0);

  const { data, status, isFetching, isPreviousData } = useQuery(
      ['users', { user: userId }, page],
      getUsersData
  );

  /* useEffect(() => {
    dispatch(fetchUsers(users));
  }, []); */

    return (
        <div>

            {/* Players */}
            {status === 'loading' && <div>I'm loading your players</div>}
                        {status === 'error' && <div>Something went wrong</div>}
                        
                          {
                            status === 'success' && data.sort(() => Math.random() - 0.5).map(user => (
                                <CardUserListAddOrganisation
                                userId={user.id}
                                //organisationId={id}
                                user={user}
                                //users={users}
                                image_profile={user.image_profile}
                                email={user.email}
                                username={user.username}
                                gamertag={user.gamertag}
                                /* team={user.teams.map((teamList) =>
                                    teamList.name
                                    )} */
                                /* games={user.games.map((sub) =>
                                    sub.name
                                    )} */
                                />
                          ))}
                       

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
                          if (!isPreviousData && data.length == 4) {
                            setPage(old => old + 1);
                          }
                        }}
                        
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
    )
}

export default SelectListUsers