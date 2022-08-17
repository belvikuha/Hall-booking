import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
// import {login} from "../../actions/user"
import {logout} from "../../reducers/userReducer.js";

const Navbar=({name})=>{
    const dispatch = useDispatch()
    console.log(name)
    return(
        <div className="navbar">
            <div className="user_name">{name}</div>
            <div className="navbar_logo"></div>
            
            
       
            <div className="navbar_login"
            onClick={()=> {dispatch(logout());}}
            >Вийти</div>
           {/* <Link to='/'>Календар</Link>
            <Link to='/add-conference'>Додати конференцію</Link> */}
        </div>
    )
}

export default Navbar