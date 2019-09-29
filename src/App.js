import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import TestTabs from "./TestTabs";
import {
  CoreDbLayer,
  CoreDbLayer2,
  CoreDbControl,
  WithCounterComponent,
  CounterFun,
  Counter,
  CounterHOC,
  CoreDb
} from "./fromApp";
import {
  TabPanel,
  TabBody,
  TabBodyItem,
  TabHeader,
  TabHeaderItem
} from "./components/tabs";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "./components/dropdown";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./components/modal";

const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis felis quis est commodo iaculis. Donec ut ullamcorper sem, ac rhoncus lacus. Mauris volutpat metus ut varius tempor. Praesent luctus nunc sit amet porttitor eleifend. Mauris ut aliquet massa, eget dignissim purus. Nullam non orci nulla. Nam egestas nulla a dolor euismod iaculis. Integer a leo vel purus porta auctor feugiat a dui. Quisque ut vehicula turpis. Ut volutpat suscipit lobortis. Sed laoreet ipsum nec dui lacinia accumsan. Aliquam tincidunt turpis nec libero laoreet elementum. Sed sodales arcu vel lacinia volutpat. Donec semper tincidunt bibendum. Aliquam justo lorem, tincidunt nec ante eget, facilisis ullamcorper arcu.";

const App = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get("http://www.mocky.io/v2/5d8f7cd03200005d00adec78").then(res => {
      setResult(res.data.success);
    });
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);

  const toggle = () => {
    setModalOpen(!isModalOpen);
  };

  const [isDropdownOpen, setDopdrownOpen] = useState(false);

  return (
    <div style={{ margin: "8px", maxWidth: "1200px", margin: "0 auto" }}>
      <TabPanel selectedTabId="1">
        <TabHeader>
          <TabHeaderItem tabId="1">Request</TabHeaderItem>
          <TabHeaderItem tabId="2">Compound components with tabs</TabHeaderItem>
          <TabHeaderItem tabId="3">HOC</TabHeaderItem>
          <TabHeaderItem tabId="4">Render prop (child)</TabHeaderItem>
          <TabHeaderItem tabId="5">Render props (function)</TabHeaderItem>
        </TabHeader>
        <TabBody>
          <TabBodyItem tabId="1">
            <div className="row">
              <h3>Request test</h3>
              <div className="_result">
                IS SUCCESS: {result != null ? result.toString() : null}
              </div>
            </div>
          </TabBodyItem>
          <TabBodyItem tabId="2">
            <div className="row">
              <h3>Compound components with context 1</h3>
              <CoreDb>
                <CoreDbLayer />
                <CoreDbLayer2 />
                <CoreDbControl />
              </CoreDb>
            </div>
          </TabBodyItem>
          <TabBodyItem tabId="3">
            <div className="row">
              <h3>Counter with HOC</h3>
              <WithCounterComponent />
            </div>
          </TabBodyItem>
          <TabBodyItem tabId="4">
            <div className="row">
              <h3>Counter with render props</h3>
              <Counter
                renderOrSomeAnotherName={counter => (
                  <div>
                    Counter with render props as a prop:{" "}
                    <span className="render-props-counter">{counter}</span>
                  </div>
                )}
              />
            </div>
          </TabBodyItem>
          <TabBodyItem tabId="5">
            <div className="row">
              <h3>Counter with render props (children is a function)</h3>
              <CounterFun>
                {counter => (
                  <div>
                    CounterFun with render props as a function: {counter}
                  </div>
                )}
              </CounterFun>
            </div>
          </TabBodyItem>
        </TabBody>
      </TabPanel>

      <button
        onClick={() => {
          setModalOpen(true);
        }}
        className="button"
      >
        Open modal
      </button>
      <Modal open={isModalOpen} toggle={toggle}>
        <ModalHeader close>This is header :)</ModalHeader>
        <ModalBody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => LOREM_IPSUM)}
        </ModalBody>
        <ModalFooter>
          Something in footer <button className="button">ELO</button>
        </ModalFooter>
      </Modal>

      <Dropdown
        isOpen={isDropdownOpen}
        toggle={() => {
          setDopdrownOpen(!isDropdownOpen);
        }}
      >
        <DropdownToggle>
            I'am dropdown
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>First</DropdownItem>
          <DropdownItem>Second</DropdownItem>
          <DropdownItem>Third</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      Content under dropdown
    </div>
  );
};

export default App;
