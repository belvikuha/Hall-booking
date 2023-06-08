import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userReducer";
import conferenceReducer from './conferenceReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    conference: conferenceReducer
  }
})

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))