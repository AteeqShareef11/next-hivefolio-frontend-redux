/* Search */
import Select from 'react-select';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

const SelectCharacters = ({setUserId, showUsers, setTeamId, showTeams, setOrganisationId, showOrganisations, setGameId, showGames, setCharacterId, showCharacters, style1}) => {

    const users = useSelector((state) => state.allData.users);
    const teams = useSelector((state) => state.allData.teams);
    const organisations = useSelector((state) => state.allData.organisations);
    const communities = useSelector((state) => state.allData.communities);
    const games = useSelector((state) => state.allData.games);
    const characters = useSelector((state) => state.allData.characters.data);
// console.log("characters=======",characters)
    return (
        <div className={style1}>

            {showCharacters && (
                <div>
                    <Select
                        getOptionLabel={option => `${option.attributes.name}}`}
                        getOptionValue={option => option.id}
                        options={characters}
                        instanceId="characters"
                        placeholder="Search for a character"
                        isClearable
                        onChange={value => setCharacterId(value ? value.id : null)}
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
                        placeholder="filter by game"
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
                        options={users}
                        instanceId="users"
                        placeholder="Search for a user"
                        isClearable
                        onChange={value => setUserId(value ? value.id : null)}
                    />
                </div>
            )}

        </div>
    )
}

export default SelectCharacters