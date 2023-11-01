import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWrapper } from '../_utils/fetch-wrapper';
import { useNavigate } from 'react-router-dom';

// implementation
function createInitialState() {
  return {
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    error: null,
  };
}

const goURL = () => {
  window.location.assign('/'); 
}

function createReducers() {
  const logout = (state) => {
    state.user = null;
    localStorage.removeItem('user');
    goURL()
  }
  return {
    logout,
  };
}

function createExtraActions() {
  const loginUrl = `${process.env.REACT_APP_API_URL}api/v1/user/login/`;
  return {
    login: login(),
  };

  function login() {
    return createAsyncThunk(
      `${name}/login`,
      async ({ email, password }) =>{
        const response = await fetchWrapper.post(`${loginUrl}`, { email, password })
        console.log(response)
        return response.user
      }
    );
  }
}

function createExtraReducers() {
  const { login } = createExtraActions();
  var { pending, fulfilled, rejected } = login;

  return {
    [pending]: (state) => {
      state.error = null;
    },
    [fulfilled]: (state, action) => {
      const user = action.payload;
      console.log("user:",user)
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
      // // get return url from location state or default to home page
      // const { from } = history.location.state || { from: { pathname: '/' } };
      // history.navigate(from);
    },
    [rejected]: (state, action) => {
      state.error = action.error;
    },
  };
}

// create slice
const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports
export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;
