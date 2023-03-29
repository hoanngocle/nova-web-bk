import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { login } from 'api/auth';
import { getErrorMessage } from 'api';
import { setAuth } from 'redux/slice/authSlice';

export type LoginState = {
    loading: boolean;
    success: boolean;
    error: boolean;
    messages: string | LoginValidate;
};

export type LoginValidate = {
    email: string | string[];
    password: string | string[];
};

export type LoginRequest = {
    email: string;
    password: string;
};

export const asyncLogin = createAsyncThunk('admin/login', async (params: LoginRequest, { dispatch, rejectWithValue }) => {
    try {
        const response = await login(params);
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

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loading: false,
        success: false,
        error: false,
        messages: '',
    } as LoginState,
    reducers: {
        resetLoginState: (state: LoginState) => {
            state.error = false;
            state.success = false;
            state.messages = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncLogin.pending, (state: LoginState) => {
                state.loading = true;
            })
            .addCase(asyncLogin.fulfilled, (state: LoginState) => {
                state.loading = false;
                state.success = true;
                state.error = false;
            })
            .addCase(asyncLogin.rejected, (state: LoginState, { payload }) => {
                state.loading = false;
                state.success = false;
                state.error = true;
                state.messages = payload as string | LoginValidate;
            });
    },
});

export const loginSelector = (state: RootState) => state.login;
export const { resetLoginState } = loginSlice.actions;
