/* Search */
import Select from 'react-select';

import { useEffect, useState } from 'react';
import { callApi } from '../../utils/utils';

const SelectJobs = ({setUserId, setTeamId, setOrganisationId, setGameId, setJobId, setTypejobId, style1}) => {

    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [organisations, setOrganisations] = useState([]);
    const [games, setGames] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    const getData = async () => {
        try {
        const usersData = await callApi({ path: '/users?populate=*' });
        const teamsData = await callApi({ path: '/teams?populate=*' });
        const organisationsData = await callApi({ path: '/organisations' });
        const gamesData = await callApi({ path: '/games' });
        const jobsData = await callApi({ path: '/jobs' });

        setUsers(usersData)
        setTeams(teamsData)
        setOrganisations(organisationsData)
        setGames(gamesData)
        setJobs(jobsData)
        setShowLoading(false);
        } catch (err) {
        console.error(err);
        }
    };

    useEffect(() => {
        getData()
    }, []);

    return (
        <div className={style1}>
            {/* <Select
                getOptionLabel={option => `${option.title}`}
                getOptionValue={option => option.id}
                options={typejobs}
                instanceId="typejobs"
                placeholder="Search for job type"
                isClearable
                onChange={value => setTypejobId(value ? value.id : null)}
            />
            
            <br /> */}

            <Select
                getOptionLabel={option => `${option.title}`}
                getOptionValue={option => option.id}
                options={jobs}
                instanceId="jobs"
                placeholder="Search by job title"
                isClearable
                onChange={value => setJobId(value ? value.id : null)}
            />

            {/* <Select
                getOptionLabel={option => `${option.title}`}
                getOptionValue={option => option.id}
                options={teams}
                instanceId="teams"
                placeholder="Search for a team"
                isClearable
                onChange={value => setTeamId(value ? value.id : null)}
            />

            <br /> */}

            {/* <Select
                getOptionLabel={option => `${option.gamertag} / @${option.username}`}
                getOptionValue={option => option.id}
                options={users}
                instanceId="users"
                placeholder="Search for a user"
                isClearable
                onChange={value => setUserId(value ? value.id : null)}
            />

            <br /> */}

            {/* <Select
                getOptionLabel={option => `${option.name}`}
                getOptionValue={option => option.id}
                options={organisations}
                instanceId="organisaions"
                placeholder="Search for a organisation"
                isClearable
                onChange={value => setOrganisationId(value ? value.id : null)}
            />

            <br /> */}

            {/* <Select
                getOptionLabel={option => `${option.name}`}
                getOptionValue={option => option.id}
                options={games}
                instanceId="games"
                placeholder="filter by game"
                isClearable
                onChange={value => setGameId(value ? value.id : null)}
            /> */}


        </div>
    )
}

export default SelectJobs