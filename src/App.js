import React from 'react';

class Counter extends React.Component {
	
    constructor(props) {
        super(props);
      this.state = {
          counter: 0
      }
    }
    
    render() {
        return (
            <div>
          {this.props.renderOrSomeAnotherName(this.state.counter)}
          <button onClick={() => {this.setState({counter: this.state.counter + 1})}}>Increment</button>
        </div>
        )
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
          <button onClick={() => this.setState({counter: counter + 1})}>Increment</button>
        </div>
        )
    }
  }
  
  const withCounter = Component => 
      class Abc extends React.Component {
        constructor(props) {
          super(props);
        this.state = {counter: 1};
      }
    
        render() {
          console.log(Abc.name + ' rendering');
          return (
                <div>
            <Component counter={this.state.counter} />
            <button onClick={() => this.setState({counter: this.state.counter + 1})}>Increment</button>
          </div>
            )
      }
    }
  
  
  class CounterHOC extends React.Component {
      
    render() {
        console.log(CounterHOC.name + ' rendering');
        return (
          <div>CounterHO with Higher Order Component: {this.props.counter}</div>
      )
    }
  }
  
  const WithCounterComponent = withCounter(CounterHOC);
  
  
class App extends React.Component {  
  
    render() {
      return (
          <div>
          <Counter 
            renderOrSomeAnotherName={(counter) => (<div>Counter with render props as a prop: {counter}</div>)}
          />
          <hr/>
          
          <CounterFun>
            {(counter) => <div>CounterFun with render props as a function: {counter}</div>}
          </CounterFun>
          <hr/>
          
          <WithCounterComponent/>
          <hr/>
        </div>
      )
    }
}
  

export default App;
