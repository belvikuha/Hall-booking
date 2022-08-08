import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer
  }
})

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))