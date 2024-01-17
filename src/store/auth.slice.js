import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Request } from "libs/_utils/request";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: JSON.parse(localStorage.getItem('token')) || null,
  role: null,
  error: null,
};

const reducers = {
  logout: (state) => {
    state.user = null;
    state.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem("pageData");
    localStorage.removeItem("composeInfo");
    localStorage.removeItem("templateInfo");
    localStorage.removeItem("productsInfo");
    localStorage.removeItem("i18nextLng");
    localStorage.removeItem("cardInfo");
    localStorage.removeItem("currentTab");
    window.location.assign("/");
  },
};

const login = createAsyncThunk('auth/login', async ({ email, password }, {rejectWithValue}) => {
  try {
    const response = await Request.post(`${process.env.REACT_APP_API_URL}api/v1/user/login/`, { email, password });
    return response;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const getUser = createAsyncThunk('auth/getUser', async ({ token }, { dispatch, rejectWithValue }) => {
  try {
    const response = await Request.get(`${process.env.REACT_APP_API_URL}api/v1/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(authActions.logout());
    }
    return rejectWithValue(err.message);
  }
});

const extraReducers = (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload.data.user));
      localStorage.setItem('token', JSON.stringify(action.payload.data.access_token));
      state.role = action.payload.data.user.is_staff ? "admin" : "user";
      state.user = action.payload.data.user;
      state.token = action.payload.data.access_token;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload.data.user));
      state.role = action.payload.data.user.is_staff ? "admin" : "user";
      state.user = action.payload.data.user;
    });
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers,
  extraReducers,
});

export const authActions = { ...authSlice.actions, login, getUser };
export const authReducer = authSlice.reducer;