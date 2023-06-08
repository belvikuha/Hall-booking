const SET_USER = "SET_USER"
const FETCH_USERS = 'GET_USERS'  
const LOGOUT = "LOGOUT"
const SET_LOADING = "SET_LOADING"

const token = localStorage.getItem("token");

const defaultState = {

    currentUser: {},
    isAuth:!!token,
    loading: false,
    token: token ? token : null,
    users: []
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
                loading:false
            }
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading:false
            }    
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
    
        
        default:
            return state
    }
}
export const setUser = user => ({type: SET_USER, payload: user})
export const fetchUsers = () => ({type: FETCH_USERS})
export const logout = () => ({type: LOGOUT})
export const setUserLoading = (l) => ({type: SET_LOADING, payload: l})