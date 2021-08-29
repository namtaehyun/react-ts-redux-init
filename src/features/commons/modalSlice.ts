import { createSlice } from '@reduxjs/toolkit';
import { IBasicModalProps } from 'components/modal/modal';

const initialState: IBasicModalProps = {
    isOpen: false,
    title: 'Title',
    subTitle: '',
    width: '600px',
    children: null,
    onClick: () => null,
};

interface ISetModalPayload {
    payload: {
        title: string;
        subTitle?: string;
        width?: string;
        children: JSX.Element;
        onClick?: () => void;
    };
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        open: (state) => {
            state.isOpen = true;
        },
        close: (state) => {
            state.isOpen = false;
        },
        setModal: (state, action: ISetModalPayload) => {
            const { title, subTitle, width, children, onClick } = action.payload;

            Object.assign(state, { title, subTitle, width, children, onClick });
        },
    },
});

// Reducers and actions
export const { open, close, setModal } = modalSlice.actions;

export default modalSlice.reducer;
