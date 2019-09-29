import * as React from 'react';
import TabContext from './tabContext';

export interface TabHeaderItemProps {
    tabId: string;
}

const TabHeaderItem: React.FunctionComponent<TabHeaderItemProps> = (props) => {
    const contextValue = React.useContext(TabContext);
    const isSelected = contextValue.selectedTab === props.tabId;
    const activeClassName = isSelected ? 'active' : '';

    return (
        <div 
            className={`tab-header-item ${activeClassName}`}
            onClick={() => { contextValue.setSelectedTab(props.tabId) }}
        >
            {props.children}
        </div>
    )
}

export default TabHeaderItem;