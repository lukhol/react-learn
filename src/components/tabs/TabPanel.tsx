import * as React from 'react';
import TabContext from './tabContext';

export interface TabPanelProps {
    selectedTabId: string;
}

const TabPanel: React.FunctionComponent<TabPanelProps> = (props) => {

    const [selectedTab, setSelectedTab] = React.useState(props.selectedTabId);

    return (
        <TabContext.Provider
            value={{
                selectedTab,
                setSelectedTab
            }}
        >
            <div className="tab-panel">{props.children}</div>
        </TabContext.Provider>
    )
}

export default TabPanel;