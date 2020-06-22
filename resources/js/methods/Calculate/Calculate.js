import { create, all } from 'mathjs/number';
const math = create(all);

let Parser = require('expr-eval').Parser;

export const calculate = inputFunction => {
  // this.setState({ function: '', root: null, error: null });

  const differential = 'x';
  let derivedFunction = math.derivative(inputFunction, differential).toString();

  // here 2x will be converted to 2*x for Parser to know it is multiplying
  let convertedInputFunction = inputFunction.replace(/([0-9]+)(x)/g, "$1*$2");

  let i, root;
  let x = 5;

  for (i=1; i<= 200; i++) {

    let parsedFuncion = Parser.evaluate('function', { function: convertedInputFunction });
    parsedFuncion = Parser.evaluate(parsedFuncion, { x: x });

    let parsedDerivative = Parser.evaluate('derivative', { derivative: derivedFunction });
    parsedDerivative = Parser.evaluate(parsedDerivative, { x: x });

    root = x - parsedFuncion / parsedDerivative;

    if(Math.abs(root - x) < 0.000001) {
      break;
    }

    x = root;
  }

  return { success: true, solution: root };
}