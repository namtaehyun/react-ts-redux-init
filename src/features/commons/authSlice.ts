import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store';

export interface IAuthState {
    id: string | null;
    username: string | null;
    authorities: Array<string>;
}

const initialState: IAuthState = {
    id: '',
    username: '',
    authorities: [],
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, username, authorities } = action.payload;

            Object.assign(state, { id, username, authorities });
        },
        resetUser: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// Reducers and actions
export const { setUser, resetUser } = authSlice.actions;

// Selectors
export const getUser = (state: RootState): IAuthState => state.auth;

export default authSlice.reducer;
