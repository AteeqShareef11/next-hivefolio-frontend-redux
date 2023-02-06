/* gamesReducer in DevEd course */

import React, {  useReducer, useContext, createContext, useEffect } from "react";

const GameStateContext = createContext();
const GameDispatchContext = createContext();

const initalState = {
    popular: [],
    newGames: [],
    upcomingGames: [],
    searched: []
}


const reducer = ( state, action ) => {
    switch(action.type){
        case "FETCH_GAMES":
            return {...state, 
                popular: action.payload.popular,
                upcoming: action.payload.upcoming,
                newGames: action.payload.newGames,
            };
        default:
            return {...state}
    }
}

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer. initalState);
    const value = {
        popular: [],
        newGames: [],
        upcomingGames: [],
        searched: []
    }

    return (
        <GameDispatchContext.Provider value={dispatch}>
            <GameStateContext.Provider value={state}>
                {children}
            </GameStateContext.Provider>
        </GameDispatchContext.Provider>
    )
}

export const useGame = () => useContext(GameStateContext);
export const useDispatchGame = () => useContext(GameDispatchContext);