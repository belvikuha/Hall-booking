import { Link, Outlet, NavLink  } from "react-router-dom"; 
import { useSelector} from "react-redux";
import Navbar from '../appHeader/Navbar.js';
import {useDispatch} from 'react-redux'
import {logout} from "../../reducers/userReducer.js";

import "./main.css"
import exit from './exit.png'
import logo from './court_icon.png'


const MainLoyout =()=>{
    const isAuth = useSelector(state => state.user.isAuth)
  const name = useSelector(state => state.user.currentUser.userName)
  const dispatch = useDispatch()
    return(
     <>   {isAuth ?
         <header>
             <div className="navbar">
                <img src={logo} alt="logo" style={{width:'5em', height:'5em', marginRight:'2em'}}/>
                <NavLink to='/'  style={({isActive})=>({color:isActive ? '#57b846' : 'inherit'})}>Календар</NavLink>
                <NavLink to='/add-conference'  style={({isActive})=>({color:isActive ? '#57b846' : 'inherit'})}>Додати конференцію</NavLink>
            </div>
            <div className="user_info_block">
            <p className="user_name">{name}</p>
            <img src={exit} alt="exit" onClick={()=> {dispatch(logout());}} 
            style={{width:'1.8em', height:'2em', marginLeft:'1em', cursor:'alias'}}/>
               
            </div>
           
        </header>: null}
       
       <Outlet/> 
       {/* <footer>2022</footer> */}
       
       </>  
    )
}

export default MainLoyout