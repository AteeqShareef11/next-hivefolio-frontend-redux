import React from 'react';
import { connect } from 'react-redux';

const UsersList = ({users}) => {
  return(
    <div>{
        users.length > 0 && users.map(user =>  (
            <div>
                <p> Username: {user.username}</p>
                <p> Gamertag: {user.gamertag}</p>
            </div>
        ))
    }</div>
  );
};

const mapStateToProps = (state) => ({
    users: state.users
});

export default connect(mapStateToProps)(UsersList);
