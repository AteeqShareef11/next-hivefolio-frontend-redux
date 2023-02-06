import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* Components */
import CardUserModalMemberCommunity from './CardUserModalMemberCommunity';

/* Search */
import {useQuery, useQueryClient} from 'react-query';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/actions/userActions';
import { fetchCommunityId } from '../../redux/actions/communityActions';

const getUsersData = async key => {
  console.log('key', key);
  const id = key.queryKey[1].user;
  const page = key.queryKey[2];
  console.log('userId', id);

  /* if (id) {
    const res = await fetch(`https://hivefolio.herokuapp.com/api/users/${id}`);
    const data = await res.json();
    return [data];
  } */

  const resUsers = await fetch(`https://hivefolio.herokuapp.com/api/communities/${id}?populate=*`);
  return resUsers.json();

  /* const resUsers = await fetch(`https://hivefolio.herokuapp.com/api/teams/${id}/members?_limit=4&_start=${page * 4}`);
  return resUsers.json(); */
};

const SelectListMembers = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.allUsers.users);  
  const community = useSelector((state) => state.community);

    const [page, setPage]  =  useState(0);

    const { data, status, isFetching, isPreviousData } = useQuery(
      ['users', { user: id }, page],
      getUsersData
    );

    useEffect(() => {
      dispatch(fetchUsers(users));
      dispatch(fetchCommunityId(id));
    }, []);

    return (
        <div>

          

            {/* Players */}
            {status === 'loading' && <div>I'm loading your players</div>}
            {status === 'error' && <div>Something went wrong</div>}

            {status === 'success' &&
              data.members?.map(user => (
                <CardUserModalMemberCommunity
                  userId={user.id}
                  image_profile={user.image_profile}
                  //community={communityId}
                  //communityId={id}
                  //users={users}
                  email={user.email}
                  username={user.username}
                  gamertag={user.gamertag}
                  //updateData={updateData}
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

export default SelectListMembers