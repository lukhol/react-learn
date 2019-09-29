import * as React from 'react';

export interface ITabContext {
    selectedTab: string;
    setSelectedTab: (tabId: string) => void;
}

const TabContext = React.createContext<ITabContext>({} as any);

export default TabContext;