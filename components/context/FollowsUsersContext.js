
import { createContext, useState, useEffect, useContext } from 'react';
import {useCurrentUser} from './AuthContext';
import {callApi} from '../utils/utils';

export const FollowsUsersContext = createContext(null)

export default ({children}) => {

    const user = useContext(useCurrentUser);

    const [followsGiven, setFollowsGiven] = useState({});
    const [followsReceived, setFollowsReceived] = useState({})
    
    const reloader = () => {
        if(user) {
            const loadFollowsGiven = async () => {
                const response = await callApi({
                    path: `/followusers/given?user=${user.user.id}`
                })
                const data = await response.json()
                setFollowsGiven(data)
            }
            loadFollowsGiven()

            const loadFollowsReceived = async () => {
                const response = await callApi({
                    path: `/followorusers/received?userfollower.members=${user.user.id}`
                })
                const data = await response.json()
                setFollowsReceived(data)
            }
            loadFollowsReceived()
        }
    }

    useEffect(() => {
      reloader()  
    }, [user])

    return (
        <FollowsUsersContext.Provider value={{followsGiven, followsReceived, reloader}}>
            {children}
        </FollowsUsersContext.Provider>
    )
}