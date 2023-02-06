import { useState } from 'react';

/* Components */
import CardTeamListAddOrganisation from './CardTeamListAddOrganisation';

/* Search */
import {useQuery, useQueryClient} from 'react-query';

const getUsersData = async key => {
    console.log("key", key)
    const teamId = key.queryKey[1].user
    const page = key.queryKey[2];
    console.log('teamId', teamId)
    
    if(teamId) { 
      const res = await fetch(`https://hivefolio.herokuapp.com/api/teams/${teamId}`);
      const data = await res.json();
      return [data];
    }

    const resTeams = await fetch(`https://hivefolio.herokuapp.com/api/teams?populate=*&_limit=4&_start=${(page)*4}`);
    return resTeams.json()
  }

const SelectListTeams = ({teamId}) => {

    const [page, setPage]  =  useState(0);

    const {data, 
        status, 
        isFetching,
        isPreviousData,} = useQuery(['teams', {teams: teamId}, page],  getUsersData)

    return (
        <div>

            {/* Players */}
            {status === 'loading' && <div>I'm loading your teams</div>}
            {status === 'error' && <div>Something went wrong</div>}  
            {
            status === 'success' && data.map(team => (
            <CardTeamListAddOrganisation
            teamId={team.id}
                //organisationId={id}
                team={team}
                //users={users}
                image_profile={team.image_profile}
                name={team.name}
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

export default SelectListTeams