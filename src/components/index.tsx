import * as React from 'react';
import './index.scss';

const TabContext = React.createContext<ITabContext>({} as any);
interface ITabContext {
    selectedTab: string;
    setSelectedTab: (tabId: string) => void;
}

interface TabPanelProps {
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

const TabHeader = (props: any) => {

    return (
        <div
            className="tab-header"
        >
            {props.children}
        </div>
    )
}

const TabBody = (props: any) => {

    return (
        <div>{props.children}</div>
    )
}

interface TabHeaderItemProps {
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

interface TabBodyItemProps {
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

export default class TestComponents extends React.Component {

    render() {
        return (
            <div className="test-component" style={{maxWidth: "800px"}}>
                <TabPanel selectedTabId="1">
                    <TabHeader>
                        <TabHeaderItem tabId="1">Tab A</TabHeaderItem>
                        <TabHeaderItem tabId="2">Tab B</TabHeaderItem>
                        <TabHeaderItem tabId="3">Tab C</TabHeaderItem>
                    </TabHeader>
                    <TabBody>
                        <TabBodyItem tabId="1">
                            <strong>Content of tab A</strong>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus ultricies sollicitudin. 
                                Nunc volutpat vel purus ut pellentesque. Phasellus feugiat mattis efficitur. Sed arcu urna, rhoncus 
                                nec varius condimentum, facilisis id nibh. Etiam vitae scelerisque velit. Nullam pharetra nisi 
                                posuere consectetur ultrices. Cras ipsum orci, suscipit fringilla accumsan vel, congue ac nunc.
                                 Integer in tincidunt odio. Pellentesque faucibus velit lacus, sed fringilla nisl posuere non. 
                                 Ut at sollicitudin diam. Quisque fermentum tincidunt elit nec porta. Sed consectetur vestibulum 
                                 dui eu porttitor. Duis sapien orci, porta ut ipsum ac, condimentum pulvinar justo. Pellentesque
                                  quis finibus enim. Integer tristique volutpat ante.
                            </p>
                        </TabBodyItem>
                        <TabBodyItem tabId="2">
                            <strong>Content of tab B</strong>
                            <p>
                                Morbi et dapibus libero, in dapibus libero. Praesent mattis orci sed justo rutrum, in efficitur 
                                metus cursus. Pellentesque sit amet arcu fermentum, bibendum nunc id, vestibulum justo. Maecenas 
                                ac nulla magna. Fusce nec accumsan dui. Mauris sollicitudin gravida enim, et suscipit odio pulvinar
                                 mollis. Sed pharetra tincidunt nulla non congue. Duis facilisis metus augue, sed sodales lectus
                                  fermentum nec. Morbi a arcu mattis, gravida ex ut, mattis turpis. Mauris rhoncus auctor pharetra.
                                   Etiam non massa vitae arcu accumsan sodales.
                            </p>
                        </TabBodyItem>
                        <TabBodyItem tabId="3">
                            <strong>Content of tab C</strong>
                            <p>
                                Fusce condimentum congue nunc, eget sodales enim pulvinar sed. Nam a ultrices dolor, et hendrerit nisi. 
                                Mauris elementum nibh turpis, vel sodales lacus ullamcorper eu. Morbi id commodo leo. Aliquam sem nunc, 
                                semper a libero in, fringilla convallis elit. Nullam accumsan risus in elit malesuada, ac pretium nibh 
                                ornare. Ut sed aliquam dolor.
                            </p>
                        </TabBodyItem>
                    </TabBody>
                </TabPanel>
            </div>
        )
    }
}