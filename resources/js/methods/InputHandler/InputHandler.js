class InputHandler {

  static processInput (input) {
    
    const regex = RegExp(/\d*x\^+[0-9]+/);
    if(!regex.test(input)) {        
      return false;
    }
    
    return true;    
  }
  
}

export default InputHandler;