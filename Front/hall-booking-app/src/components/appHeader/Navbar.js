import {useDispatch} from 'react-redux'

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
           
        </div>
    )
}

export default Navbar