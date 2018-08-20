export default class {
  type: string;
  text: string;

  constructor(type: string, text: string) {
    this.type = type;
    this.text = text;
  }

  isNumber(): boolean {
    return this.type === 'number';
  }

  isOperand(): boolean {
    return this.type === 'operand';
  }
};