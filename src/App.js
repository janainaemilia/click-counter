import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = { counter: 0, error: false }

    this.incrementCounter = this.incrementCounter.bind(this)
    this.decrementCounter = this.decrementCounter.bind(this)
  }

  incrementCounter(){
    const counter = this.state.counter

    if(counter >= 0)
      this.setState({ error: false })

      this.setState({ counter: this.state.counter + 1 })
  }

  decrementCounter(){
    const counter = this.state.counter

    if(counter === 0)
      this.setState({ error: true })
    else
      this.setState({ counter: this.state.counter - 1 })
  }

  render() {
    return (
      <div data-test="component-app">
          <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
          <h1 data-test="message-error">{(this.state.error) ? "The counter can't go below zero" : ""}</h1>
          <button data-test="increment-button"
                  onClick={this.incrementCounter}>
              increment            
          </button>
          <button data-test="decrement-button"
                  onClick={this.decrementCounter}>
              dencrement            
          </button>
      </div>
    );
  }
}

export default App;
