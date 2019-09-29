import * as React from 'react';

export interface ModalBodyProps {

}

const ModalBody: React.FunctionComponent<ModalBodyProps> = (props) => {
    
    const { children } = props;

    return (
        <div className="modal-body">
            {children}
        </div>
    )
};

export default ModalBody;