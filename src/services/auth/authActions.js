import {LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS, FAILURE} from './authTypes';

export const authenticateUser = (email, password) => {
    return dispatch => {
        dispatch(loginRequest());
        if(email === "student1" && password === "student1") {
            dispatch(success(true,1));
        } else if(email === "student2" && password === "student2") {
            dispatch(success(true,2));
        } else if(email === "student3" && password === "student3") {
            dispatch(success(true,3));
        } else if(email === "student9" && password === "student9") {
            dispatch(success(true,9));
        }else if(email === "student78" && password === "student78") {
            dispatch(success(true,78));
        } else if(email === "admin" && password === "admin") {
            dispatch(success(true,"admin"));
        } else{
            dispatch(failure());
        }
    };
};

const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
};

export const logoutUser = () => {
    return dispatch => {
        dispatch(logoutRequest());
        dispatch(success(false,null));
    };
};

const logoutRequest = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const success = (isLoggedIn,studentId,) => {
    return {
        type: SUCCESS,
        payload: {isLoggedIn:isLoggedIn,studentId:studentId}
    };
};

const failure = () => {
    return {
        type: FAILURE,
        payload: {isLoggedIn:false,studentId:null}
    };
};