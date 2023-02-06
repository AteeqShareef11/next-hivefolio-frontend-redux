/* Search */
import Select from 'react-select';

const SelectCommunities = ({users, setUserId, teams, setTeamId, organisations, setOrganisationId, games, setGameId, communities, setCommunityId, style1}) => {


    return (
        <div className={style1}>
            <Select
                getOptionLabel={option => `${option.name}`}
                getOptionValue={option => option.id}
                options={communities}
                instanceId="communities"
                placeholder="filter by community"
                isClearable
                onChange={value => setCommunityId(value ? value.id : null)}
            />

        </div>
    )
}

export default SelectCommunities