import * as React from 'react';
import { render } from 'react-dom';

export interface CollapseProps {
    isOpen: boolean;
}

const Collapse: React.FunctionComponent<CollapseProps> = (props) => {

    const { children, isOpen } = props;
    const isOpenClass = isOpen ? 'open' : 'closed';

    return (
        <div
            className={`collapse ${isOpenClass}`}
        >
            {children}
        </div>
    )
}

export default Collapse;