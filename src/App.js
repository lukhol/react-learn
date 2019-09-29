import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import TestTabs from "./components";

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
          className="counter-increase"
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
        <button onClick={() => this.setState({ counter: counter + 1 })}>
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
    console.log(CounterHOC.name + " rendering");
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
            console.log({ contextProps, context2Props });

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

  return (
    <div style={{ margin: "8px" }}>
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
      <hr />

      <div className="row">
        <h3>Counter with render props (children is a function)</h3>
        <CounterFun>
          {counter => (
            <div>CounterFun with render props as a function: {counter}</div>
          )}
        </CounterFun>
      </div>
      <hr />

      <div className="row">
        <h3>Counter with HOC</h3>
        <WithCounterComponent />
      </div>
      <hr />

      <div className="row">
        <h3>Compound components with context 1</h3>
        <CoreDb>
          <CoreDbLayer />
          <CoreDbControl />

          <CoreDbLayer2 />
        </CoreDb>
      </div>
      <hr />

      <div className="row">
        <h3>Request test</h3>
        <div className="_result">
          IS SUCCESS: {result != null ? result.toString() : null}
        </div>
      </div>
      <hr />

      <div className="row">
        <h3>Compound components with context 2 (TABS)</h3>
        <TestTabs />
      </div>
      <hr />
    </div>
  );
};

export default App;
