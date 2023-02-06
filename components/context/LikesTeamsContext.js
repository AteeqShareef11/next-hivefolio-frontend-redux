
import { createContext, useState, useEffect, useContext } from 'react';
import {useCurrentUser} from './AuthContext';
import {callApi} from '../utils/utils';

export const LikesTeamsContext = createContext(null)

export default ({children}) => {

    const user = useContext(useCurrentUser);

    const [likesGiven, setLikesGiven] = useState({});
    const [likesReceived, setLikesReceived] = useState({})

    const loadLikesGiven = async () => {
        const response = await callApi({
            path: `/likes/given?user=${user.user.id}`
        })
        const data = await response.json()
        setLikesGiven(data)
    }
    loadLikesGiven()

    const loadLikesReceived = async () => {
        const response = await callApi({
            path: `/likes/received?team.members=${user.user.id}`
        })
        const data = await response.json()
        setLikesReceived(data)
    }
    loadLikesReceived()

    const reloader = () => {
        if(user) {

        }
    }

    useEffect(() => {
      reloader()  
    }, [user])
    useEffect(()=>{
        
    },[likesGiven])

    return (
        <LikesTeamsContext.Provider value={{likesGiven, likesReceived, reloader}}>
            {children}
        </LikesTeamsContext.Provider>
    )
}