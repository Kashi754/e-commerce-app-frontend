import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postApi, putApi } from '../../utilities/fetchApi';

const url = process.env.REACT_APP_SERVER_URL;

export const loadUser = createAsyncThunk('user/loadUser', async () => {
  const serverUrl = `${url}/login/success`;

  const response = await fetch(serverUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  return data;
});

export const editUserData = createAsyncThunk(
  'user/editUserData',
  async (user, { rejectWithValue }) => {
    const serverUrl = `${url}/users`;
    const body = {
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    try {
      const response = await putApi(serverUrl, body);
      return response;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (params, { rejectWithValue }) => {
    const serverUrl = `${url}/login`;
    try {
      const response = await postApi(serverUrl, params, rejectWithValue);
      return response;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_params, { rejectWithValue }) => {
    const serverUrl = `${url}/logout`;

    try {
      const response = await fetch(serverUrl, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
    } catch (err) {
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(editUserData.pending, (state) => {
        state.isLoading = true;
        state.error = { ...state.error, edit: null };
      })
      .addCase(editUserData.fulfilled, (state, action) => {
        const { username, email, first_name, last_name } = action.payload;
        state.isLoading = false;
        state.error = { ...state.error, edit: null };
        state.user.username = username;
        state.user.email = email;
        state.user.first_name = first_name;
        state.user.last_name = last_name;
      })
      .addCase(editUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = { ...state.error, edit: action.payload };
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = { ...state.error, logout: null };
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.error = { ...state.error, logout: null };
        state.isLoggedIn = false;
        state.user = {};
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = { ...state.error, logout: action.payload };
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.error = { ...state.error, login: null };
      })
      .addCase(login.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.error = { ...state.error, login: null };
        state.isLoggedIn = true;
        state.user = data;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = { ...state.error, login: action.payload };
        state.user = {};
      })
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.error = { ...state.error, load: null };
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.error = { ...state.error, load: null };
        state.isLoggedIn = true;
        state.user = data;
      })
      .addCase(loadUser.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = {};
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;
export default userSlice.reducer;
