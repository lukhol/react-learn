import * as React from 'react';
import ModalContext from './modalContext';

export interface ModalProps {
    open: boolean;
    toggle: () => void;
}

const Modal: React.FunctionComponent<ModalProps> = (props) => {

    const { open, toggle, children } = props;
    const activeClassName = open ? 'active' : '';
    const openClassName = open ? 'open' : 'closed';

    return (
        <ModalContext.Provider
            value={{ open,toggle }}
        >
            <div
                className={`modal ${openClassName}`}
                onClick={toggle}
            >
                <div  
                    className={`modal-content ${activeClassName}`}
                    onClick={(e) => {e.stopPropagation();}}
                >
                    {children}
                </div>
            </div>
        </ModalContext.Provider>
    )
}

export default Modal;