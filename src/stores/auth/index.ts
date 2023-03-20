import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from 'src/api/auth';
import { LoginParams } from 'src/types';

const initialState = {
    user: {}
};

export type AuthState = {
    token: string;
    isLoading: boolean;
    errorMessage: string;
    currentUser: null;
};

export const asyncLogin = createAsyncThunk('api/login', async (params: LoginParams, { dispatch, rejectWithValue }) => {
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleSelectMail: (state, action) => {
            // You should get mail to select from the action payload.

            const mails = state.user;

            state.user = mails;
        }
    }
});

export const { handleSelectMail } = emailSlice.actions;

export default authSlice.reducer;
