import React from 'react';
import styled from 'styled-components';
import { Modal, Fade, Backdrop } from '@material-ui/core';

export interface IBasicModalProps {
    isOpen: boolean;
    title: string;
    subTitle?: string;
    width: string;
    onClose?: React.MouseEventHandler<HTMLElement>;
    children: JSX.Element | null;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Wrapper = styled.div<{ width?: string }>`
    border-radius: 5px;
    background-color: white;
    min-height: 300px;
    width: ${(props) => props.width || '600px'};
`;
const Header = styled.div<{ width?: string }>`
    padding: 15px 20px;
    border-bottom: 1px solid rgba(34, 36, 38, 0.3);
`;

const Title = styled.label`
    display: inline-block;
    font-weight: bold;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.85);
`;

const SubTitle = styled.label`
    display: inline-block;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.85);
`;

const Body = styled.div`
    padding: 20px;
    width: 100%;
    display: inline-block;
    max-height: 1200px;
    @media (max-width: 1200px) {
        max-height: 600px;
        overflow: auto;
    }
`;

const Footer = styled.div`
    padding: 20px;
    text-align: right;
    border-top: 1px solid rgba(34, 36, 38, 0.3);
`;

const BasicModal = ({ isOpen, width, title, subTitle, onClose, children, onClick }: IBasicModalProps): JSX.Element => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            className="Modal-main"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <Wrapper width={width}>
                    <Header>
                        <div>
                            <Title>{title}</Title>
                            <i onClick={onClose}></i>
                        </div>
                        {subTitle && <SubTitle>{subTitle}</SubTitle>}
                    </Header>
                    <Body>{children}</Body>
                    {onClick && (
                        <Footer>
                            <button onClick={onClick}>
                                확인
                            </button>
                        </Footer>
                    )}
                </Wrapper>
            </Fade>
        </Modal>
    );
};

export default BasicModal;
