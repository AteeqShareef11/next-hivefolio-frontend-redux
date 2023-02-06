/* Search */
import Select from 'react-select';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

const SelectGames = ({ setUserId, showUsers, setTeamId, showTeams, setOrganisationId, showOrganisations, setGameId, showGames, style1}) => {

    const users = useSelector((state) => state.allData.users);
    const teams = useSelector((state) => state.allData.teams);
    const organisations = useSelector((state) => state.allData.organisations.data);
    const communities = useSelector((state) => state.allData.communities);
    const games = useSelector((state) => state.allData.games);
    const characters = useSelector((state) => state.allData.characters);

    // console.log("organisations=====",organisations)

    return (
        <div className={style1}>

            {showGames && (
                <div>    
                    <Select
                        getOptionLabel={option => `${option.attributes.name}`}
                        getOptionValue={option => option.id}
                        options={Array.isArray(games)?games:[]}
                        instanceId="games"
                        placeholder="Filter by game"
                        isClearable
                        onChange={value => setGameId(value ? value.id : null)}
                    />
                    <br />
                </div>
            )}

            {showUsers && (
                <div>  
                    <Select
                        getOptionLabel={option => `${option.gamertag} / @${option.username}`}
                        getOptionValue={option => option.id}
                        options={Array.isArray(users)?users:[]}
                        instanceId="users"
                        placeholder="Search for a user"
                        isClearable
                        onChange={value => setUserId(value ? value.id : null)}
                    />
                    <br />
                </div>
            )} 

            {showTeams && (
                <div> 
                    <Select
                        getOptionLabel={option => `${option.attributes.name}`}
                        getOptionValue={option => option.id}
                        options={Array.isArray(teams)?teams:[]}
                        instanceId="teams"
                        placeholder="Search for a team"
                        isClearable
                        onChange={value => setTeamId(value ? value.id : null)}
                    />
                    <br />
                </div>
            )}

            {showOrganisations && (
                <div> 
                    <Select
                        getOptionLabel={option => `${option.attributes.name}`}
                        getOptionValue={option => option.id}
                        options={Array.isArray(organisations)?organisations:[]}
                        instanceId="organisations"
                        placeholder="Search for a organisation"
                        isClearable
                        onChange={value => setOrganisationId(value ? value.id : null)}
                    />
                </div>
            )}

        </div>
    )
}

export default SelectGames