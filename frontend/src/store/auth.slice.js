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
    templateTypes:{
      brands: [
          {
              "id": 1,
              "name": "Brand 1",
              "index": "4de8ab64-efac-4b7f-8f6d-94c4f68c9689"
          },
          {
              "id": 2,
              "name": "Brand 2",
              "index": "6018ca35-bc00-4daf-b61b-b8fd4c3c68fc"
          }
      ],
      applications: [
          {
              "id": 1,
              "name": "Application 1",
              "index": "e6943fdd-e8b7-4598-88e2-8f6ad10a69d8"
          },
          {
              "id": 2,
              "name": "Application 2",
              "index": "3c22dc5d-48d2-4806-a9d9-5f6f784fb200"
          }
      ]
  }
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
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user.user));
      localStorage.setItem('token', JSON.stringify(user.access_token));
      state.role = user.is_superuser ? "super" : (user.is_staff? "admin": "customer")
      state.user = user.user;
      state.token = user.access_token;
      state.templateTypes = user.page_data
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
