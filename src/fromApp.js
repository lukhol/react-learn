import React, { createContext, useState, useContext, useEffect } from "react";

export class Counter extends React.Component {
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
  
  export class CounterFun extends React.Component {
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
  
  export const withCounter = Component =>
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
  
  export class CounterHOC extends React.Component {
    render() {
      return (
        <div>CounterHO with Higher Order Component: {this.props.counter}</div>
      );
    }
  }
  
  export const WithCounterComponent = withCounter(CounterHOC);
  
  // ==========================================================================================
  const TypeContext = createContext({});
  const { Provider, Consumer } = TypeContext;
  
  const TestContext = createContext({});
  
  export const CoreDb = props => {
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
  
  export const CoreDbLayer = props => {
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
  
  export const CoreDbLayer2 = props => {
    const testContext = useContext(TestContext);
    const typeContext = useContext(TypeContext);
    return (
      <div>
        testContext: {testContext.test}, type: {typeContext.type}
      </div>
    );
  };
  
  export const CoreDbControl = props => {
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