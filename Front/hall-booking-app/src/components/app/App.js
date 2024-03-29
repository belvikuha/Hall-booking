import './App.css';

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import {useEffect, useState} from 'react'

import {useDispatch, useSelector} from "react-redux";
import MainPage from '../pages/MainPage.js';
import LoginPage from '../pages/LoginPage.js';
import Page404 from '../pages/404.js';
import DemoPage from '../pages/DemoPage';

import CalendarWrapper from '../calendar/Calendar';
import AddConfForm from '../addConfForm/AddConfForm';

import MainLoyout from '../layouts/MainLoyout';
import  RequireAuth  from '../../hoc/RequireAuth';
// import AppHeader from "../appHeader/AppHeader";

// import CreateEventWithNoOverlap from '../calendar/demoCalendar';

// import {auth} from "../../actions/user"

import { loading as setL } from '../../reducers/userReducer';

import {UserActions} from "../../actions/user"
import useConfService from '../../services/ConfService';

import { getAuth, getLoading, getUserId,  } from '../../selectors/userSelectors';

import { getUsers } from '../../actions/user';
import Spinner from '../spiner/Spiner';

function App() {

  // const isAuth = useSelector(getAuth)
  // const name = useSelector(state => state.user.currentUser.userName)
  const id = useSelector(getUserId )

  // const loading = useSelector(getLoading)

  const dispatch = useDispatch()

  const{auth} = UserActions()
  const {getAllConfs, fetchHallColors} = useConfService()


  

  useEffect(() => {
    console.log('uef info')
      dispatch(auth()).then(()=>{
        dispatch(getAllConfs())
        dispatch(fetchHallColors())
      })

  
  }, [])

  return ( 

    <Router>
        <div className="app">
          
              <Routes>
                  <Route path='/' element={<MainLoyout/>}>
                    <Route path='/'  element={<RequireAuth>
                      <MainPage/>
                    </RequireAuth>
                    }/> 
                    <Route path='/edit'  element={ <Navigate to='/' replace/>
                    }/> 
                    <Route path="add-conference" element={
                      <RequireAuth>
                        <AddConfForm userId={id}/>
                      </RequireAuth>
                    }/>
                    <Route path="/login" element={<LoginPage/>}/>
                    {/* <Route path="edit-rec" element={
                      <RequireAuth>
                          <AddConfForm userId={id}/>
                        </RequireAuth>}/>  */}
                    <Route path="*" element={<Page404/>}/>
                  </Route>
              </Routes>  
        </div>
    </Router>
  );
}

export default App;

