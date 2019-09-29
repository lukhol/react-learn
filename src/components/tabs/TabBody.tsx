import * as React from 'react';
import './index.scss';

const TabBody = (props: any) => {

    return (
        <div className="tab-body">{props.children}</div>
    )
}

export default TabBody;