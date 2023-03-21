import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

// Import slide
import { authSlice } from './auth';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
