
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi, putApi } from "../../utilities/fetchApi";

const url = process.env.REACT_APP_SERVER_URL;
const urlBase = `http://${url}`;

const initialState = {
    user: {
        id: 1,
        username: "kashi754",
        email: "arigorn15@gmail.com",
        first_name: "Terry",
        last_name: "Petersen",
        role: "admin",
        cartId: 1
    },
    isLoggedIn: true,
    serializedUser: {},
    isLoading: false,
    isError: false,
    error: null
};

export const loadUserData = createAsyncThunk(
    'user/loadUserData',
    async(userId) => {  
        const serverUrl = `${urlBase}/users/`;
        
        return await getApi(serverUrl);
    }
);

export const loadUser = createAsyncThunk(
    'user/loadUser',
    async() => {
        const serverUrl = `${urlBase}/login/success`;
        const response = await fetch(serverUrl, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        });

        if(!response.ok) {
            const error = await response.json();
            throw error;
        }
        const data = await response.json();
        return data;
    }
)

export const editUserData = createAsyncThunk(
    'user/editUserData',
    async(user) => {
        const serverUrl = `${urlBase}/users/${user.id}`
        const body = {
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name
        }
        return await putApi(serverUrl, body);
    }
)

export const login = createAsyncThunk(
    'user/login',
    async(params) => {
        const serverUrl = `${urlBase}/login`;
        const response = await fetch(serverUrl, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        if(!response.ok) {
            const error = await response.json();
            console.log(error);
            throw new Error(error.message);
        }
        const data = await response.json();
        return data;
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async() => {
        const serverUrl = `${urlBase}/logout`;

        const response = await fetch(serverUrl, {
            method: 'GET',
            credentials: 'include'
        });

        if(!response.ok) {
            const error = await response.json();
            const message = `An error has occured: ${response.status} ${error.message}`;
            throw new Error(message);
        }
        return;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        isLoggedIn: false,
        isLoading: false,
        isError: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadUserData.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        })
        .addCase(loadUserData.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = null;
            state.user = data;
            state.isLoggedIn = true;
        })
        .addCase(loadUserData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error;
        })
        .addCase(editUserData.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        })
        .addCase(editUserData.fulfilled, (state, action) => {
            const {
                username,
                email,
                first_name,
                last_name
            } = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.user.username = username;
            state.user.email = email;
            state.user.first_name = first_name;
            state.user.last_name = last_name;
            state.error = null;
        })
        .addCase(editUserData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error;
        })
        .addCase(logout.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isLoggedIn = false;
            state.error = null;
            state.error = null;
            state.user = {};
        })
        .addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isLoggedIn = false;
            // state.user = {};
            state.error = action.error;
        })
        .addCase(login.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isLoggedIn = false;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.isLoggedIn = true;
            state.user = data;
            state.error = null;
        })
        .addCase(login.rejected, (state, action) => {
            state.isError = true;
            state.isLoggedIn = false;
            state.isLoading = false;
            state.error = action.error;
        })
        .addCase(loadUser.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isLoggedIn = false;
            state.error = null;
        })
        .addCase(loadUser.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.isError = false;
            state.isLoggedIn = true;
            state.error = null;
            state.user = data;
        })
        .addCase(loadUser.rejected, (state, action) => {
            state.isError = true;
            state.isLoggedIn = false;
            state.isLoading = false;
            state.error = action.error;
        })
    }
});

export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsError = (state) => state.user.isError;
export const selectError = (state) => state.user.error;
export default userSlice.reducer;