import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMessage } from 'src/api';
import AuthService from 'src/api/auth';
import { LoginParams } from 'src/types';
import { RootState } from '../store';

export type AuthState = {
    token: string;
    loading: boolean;
    success: boolean;
    message: string;
    user: string | null;
};

export const handleLogin = createAsyncThunk('api/login', async (params: LoginParams, { dispatch, rejectWithValue }) => {
    try {
        const response = await AuthService.login(params);
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
        loading: false,
        success: false,
        message: '',
        user: null
    } as AuthState,

    // Sync action
    reducers: {
        setAuth: (state: AuthState, action) => {
            const { success, token, user } = action.payload;
            state.success = success;
            state.token = token;
            state.user = user;
        },
        logout: (state: AuthState) => {
            state.token = '';
            state.user = null;
        },
        resetLoginState: (state: AuthState) => {
            state.token = '';
            state.message = '';
        }
    },

    // Async action
    extraReducers: builder => {
        builder

            // Start login request
            .addCase(handleLogin.pending, state => {
                state.loading = true;
            })

            // Request successful
            .addCase(handleLogin.fulfilled, state => {
                state.loading = false;
                state.success = true;
            })

            // Request error
            .addCase(handleLogin.rejected, state => {
                state.loading = false;
                state.success = false;
            });
    }
});

// Export actions
export const { setAuth, logout, resetLoginState } = authSlice.actions;

// Select state user from slice
export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
