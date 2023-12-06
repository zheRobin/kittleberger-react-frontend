import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWrapper } from '../_utils/fetch-wrapper';
// implementation
function createInitialState() {
  return {
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    token: JSON.parse(localStorage.getItem('token')),
    role: null,
    error: null,
    templateTypes:JSON.parse(localStorage.getItem('templateTypes'))
  };
}

const goURL = () => {
  window.location.assign('/'); 
}

function createReducers() {
  const logout = (state) => {
    state.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('templateTypes')
    localStorage.removeItem('composeInfo')
    localStorage.removeItem('templateInfo')
    goURL()
  }
  const setTemplateTypes = (state,action) => {
    state.templateTypes = action.payload
  }
  return {
    logout,
    setTemplateTypes
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
        return response.data
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
      localStorage.setItem('user', JSON.stringify(user.user));
      localStorage.setItem('token', JSON.stringify(user.access_token));
      state.role = user.user.is_superuser ? "super" : (user.user.is_staff? "admin": "user")
      state.user = user.user;
      state.token = user.access_token;
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
