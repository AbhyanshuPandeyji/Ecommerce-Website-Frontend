import {
    // this is for the user login
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    // this is to register user
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    // this is to load the user
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    // this is to logout the user
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    // this is for user to update his profile
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    // this is for user to update his password
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    // this is for sending mail for forgot password from the user side
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    // this is to reset password after the forgot
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    // for deleting the id by user
    DELETE_PROFILE_REQUEST,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAIL,
    DELETE_PROFILE_RESET,
    // this is for getting all users - admin
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    // this is for deleting a user from the website database - admin
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    // this is to update a users role - admin
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    // this is to get a single  user details - by admin
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/userConstants";
import axios from "axios";

// in action usually the url of the api and the data been sending in payload is changed
// and when the data is required in the api to get the specific data from the data base or to post in it we - add the data to be selected or put and the header type


// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST});

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const {data} = await axios.post(`/api/v1/login`, {
            email,
            password
        }, config);

        dispatch({type: LOGIN_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({type: LOGIN_FAIL, payload: error.response.data.message});
    }
};

// Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_USER_REQUEST});

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        const {data} = await axios.post(`/api/v1/register`, userData, config);

        dispatch({type: REGISTER_USER_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({type: REGISTER_USER_FAIL, payload: error.response.data.message});
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST});

        const {data} = await axios.get(`/api/v1/me`);

        dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({type: LOAD_USER_FAIL, payload: error.response.data.message});
    }
};

// Logout User
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);

        dispatch({type: LOGOUT_SUCCESS});
    } catch (error) {
        dispatch({type: LOGOUT_FAIL, payload: error.response.data.message});
    }
};

// Update Profile - it will  be a put request
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PROFILE_REQUEST});

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        // taking the pre-data of the user
        const {data} = await axios.put(`/api/v1/me/update`, userData, config);

        // we only show the success in the update and delete 
        dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({type: UPDATE_PROFILE_FAIL, payload: error.response.data.message});
    }
};

// Update Password - taking in the password entered by the user - data will be old,new,confirm
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PASSWORD_REQUEST});

        // this defined type of content should be served
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const {data} = await axios.put(`/api/v1/password/update`, passwords, config);

        dispatch({type: UPDATE_PASSWORD_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message});
    }
};

// Forgot Password - we require here the email of the user from the redux state to send email of the jwt token and the reset password url
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({type: FORGOT_PASSWORD_REQUEST});

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const {data} = await axios.post(`/api/v1/password/forgot`, email, config);

        dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data.message});
    } catch (error) {
        dispatch({type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message});
    }
};

// Reset Password - this will take the token and the passwords
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({type: RESET_PASSWORD_REQUEST});

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        // it will be a put request 
        const {data} = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);

        dispatch({type: RESET_PASSWORD_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({type: RESET_PASSWORD_FAIL, payload: error.response.data.message});
    }
};


// Delete User - delete a users id from the database
export const deleteProfile = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_PROFILE_REQUEST });

        const {data} = await axios.delete(`/api/v1/me/delete/${id}`);

        dispatch({type: DELETE_PROFILE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: DELETE_PROFILE_FAIL, payload: error.response.data.message});
    }
};




// get All Users - for admin
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({type: ALL_USERS_REQUEST});
        const {data} = await axios.get(`/api/v1/admin/users`);

        dispatch({type: ALL_USERS_SUCCESS, payload: data.users});
    } catch (error) {
        dispatch({type: ALL_USERS_FAIL, payload: error.response.data.message});
    }
};

// get  User Details - for the admin - finding the user by the id
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: USER_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/v1/admin/user/${id}`);

        dispatch({type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({type: USER_DETAILS_FAIL, payload: error.response.data.message});
    }
};

// Update User - to update user role in the user-admin toggle between
// this will take the id and  the data of the user to update the  user role
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_USER_REQUEST});

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        // this will be a put request as usual
        const {data} = await axios.put(`/api/v1/admin/user/${id}`, userData, config);

        dispatch({type: UPDATE_USER_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({type: UPDATE_USER_FAIL, payload: error.response.data.message});
    }
};

// Delete User - delete a users id from the database
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_USER_REQUEST});

        const {data} = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch({type: DELETE_USER_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: DELETE_USER_FAIL, payload: error.response.data.message});
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};

