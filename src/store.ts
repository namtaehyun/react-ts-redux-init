import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'features/commons/authSlice';
import modalReducer from 'features/commons/modalSlice';
import loadingReducer from 'features/commons/loadingSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer,
        loading: loadingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
