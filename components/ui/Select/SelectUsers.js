/* Search */
import Select from 'react-select';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

const SelectUsers = ({
  setUserId,
  showUsers,
  setTeamId,
  showTeams,
  setOrganisationId,
  showOrganisations,
  setGameId,
  showGames,
  typeusers,
  showTypeusers,
  setTypeuserId,
  style1,
}) => {
  const users = useSelector(state => state.allData.users);
  const teams = useSelector(state => state.allData.teams);
  const organisations = useSelector(state => state.allData.organisations.data);
  const communities = useSelector(state => state.allData.communities);
  const games = useSelector(state => state.allData.games);
  const characters = useSelector(state => state.allData.characters);
  console.log('user select==>', users);
  console.log('teams select==>', teams);
  console.log('organisations select==>', organisations);
  console.log('games select==>', games);

  return (
    <div className={style1}>
      {showUsers && (
        <div>
          <Select
            getOptionLabel={option => `${option.gamertag} / @${option.username}`}
            getOptionValue={option => option.id}
            options={Array.isArray(users) ? users : []}
            instanceId="users"
            placeholder="Filter by users"
            isClearable
            onChange={value => setUserId(value ? value.id : null)}
          />
          <br />
        </div>
      )}

      {showTypeusers && (
        <div>
          <Select
            getOptionLabel={option => `${option.attributes.name}`}
            getOptionValue={option => option.id}
            options={Array.isArray(typeusers) ? typeusers : []}
            instanceId="typeusers"
            placeholder="Filter by type"
            isClearable
            onChange={value => setTypeuserId(value ? value.id : null)}
          />
          <br />
        </div>
      )}

      {showTeams && (
        <div>
          <Select
            getOptionLabel={option => `${option.attributes.name}`}
            getOptionValue={option => option.id}
            options={Array.isArray(teams) ? teams : []}
            instanceId="teams"
            placeholder="Filter by teams"
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
            options={Array.isArray(organisations) ? organisations : []}
            instanceId="organisations"
            placeholder="Filter by organisation"
            isClearable
            onChange={value => setOrganisationId(value ? value.id : null)}
          />
          <br />
        </div>
      )}

      {showGames && (
        <div>
          <Select
            getOptionLabel={option => `${option.attributes.name}`}
            getOptionValue={option => option.id}
            options={Array.isArray(games) ? games : []}
            instanceId="games"
            isMulti
            placeholder="Filter by games"
            onChange={values => setGameId(values.map(game => game.id))}
          />
        </div>
      )}
    </div>
  );
};

export default SelectUsers;
