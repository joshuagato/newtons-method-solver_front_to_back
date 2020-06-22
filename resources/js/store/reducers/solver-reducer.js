import * as actionTypes from "../actions/actionTypes";

const initialState = {
  inputFunction: '',
  solution: null,
  error: null,
  syntaxError: null,
  buttonDisabled: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ENABLE_SOLVE_BUTTON:
      return { ...state, buttonDisabled: false, syntaxError: action.message };

    case actionTypes.DISABLE_SOLVE_BUTTON:
      return { ...state, buttonDisabled: true, syntaxError: action.message };
    
    case actionTypes.CLEAR_SYNTAX_ERROR_MESSAGE:
      return { ...state, buttonDisabled: true, syntaxError: '' };
    
    case actionTypes.SET_SOLUTION:
      return { ...state, buttonDisabled: true, syntaxError: '', solution: action.solution, 
        inputFunction: action.inputFunction };
    
    case actionTypes.CLEAR_SOLUTION:
      return { ...state, buttonDisabled: true, solution: '' };
    
    default: return state;
  }
};

export default reducer;