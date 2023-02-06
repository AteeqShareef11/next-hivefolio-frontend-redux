/* Search */
import Select from 'react-select';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

const SelectCommunities = ({setUserId, showUsers, setTeamId, showTeams, setOrganisationId, showOrganisations, setCommunityId, showCommunities, setGameId, showGames, style1}) => {

    const users = useSelector((state) => state.allData.users);
    const teams = useSelector((state) => state.allData.teams);
    const organisations = useSelector((state) => state.allData.organisations.data);
    const communities = useSelector((state) => state.allData.communities.data);
    const games = useSelector((state) => state.allData.games);
    const characters = useSelector((state) => state.allData.characters);
    // console.log("users========>",users)
    // console.log("teams========>",teams)
    // console.log("organisations========>",organisations)
    // console.log("communities========>",communities)
    // console.log("games========>",games)
    
    return (
        <div className={style1}>

            {showUsers && (
                <div>
                    <Select
                        getOptionLabel={option => `${option.gamertag} / @${option.username}`}
                        getOptionValue={option => option.id}
                        options={users}
                        instanceId="users"
                        placeholder="filter by users"
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
                        options={teams}
                        instanceId="teams"
                        placeholder="filter by teams"
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
                        options={organisations}
                        instanceId="organisations"
                        placeholder="filter by organisations"
                        isClearable
                        onChange={value => setOrganisationId(value ? value.id : null)}
                    />
                    <br />
                </div>
            )}

            {showCommunities && ( 

                <div>
                    <Select
                        getOptionLabel={option => `${option.attributes.name}`}
                        getOptionValue={option => option.id}
                        options={communities}
                        instanceId="communities"
                        placeholder="filter by communities"
                        isClearable
                        onChange={value => setCommunityId(value ? value.id : null)}
                    />
                    <br />
                </div>
            )}

            {showGames && ( 

                <div>
                    <Select
                        getOptionLabel={option => `${option.attributes.name}`}
                        getOptionValue={option => option.id}
                        options={games}
                        instanceId="games"
                        isMulti
                        placeholder="filter by games"
                        onChange={values => setGameId(values.map(game => game.id))}
                    />
                </div>
            )}

        </div>
    )
}

export default SelectCommunities