const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"
const SET_LOADING = "SET_LOADING"



const defaultState = {
    currentUser: {},
    isAuth: false,
    loading: true
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            console.log(action.payload);
            console.log("autor:" + true);
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
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
                loading: !state.loading
            }
    
        
        default:
            return state
    }
}
export const setUser = user => ({type: SET_USER, payload: user})
export const logout = () => ({type: LOGOUT})
export const loading = () => ({type: SET_LOADING})