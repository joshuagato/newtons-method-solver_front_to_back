class InputHandler {

  static processInput (input) {
    const regex = RegExp(/^(\d*x\^+[2-9]+\s*[+-]\s*)*([2-9]*x\s*[+-]\s*)*([2-9]+x|\d+|x)$/);

    if(!regex.test(input)) {
      return false;
    }
    
    return true;
  }

  static checkCompletePolynomial (inputFunction) {
    let convertedInputFunction = inputFunction.replace(/(\d*x\^+[2-9]+)+([2-9]*x)+([2-9]+x|\d+|x)/g, "$1 + $2 + $3");
    console.log('CCC', convertedInputFunction);
  }
  
}

export default InputHandler;