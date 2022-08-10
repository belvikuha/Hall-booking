const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"
const VALIDATE = "VALIDATE"


const defaultState = {
    currentUser: {},
    isAuth: false,
    isValid: false
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            console.log(action.payload);
            console.log(state.isAuth);
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

        case VALIDATE:
            return{
                ...state,
                isValid: !state.isValid
            }
        
        default:
            return state
    }
}
export const setUser = user => ({type: SET_USER, payload: user})
export const logout = () => ({type: LOGOUT})
export const validate = () =>({type: VALIDATE})