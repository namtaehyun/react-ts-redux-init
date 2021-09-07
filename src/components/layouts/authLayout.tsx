import React from 'react';
import BasicModal, { IBasicModalProps } from 'components/modal/modal';
import { useAppDispatch, useAppSelector } from 'hooks';
import { close } from 'features/commons/modalSlice';
import Loading from 'components/loading/loading';

interface ILayoutProps {
    children: JSX.Element;
}

const AuthLayout = ({ children }: ILayoutProps): JSX.Element => {
    const {
        isOpen,
        title,
        subTitle,
        width,
        children: modalChildren,
        onClick,
    }: IBasicModalProps = useAppSelector((state) => state.modal);
    const loading = useAppSelector((state) => state.loading);
    const dispatch = useAppDispatch();

    return (
        <>
            <Loading isLoading={loading.isLoading}></Loading>
            <BasicModal
                isOpen={isOpen}
                width={width}
                title={title}
                subTitle={subTitle}
                onClose={() => dispatch(close())}
                onClick={onClick}
            >
                {modalChildren}
            </BasicModal>
            <div>{children}</div>
        </>
    );
};

export default AuthLayout;
