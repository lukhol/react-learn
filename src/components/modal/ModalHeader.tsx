import * as React from 'react';
import ModalContext from './modalContext';

export interface ModalTitleProps {}

const ModalHeader: React.FunctionComponent<ModalTitleProps> = (props) => {
    
    const modalContext = React.useContext(ModalContext);
    const { children } = props;

    return (
        <>
            <div className="modal-header">
                <h5 className="modal-title">
                    {children}
                </h5>   
                <button 
                    type="button"
                    className="close" 
                    aria-label="Close"
                    onClick={modalContext.toggle}
                >
                    <span aria-hidden="true">
                        ×
                    </span>
                </button>
            </div>
        </>
    )
};

export default ModalHeader;