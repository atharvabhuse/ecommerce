import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL
} from "../constants/userConstants"
import axios from "axios"

export const login = (email,password) => async (dispatch) => {
    try{
        dispatch({type: LOGIN_REQUEST})

        //it tells data been send to request body in json format
        const config = {headers: {"Content-Type": "application/json"}}

        const {data} = await axios.post(
            `/api/v1/login`,
            {email, password},
            config
        )

        dispatch({type: LOGIN_SUCCESS, payload: data.payload})
    }
    catch(error){
        dispatch({type: LOGIN_FAIL, payload: error.response.data.message})
    }
}

export const register = (userData) => async(dispatch) => {
    try{
        dispatch({type: REGISTER_USER_REQUEST})

        //it tells data been send in series of parts
        const config = {headers: {"Content-type": "multipart/form-data"}}

        const {data} = await axios.post(`/api/v1/register`,userData,config)

        dispatch({type: REGISTER_USER_SUCCESS, payload: data.payload})
    }
    catch(error){
        dispatch({type: REGISTER_USER_FAIL, payload: error.response.data.message})
    }
}

export const loadUser = () => async(dispatch) => {
    try{
        dispatch({type: LOAD_USER_REQUEST})

        const config = {headers: {"Content-type": "application/json"}}

        const {data} = await axios.get(`/api/v1/me`)

        dispatch({type: LOAD_USER_SUCCESS,payload: data.user})
    }
    catch(error){
        dispatch({type: LOAD_USER_FAIL,payload: error.response.data.message})
    }
}

export const logout = () => async(dispatch) => {
    try{
        await axios.get(`/api/v1/logout`)

        dispatch({type: LOGOUT_USER_SUCCESS})
    }
    catch(error){
        dispatch({type: LOGOUT_USER_FAIL, payload: error.response.data.message})
    }
}

export const update = (userData) =>async(dispatch) => {
    try{
        dispatch({type: REGISTER_USER_REQUEST});

        const config = {headers: {"Content-Type": "multipart/form-data" } };

        const {data} = await axios.put('/api/v1/me/update',userData,config)

        dispatch({type: REGISTER_USER_SUCCESS, payload: data.success})
    }
    catch(error){
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const passwordupdate = (passwords) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `/api/v1/password/update`,
        passwords,
        config
      );
  
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const forgotpassword =(email) => async(dispatch) => {
    try{
        dispatch({type: FORGOT_PASSWORD_REQUEST})

        const config = {headers: {"Content-Type": "application/json"}};

        const {data} = await axios.post(`/api/v1/password/forgot`, email, config)

        dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data.message})
    }
    catch(error){
        dispatch({type: FORGOT_PASSWORD_FAIL, error: error.response.data.message})
    }
  }
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}