import React, { Component } from 'react';
import './App.scss';

import Input from './Input/Input';
import InputHandler from '../methods/InputHandler/InputHandler';

class App extends Component {
  calculate() {}  
  inputHandler() {}  

  render() {
    return(
      <div id="App">
        <Input />
      </div>
    );
  };
}

export default App;