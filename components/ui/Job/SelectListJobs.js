import { useState } from 'react';

/* Components */
import CardTeam from '../Card/CardTeam';
import CardJob from '../Job/CardJob';
import CardGrid from '../CardGrid/CardGrid';

/* Search */
import {useQuery, useQueryClient} from 'react-query';

const getUsersData = async (key) => {
    console.log("key", key)
    const jobId = key.queryKey[1].job
    const teamId = key.queryKey[2].team
    const userId = key.queryKey[3].user
    const organisationId = key.queryKey[4].organisation
    const gameId = key.queryKey[5].game
    const typejobId = key.queryKey[6].typejob
    const page = key.queryKey[7];
  
    /* const gamesQueryString = gameId.join('&')
    console.log("gamesQueryString+++", gamesQueryString) */
    
    if(jobId) {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/jobs/${jobId}`);
      const data = await res.json();
      return [data];
    }
  
    if(userId) {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/jobs?members.id=${userId}`);
      return res.json()
    }

    if(teamId) {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/jobs/${teamId}`);
      const data = await res.json();
      return [data];
    }
  
    if(organisationId) {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/jobs?organisations.id=${organisationId}`);
      return res.json()
    }
  
    if(gameId) {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/jobs?games.id=${gameId}`);
      return res.json()
    }

    if(typejobId) {
      const res = await fetch(`https://hivefolio.herokuapp.com/api/jobs?type_job.id=${typejobId}`);
      return res.json()
    }
  
    const resJobs = await fetch(`https://hivefolio.herokuapp.com/api/jobs?_limit=8&_start=${(page)*8}`);
    return resJobs.json()
  }

const SelectListJobs = ({userId, teamId, organisationId, gameId, jobId, typejobId }) => {

    const [page, setPage]  =  useState(0);

    const {data, status, isFetching,
        isPreviousData,} = useQuery(['jobs',{job: jobId} , {team: teamId}, {user: userId}, {organisation: organisationId}, {game: gameId}, {typejob: typejobId}, page], getUsersData)

    return (
        <div>

            {/* Jobs */}
            {status === 'loading' && <div>I'm loading your jobs</div>}
                {status === 'error' && <div>Something went wrong</div>}
                <CardGrid style1={"grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4"}>
                {
                    status === 'success' && data.sort(() => Math.random() - 0.5).map(job => (
                    <CardJob
                        id={job.id}
                        job={job}
                        list={true}
                        /* edit={true}
                        view={true} */
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
                        console.log("isPreviousData:",isPreviousData);
                        console.log("data:",data);
                        if (!isPreviousData && data.length==8) {
                        setPage(old => old + 1)
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
    )
}

export default SelectListJobs