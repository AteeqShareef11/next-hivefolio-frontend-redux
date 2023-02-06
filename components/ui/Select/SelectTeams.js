/* Search */
import Select from 'react-select';

import { useEffect, useState } from 'react';
import { callApi } from '../../utils/utils';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoreData } from '../../redux/actions/coreActions';

const SelectTeams = ({ setUserId, setTeamId, setOrganisationId, setGameId, style1}) => {

    const dispatch = useDispatch();

    const users = useSelector((state) => state.allData.users);
    const teams = useSelector((state) => state.allData.teams);
    const organisations = useSelector((state) => state.allData.organisations.data);
    const communities = useSelector((state) => state.allData.communities);
    const games = useSelector((state) => state.allData.games);
    const characters = useSelector((state) => state.allData.characters);

    console.log("Users is Here", users)
    console.log('Teams is Here', teams); 
    console.log('organisations is Here', organisations); 
    console.log('games is Here', games);

    
    useEffect(() => {
        dispatch(fetchCoreData());
    }, []);

    return (
      <div className={style1}>
        <Select
          getOptionLabel={option => `${option.attributes.name}`}
          getOptionValue={option => option.id}
          options={Array.isArray(teams) ? teams : []}
          instanceId="teams"
          placeholder="Search for a team"
          isClearable
          onChange={value => setTeamId(value ? value.id : null)}
        />

        <br />

        <Select
          getOptionLabel={option => `${option.gamertag} / @${option.username}`}
          getOptionValue={option => option.id}
          options={Array.isArray(users) ? users : []}
          instanceId="users"
          placeholder="Search for a user"
          isClearable
          onChange={value => setUserId(value ? value.id : null)}
        />

        <br />

        <Select
          getOptionLabel={option => `${option.attributes.name}`}
          getOptionValue={option => option.id}
          options={Array.isArray(organisations) ? organisations : []}
          instanceId="organisaions"
          placeholder="Search for a organisation"
          isClearable
          onChange={value => setOrganisationId(value ? value.id : null)}
        />

        <br />

        <Select
          getOptionLabel={option => `${option.attributes.name}`}
          getOptionValue={option => option.id}
          options={Array.isArray(games) ? games : []}
          instanceId="games"
          placeholder="filter by game"
          isClearable
          onChange={value => setGameId(value ? value.id : null)}
        />
      </div>
    );
}

export default SelectTeams