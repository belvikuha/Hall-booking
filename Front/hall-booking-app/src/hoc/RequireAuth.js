import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const RequireAuth =({children})=>{
    // const location = useLocation()
    const isAuth = useSelector(state => state.user.isAuth)
    console.log('autoriztion: '+ isAuth)
    if(!isAuth){
        console.log('nu neeee')
        return <Navigate to='/login' replace/>
    }
    
    return children;
}

export default RequireAuth
