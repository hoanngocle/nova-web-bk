import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMessage } from 'src/api';
import AuthService from 'src/api/auth';
import { LoginParams } from 'src/types';

export type AuthState = {
    token: string;
    isLoading: boolean;
    errorMessage: string;
    currentUser: string;
};

export const handleLogin = createAsyncThunk('api/login', async (params: LoginParams, { dispatch, rejectWithValue }) => {
    try {
        console.log(params);

        const response = await AuthService.login(params);
        console.log(response);

        const { success } = response.data;

        if (success) {
            dispatch(setAuth(response.data));

            return true;
        }

        return false;
    } catch (error: any) {
        return rejectWithValue(getErrorMessage(error));
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        isLoading: false,
        errorMessage: '',
        currentUser: ''
    } as AuthState,

    // Sync action
    reducers: {
        setAuth: (state: AuthState, action) => {
            const { token, email } = action.payload;
            console.log(action.payload);
            action.payload;

            state.token = email;

            if (token) {
                state.token = token;
            }
        },
        logout: (state: AuthState) => {
            state.token = '';
            state.isLoading = false;
            state.errorMessage = '';
            state.currentUser = 'null';
        }
    },

    // Async action
    extraReducers: builder => {
        builder

            // Start login request
            .addCase(handleLogin.pending, state => {
                state.isLoading = true;
            })

            // Request successful
            .addCase(handleLogin.fulfilled, (state, action) => {
                state.isLoading = false;

                // state.currentUser = action.payload;
            })

            // Request error
            .addCase(handleLogin.rejected, (state, action) => {
                state.isLoading = false;

                // state.errorMessage = action.payload.message;
            });
    }
});

// Export actions
export const { logout, setAuth } = authSlice.actions;

// Select state currentUser from slice
// export const selectUser = (state) => state.user.currentUser;
// export const selectLoading = (state) => state.user.isLoading;
// export const selectErrorMessage = (state) => state.user.errorMessage;

export default authSlice.reducer;
