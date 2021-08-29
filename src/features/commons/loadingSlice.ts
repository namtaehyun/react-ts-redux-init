import { createSlice } from '@reduxjs/toolkit';
import { ILoadingProps } from 'components/loading/loading';

const initialState: ILoadingProps = {
    isLoading: false,
};

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        loadingOpen: (state) => {
            state.isLoading = true;
        },
        loadingClose: (state) => {
            state.isLoading = false;
        },
    },
});

// Reducers and actions
export const { loadingOpen, loadingClose } = loadingSlice.actions;

export default loadingSlice.reducer;
