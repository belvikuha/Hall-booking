import { Link, Outlet } from "react-router-dom"; 
import { useSelector} from "react-redux";
import Navbar from '../appHeader/Navbar.js';
import {useDispatch} from 'react-redux'
import {logout} from "../../reducers/userReducer.js";

import "./main.css"

const MainLoyout =()=>{
    const isAuth = useSelector(state => state.user.isAuth)
  const name = useSelector(state => state.user.currentUser.userName)
  const dispatch = useDispatch()
    return(
     <>   {isAuth ?
         <header>
            <p className="user_name">{name}</p>
            <button className="navbar_login"
                    onClick={()=> {dispatch(logout());}}>
                Вийти 
            </button>
            <div className="navbar">
                 <Link to='/'>Календар</Link>
                <Link to='/add-conference'>Додати конференцію</Link>
            </div>
           
        </header>: null}
       
       <Outlet/> 
       <footer>2022</footer>
       
       </>  
    )
}

export default MainLoyout