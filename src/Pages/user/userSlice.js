
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const uri = process.env.REACT_APP_SERVER_URI;
const port = process.env.REACT_APP_PORT;
const urlBase = `http://${uri}:${port}`;

export const loadUserData = createAsyncThunk(
    'user/loadUserData',
    async(params) => {       
        const serverUrl = `${urlBase}/users/${params}`;
        
        const response = await fetch(serverUrl);
        if(!response.ok) {
            const error = await response.json();
            const message = `An error has occured: ${response.status} ${error.message}`;
            throw new Error(message);
        }
        const data = await response.json();
        return data;
    }
);

export const login = createAsyncThunk(
    'user/login',
    async(params) => {
        const serverUrl = `${urlBase}/login`;
        const response = await fetch(serverUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        if(!response.ok) {
            const error = await response.json();
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

        const response = await fetch(serverUrl);
        if(!response.ok) {
            const error = await response.json();
            const message = `An error has occured: ${response.status} ${error.message}`;
            throw new Error(message);
        }
        const data = await response.json();
        return data;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: true,
        user: {
            id: 1,
            username: "kashi754",
            email: "arigorn15@gmail.com",
            first_name: "Terry",
            last_name: "Petersen",
            role: "admin",
            password_hash: "j23rt0nmq2304jn5t034jt0834hjt3h4t89h348th34t",
            cartId: 1
        },
        serializedUser: {},
        isLoading: false,
        isError: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadUserData.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadUserData.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.user = data;
        })
        .addCase(loadUserData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        .addCase(logout.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isLoggedIn = false;
            state.user = {};
        })
        .addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isLoggedIn = false;
            state.user = {};
            state.error = action.error.message;
        })
        .addCase(login.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isLoggedIn = false;
        })
        .addCase(login.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.isLoggedIn = true;
            state.serializedUser = data;
        })
    }
});

export const selectUser = (state) => state.user.user;
export const selectSerializedUser = (state) => state.user.serializedUser;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsError = (state) => state.user.isError;
export const selectError = (state) => state.user.error;
export default userSlice.reducer;