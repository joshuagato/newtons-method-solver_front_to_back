import React, { Component } from 'react';
import './Input.scss';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions/index';

import InputHandler from '../../methods/InputHandler/InputHandler';
import { calculate } from '../../methods/Calculate/Calculate';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      startmessage: 'Please enter a polynomial function!',
      errormessage: 'Please enter a polynomial function. E.g 2x^3 + 2x^2 - 4x + 1',
      completeerror: 'Please complete the polynomial function'
    }

    this.inputHandler = this.inputHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.input) this.props.onClearSyntaxErrorMessage();
  }

  inputHandler(event) {
    // InputHandler.checkCompletePolynomial(event.target.value);

    if (!this.state.input && this.props.solution) {
      this.props.disableSolveButton();
      this.props.onClearSolution();
    }

    let input = event.target.value;

    const inputData = {
      function: input
    };

    axios.post('http://127.0.0.1:8000/api/solv/fetch', inputData).then(response => {
      const data = response.data;

      if (!data.success && this.state.input && this.props.solution) this.props.onClearSolution();
      
      if (data.success) {
        this.props.onSetSolution(data.result.function, data.result.solution);
      }
    })
    .catch(error => console.log(error));

    this.setState({ input });

    const result = InputHandler.processInput(input);

    if (result) {
      this.props.onClearSyntaxErrorMessage();
      this.props.onEnableSolveButton();
    }
    else this.props.onDisableSolveButton(this.state.errormessage);
  };

  submitForm(event) {
    event.preventDefault();

    const result = calculate(this.state.input);
    if (result.success) {
      this.props.onSetSolution(result.solution, this.state.input);

      const inputData = {
        function: this.state.input,
        solution: result.solution
      };
      
      axios.post('http://127.0.0.1:8000/api/solv/store', inputData).then(response => {
      console.log('store trigerred...');
      const data = response.data;
      
      if (data.success) {
        console.log('successful')
      }
    })
    .catch(error => console.log(error));
    
    }
  };

  render() {
    let displayInfo;

    if(this.props.solution && !this.props.syntaxError) {
      displayInfo = (<p className="solution">The <b>root</b> of the function: 
        <b> {this.props.inputFunction}</b> ===>>> <b>{this.props.solution}</b></p>);
    }
    else if (this.props.syntaxError) {
      displayInfo = (<p className="tip error"><b>{this.props.syntaxError}</b></p>);
    }
    else if (this.state.input && !this.props.syntaxError && !this.props.buttonDisabled) {
      displayInfo = (<p className="tip goahead"><b>Please Click on the SOLVE button to CALCULATE</b></p>);
    }

    else if (!this.state.input && this.props.buttonDisabled) {
      displayInfo = (<p className="tip start"><b>{this.state.startmessage}</b></p>);
    }

    return (
      <div className="input-div">
        <form onSubmit={this.submitForm}>
          <input type="text" placeholder="Enter your function here... E.g 2x^3 + 2x^2 + 4x + 1"
            onChange={this.inputHandler} value={this.state.input} />
          <button disabled={this.props.buttonDisabled}>SOLVE</button>
            
            {displayInfo}
            
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    inputFunction:  state.solverReducer.inputFunction,
    solution:  state.solverReducer.solution,
    error:  state.solverReducer.error,
    syntaxError:  state.solverReducer.syntaxError,
    buttonDisabled:  state.solverReducer.buttonDisabled,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onEnableSolveButton: () => dispatch(actions.enableSolveButton()),
    onDisableSolveButton: message => dispatch(actions.disableSolveButton(message)),
    onClearSyntaxErrorMessage: () => dispatch(actions.clearSyntaxErrorMessage()),
    onSetSolution: (inputFunction, solution) => dispatch(actions.setSolution(inputFunction, solution)),
    onClearSolution: () => dispatch(actions.clearSolution()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
