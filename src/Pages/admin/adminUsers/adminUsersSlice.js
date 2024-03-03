import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { patchApi, getApi, deleteApi } from '../../../utilities/fetchApi';

const url = process.env.REACT_APP_SERVER_URL;

export const loadAdminUsers = createAsyncThunk(
  'adminUsers/loadAdminUsers',
  async (filter, { rejectWithValue }) => {
    let serverUrl;
    if (filter) {
      serverUrl = `${url}/users/admin?filter=${filter}`;
    } else {
      serverUrl = `${url}/users/admin`;
    }

    try {
      const response = await getApi(serverUrl, rejectWithValue);
      return response;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);

export const editUser = createAsyncThunk(
  'adminUsers/editUser',
  async ({ userId, body, filter }, { rejectWithValue }) => {
    let serverUrl;
    if (filter) {
      serverUrl = `${url}/users/admin/${userId}?filter=${filter}`;
    } else {
      serverUrl = `${url}/users/admin/${userId}`;
    }
    console.log(body);
    try {
      const response = await patchApi(serverUrl, body, rejectWithValue);
      return response;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);

export const deleteUser = createAsyncThunk(
  'adminUsers/deleteUser',
  async ({ userId, filter }, { rejectWithValue }) => {
    let serverUrl;
    if (filter) {
      serverUrl = `${url}/users/admin/${userId}?filter=${filter}`;
    } else {
      serverUrl = `${url}/users/admin/${userId}`;
    }

    try {
      const response = await deleteApi(serverUrl, rejectWithValue);
      return response;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState: {
    users: [],
    isLoading: false,
    error: {
      edit: null,
      load: null,
      delete: null,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAdminUsers.pending, (state) => {
        state.isLoading = true;
        state.error = { ...state.error, load: null };
      })
      .addCase(loadAdminUsers.fulfilled, (state, action) => {
        const users = action.payload;
        state.isLoading = false;
        state.users = users.sort((a, b) =>
          a.last_name > b.last_name ? 1 : -1
        );
        state.error = { ...state.error, load: null };
      })
      .addCase(loadAdminUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = { ...state.error, load: action.payload };
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
        state.error = { ...state.error, edit: null };
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const users = action.payload;
        state.isLoading = false;
        console.log(users);
        state.users = users.sort((a, b) =>
          a.last_name > b.last_name ? 1 : -1
        );
        state.error = { ...state.error, edit: null };
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        state.error = { ...state.error, edit: action.payload };
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = { ...state.error, delete: null };
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const users = action.payload;
        state.isLoading = false;
        state.users = users.sort((a, b) =>
          a.last_name > b.last_name ? 1 : -1
        );
        state.error = { ...state.error, delete: null };
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        state.error = { ...state.error, delete: action.payload };
      });
  },
});

export const selectUsers = (state) => state.adminUsers.users;
export const selectIsLoading = (state) => state.adminUsers.isLoading;
export const selectError = (state) => state.adminUsers.error;
export default adminUsersSlice.reducer;
