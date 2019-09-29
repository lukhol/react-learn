import * as React from 'react';

const ModalFooter: React.FunctionComponent<any> = (props) => {

    const { children } = props;

    return (
        <div className="modal-footer">
            {children}
        </div>
    )
}

export default ModalFooter;