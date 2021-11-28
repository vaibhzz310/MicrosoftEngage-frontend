import {LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS, FAILURE} from './authTypes';

const initialState = {
    isLoggedIn: '',
    studentId: 0
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {
                ...state
            };
        case LOGOUT_REQUEST:
            return {
                ...state
            };
        case SUCCESS: 
            return {
                isLoggedIn: action.payload.isLoggedIn,
                studentId: action.payload.studentId
            };
        case FAILURE: 
            return {
                isLoggedIn: action.payload.isLoggedIn,
                studentId: action.payload.studentId
            };
        default:
            return state;
    }
};

export default reducer;