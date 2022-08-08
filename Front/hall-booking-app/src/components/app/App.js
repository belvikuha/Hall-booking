import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {useEffect} from 'react'

import {useDispatch, useSelector} from "react-redux";
// import MainPage from '../pages/MainPage.js';
import LoginPage from '../pages/LoginPage.js';
import Page404 from '../pages/404.js';
import Navbar from '../appHeader/Navbar.js';
import CalendarWrapper from '../calendar/Calendar';
import AddConfForm from '../addConfForm/AddConfForm';
// import AppHeader from "../appHeader/AppHeader";

// import CreateEventWithNoOverlap from '../calendar/demoCalendar';

// import {auth} from "../../actions/user"
import {UserActions} from "../../actions/user"

function App() {

  const isAuth = useSelector(state => state.user.isAuth)
  const name = useSelector(state => state.user.currentUser.userName)
  const id = useSelector(state => state.user.currentUser.id)
  const dispatch = useDispatch()

  const{auth} = UserActions()

  useEffect(() => {
    console.log("useeffect")
      dispatch(auth())
  }, [])


  return (
    <Router>
        <div className="app">
          {isAuth ? <Navbar name={name}/> : null}  
            <main>     
                    <Routes>{/* что бы все маршруты не были на одной странице  */}
                        {!isAuth ? <Route path="/" element={<LoginPage/>}/> :<Route path="/" element={<CalendarWrapper/>}/>}
                        <Route path="/addC" element={<AddConfForm userId={id}/>}/>
                      
                      
                        <Route path="*" element={<Page404/>}/>
                    </Routes>  

            </main>
    
        </div>
    </Router>
  );
}

export default App;
