
const SET_LOADING = "SET_LOADING"

const defaultState = {
    loading: true,
    conferences: [],
    colors:[]
}

export default function conferenceReducer(state = defaultState, action) {
    switch (action.type) {
        case 'CONF_FETCHED':
            return {
                ...state,
                conferences: action.payload,
                loading: false
            }
        case 'HALL_COLORS_FETCHED':
            return {
                ...state,
                colors: action.payload,
                loading: false
            }
        case 'CONF_UPD':
            return {
                ...state,
                conferences: state.conferences.map(conf=> { 
                    if(conf.id === action.payload.id)return action.payload
                    return conf
                }),
                loading: false
            }
        case 'CONF_CREATED':
            return {
                ...state,
                conferences: [...state.conferences, action.payload],
                loading: false
            }
        case 'CONF_DELETED':
            return {
                ...state,
                conferences:  action.payload,
                loading: false
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

export const setLoading = (loading) => ({type: SET_LOADING, payload: loading})
export const conferenceFetched = (confs) => ({type: 'CONF_FETCHED', payload: confs})
export const conferenceUpdated = (conf) => ({type: 'CONF_UPD', payload: conf})
export const conferenceCreated = (conf) => ({type: 'CONF_CREATED', payload: conf})
export const conferenceDeleted = (confs) => ({type: 'CONF_DELETED', payload: confs})
export const hallColorsFetched = (colors) => ({type: 'HALL_COLORS_FETCHED', payload: colors})
