import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import TestTabs from "./TestTabs";

import {
  TabPanel,
  TabBody,
  TabBodyItem,
  TabHeader,
  TabHeaderItem
} from "./components/tabs";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./components/modal";

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis felis quis est commodo iaculis. Donec ut ullamcorper sem, ac rhoncus lacus. Mauris volutpat metus ut varius tempor. Praesent luctus nunc sit amet porttitor eleifend. Mauris ut aliquet massa, eget dignissim purus. Nullam non orci nulla. Nam egestas nulla a dolor euismod iaculis. Integer a leo vel purus porta auctor feugiat a dui. Quisque ut vehicula turpis. Ut volutpat suscipit lobortis. Sed laoreet ipsum nec dui lacinia accumsan. Aliquam tincidunt turpis nec libero laoreet elementum. Sed sodales arcu vel lacinia volutpat. Donec semper tincidunt bibendum. Aliquam justo lorem, tincidunt nec ante eget, facilisis ullamcorper arcu.';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  render() {
    return (
      <div className="counter">
        {this.props.renderOrSomeAnotherName(this.state.counter)}
        <button
          className="counter-increase button"
          onClick={() => {
            this.setState({ counter: this.state.counter + 1 });
          }}
        >
          Increment
        </button>
      </div>
    );
  }
}

class CounterFun extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  render() {
    const counter = this.state.counter;

    return (
      <div>
        {this.props.children(counter)}
        <button 
            className="button"
            onClick={() => this.setState({ counter: counter + 1 })}
        >
          Increment
        </button>
      </div>
    );
  }
}

const withCounter = Component =>
  class Abc extends React.Component {
    constructor(props) {
      super(props);
      this.state = { counter: 1 };
    }

    render() {
      return (
        <div>
          <Component counter={this.state.counter} />
          <button
          className="button"
            onClick={() => this.setState({ counter: this.state.counter + 1 })}
          >
            Increment
          </button>
        </div>
      );
    }
  };

class CounterHOC extends React.Component {
  render() {
    return (
      <div>CounterHO with Higher Order Component: {this.props.counter}</div>
    );
  }
}

const WithCounterComponent = withCounter(CounterHOC);

// ==========================================================================================
const TypeContext = createContext({});
const { Provider, Consumer } = TypeContext;

const TestContext = createContext({});

const CoreDb = props => {
  const [type, setType] = useState("SOME_TYPE");

  return (
    <TestContext.Provider
      value={{
        test: "test"
      }}
    >
      <Provider
        value={{
          type,
          setType
        }}
      >
        {props.children}
      </Provider>
    </TestContext.Provider>
  );
};

const CoreDbLayer = props => {
  return (
    <Consumer>
      {contextProps => (
        <TestContext.Consumer>
          {context2Props => {
            return (
              <div>
                CoreDbLayer: {contextProps.type}, test: {context2Props.test}
              </div>
            );
          }}
        </TestContext.Consumer>
      )}
    </Consumer>
  );
};

const CoreDbLayer2 = props => {
  const testContext = useContext(TestContext);
  const typeContext = useContext(TypeContext);
  return (
    <div>
      testContext: {testContext.test}, type: {typeContext.type}
    </div>
  );
};

const CoreDbControl = props => {
  return (
    <Consumer>
      {contextProps => (
        <div>
          <button
          className="button"
            onClick={() => {
              contextProps.setType(
                Math.random()
                  .toString(36)
                  .substring(2, 15) +
                  Math.random()
                    .toString(36)
                    .substring(2, 15)
              );
            }}
          >
            Changed type
          </button>
        </div>
      )}
    </Consumer>
  );
};

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

  const modalOpenClicked = () => {
    setModalOpen(true);
  };

  return (
    <div style={{ margin: "8px" }}>
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

      <button onClick={modalOpenClicked} className="button">Open modal</button>
      <Modal open={isModalOpen} toggle={toggle}>
        <ModalHeader close>This is header :)</ModalHeader>
        <ModalBody>
            {[1,2,3,4,5,6,7,8,9].map(i => LOREM_IPSUM)}
        </ModalBody>
        <ModalFooter>
            Something in footer <button className="button">ELO</button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default App;
