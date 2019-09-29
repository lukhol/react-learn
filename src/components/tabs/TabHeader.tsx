import * as React from 'react';
import './index.scss';

const TabHeader = (props: any) => {

    return (
        <div
            className="tab-header"
        >
            {props.children}
        </div>
    )
}

export default TabHeader;