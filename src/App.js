import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { INCREMENT, DECREMENT } from "./actionTypes";
import { compose, createStore } from "redux";
import { Counter } from "./Counter";

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(value = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return value + 1;
    case "DECREMENT":
      if (value > 0) {
        return value - 1;
      }
    default:
      return value;
  }
}

// enable redux devtools... can this be done with Webpack instead?
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(counter, 0, enhancers);

class App extends Component {
  unsubscribe = () => {};

  constructor() {
    super();
    this.state = { value: 0 };
  }

  componentWillMount() {
    // You can use subscribe() to update the UI in response to state changes.
    // Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
    // However it can also be handy to persist the current state in the localStorage.
    this.unsubscribe = store.subscribe(() => {
      const value = store.getState();
      console.log(value);
      this.setState({ value });
    });
  }

  componentWillUnmount() {
    // Stop listening to state updates
    this.unsubscribe();
  }

  onIncrement = () => {
    // The only way to mutate the internal state is to dispatch an action.
    // The actions can be serialized, logged or stored and later replayed.
    store.dispatch(INCREMENT);
  };

  onDecrement = () => {
    store.dispatch(DECREMENT);
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React with Redux</h2>
        </div>
        <Counter
          onIncrement={this.onIncrement}
          onDecrement={this.onDecrement}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default App;
