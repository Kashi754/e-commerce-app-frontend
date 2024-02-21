import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { patchApi, getApi, deleteApi } from '../../../utilities/fetchApi';

const url = process.env.REACT_APP_SERVER_URL;
const urlBase = `http://${url}`;

export const loadAdminUsers = createAsyncThunk(
  'adminUsers/loadAdminUsers',
  async (filter) => {
    let serverUrl;
    if (filter) {
      serverUrl = `${urlBase}/users/admin?filter=${filter}`;
    } else {
      serverUrl = `${urlBase}/users/admin`;
    }

    return await getApi(serverUrl);
  }
);

export const editUser = createAsyncThunk(
  'adminUsers/editUser',
  async ({ userId, data, filter }) => {
    let serverUrl;
    if (filter) {
      serverUrl = `${urlBase}/users/${userId}?filter=${filter}`;
    } else {
      serverUrl = `${urlBase}/users/${userId}`;
    }

    return await patchApi(serverUrl, data);
  }
);

export const deleteUser = createAsyncThunk(
  'adminUsers/deleteUser',
  async ({ userId, filter }) => {
    let serverUrl;
    if (filter) {
      serverUrl = `${urlBase}/users/${userId}?filter=${filter}`;
    } else {
      serverUrl = `${urlBase}/users/${userId}`;
    }
    return await deleteApi(serverUrl);
  }
);

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState: {
    users: [],
    isLoading: false,
    isError: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAdminUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loadAdminUsers.fulfilled, (state, action) => {
        const users = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.users = users.sort((a, b) =>
          a.last_name > b.last_name ? 1 : -1
        );
        state.error = null;
      })
      .addCase(loadAdminUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
        console.log(action.error);
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const users = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.users = users.sort((a, b) =>
          a.last_name > b.last_name ? 1 : -1
        );
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
        console.log(action.error);
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const users = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.users = users.sort((a, b) =>
          a.last_name > b.last_name ? 1 : -1
        );
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
        console.log(action.error);
      });
  },
});

export const selectUsers = (state) => state.adminUsers.users;
export const selectIsLoading = (state) => state.adminUsers.isLoading;
export const selectIsError = (state) => state.adminUsers.isError;
export const selectError = (state) => state.adminUsers.error;
export default adminUsersSlice.reducer;
