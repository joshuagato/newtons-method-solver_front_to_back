import * as actionTypes from './actionTypes';

// Actions for enabling/disabling the solve button
export const enableSolveButton = () => {
  return {
    type: actionTypes.ENABLE_SOLVE_BUTTON
  };
};

export const disableSolveButton = message => {
  return {
    type: actionTypes.DISABLE_SOLVE_BUTTON,
    message: message
  };
};
// End of Actions for enabling/disabling the solve button

export const clearSyntaxErrorMessage = () => {
  return {
    type: actionTypes.CLEAR_SYNTAX_ERROR_MESSAGE,
  };
};

export const setSolution = (inputFunction, solution) => {
  return {
    type: actionTypes.SET_SOLUTION,
    solution,
    inputFunction
  };
};

export const clearSolution = () => {
  return {
    type: actionTypes.CLEAR_SOLUTION
  };
};