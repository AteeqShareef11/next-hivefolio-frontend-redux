/* Search */
import Select from 'react-select';

/* Redux */
import { useSelector } from 'react-redux';

const SelectUsers = ({ setUserId, style1}) => {


    const users = useSelector((state) => state.allUsers.users);

    return (
        <div className={style1}>
            <Select
                getOptionLabel={option => `${option.username} / ${option.gamertag}`}
                getOptionValue={option => option.id}
                options={users}
                instanceId="users"
                placeholder="filter by users"
                isClearable
                onChange={value => setUserId(value ? value.id : null)}
            />

        </div>
    )
}

export default SelectUsers