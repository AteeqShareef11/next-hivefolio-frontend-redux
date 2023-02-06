/* Search */
import Select from 'react-select';
import { useEffect } from 'react';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../../redux/actions/teamActions';

const SelectTeams = ({ setTeamId, style1}) => {

    const teams = useSelector(state => state.allTeams.teams);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTeams(teams));
    }, []);

    return (
        <div className={style1}>
            <Select
                getOptionLabel={option => `${option.name}`}
                getOptionValue={option => option.id}
                options={teams}
                instanceId="teams"
                placeholder="Search for a team"
                isClearable
                onChange={value => setTeamId(value ? value.id : null)}
            />
        </div>
    )
}

export default SelectTeams