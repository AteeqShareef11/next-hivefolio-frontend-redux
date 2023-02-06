import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from "./reducers/index";

let composeEnhancers = compose;
if (typeof window !== 'undefined') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

/* const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
); */
const store = createStore(
    reducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store



/* composeEnhancers(applyMiddleware(thunk)) */

// ==============> new store <===========
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './slices/userSlice'
// import achievementReducer from './slices/achievementSlice'
// const reducer = {
//   users: userReducer,
//   achievement: achievementReducer,
// }

//  export const store2 = configureStore({
//   reducer,
//   devTools: true,
// })

// export default store;
