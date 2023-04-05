//your code here
class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = 'OutOfRangeError';
  }
}

class InvalidExprError extends Error {
  constructor() {
    super('Expression should not have an invalid combination of expression');
    this.name = 'InvalidExprError';
  }
}

function evalString(expr) {
  try {
    if (/^\s*$/.test(expr)) {
      return 0;
    }
    if (/^[+/*]/.test(expr)) {
      throw new SyntaxError('Expression should not start with invalid operator');
    }
    if (/[+\-/*]$/.test(expr)) {
      throw new SyntaxError('Expression should not end with invalid operator');
    }
    if (/[+\-/*]{2}/.test(expr)) {
      throw new InvalidExprError();
    }
    const result = eval(expr);
    if (!Number.isInteger(result)) {
      throw new OutOfRangeError(result);
    }
    return result;
  } catch (err) {
    if (err instanceof SyntaxError || err instanceof InvalidExprError || err instanceof OutOfRangeError) {
      throw err;
    }
    throw new SyntaxError(`Invalid expression: ${expr}`);
  }
}
