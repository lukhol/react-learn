import * as React from 'react';
import TabContext from './tabContext';

export interface TabBodyItemProps {
    tabId: string;
}

const TabBodyItem: React.FunctionComponent<TabBodyItemProps> = (props) => {
    const contextValue = React.useContext(TabContext);
    const isSelected = contextValue.selectedTab === props.tabId;
    const style = isSelected ? {} : {display: 'none'};

    return (
        <div 
            style={style}
        >
            {props.children}
        </div>
    )
}

export default TabBodyItem;