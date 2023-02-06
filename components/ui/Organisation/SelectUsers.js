/* Search */
import Select from 'react-select';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/actions/userActions';

const SelectUsers = ({ setUserId, style1}) => {

    const users = useSelector((state) => state.allUsers.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers(users));
    }, []);

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