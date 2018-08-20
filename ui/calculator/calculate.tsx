import EquationElement from "./equation-element";

interface Operators {
  [index: string]: (a: string, b: string) => string
}

function sanitise(elements: EquationElement[]): void {
  if(elements[elements.length - 1].isOperand()) {
    elements.pop();
  }
  if(elements[elements.length - 1].isNumber() && elements[elements.length - 1].text === '-') {
    elements[elements.length - 1].text = '0';
  }
}

const operators: Operators = {
  '+': (a: string, b: string): string => (parseFloat(a) + parseFloat(b)).toString(10),
  '-': (a: string, b: string): string => (parseFloat(a) - parseFloat(b)).toString(10),
  '×': (a: string, b: string): string => (parseFloat(a) * parseFloat(b)).toString(10),
  '÷': (a: string, b: string): string => (parseFloat(a) / parseFloat(b)).toString(10)
};

function solveTriplet(a: EquationElement, operand: EquationElement, b: EquationElement) {
  return new EquationElement('number', operators[operand.text](a.text, b.text));
}

function calculate(elements: EquationElement[]): EquationElement {
  sanitise(elements);

  const order = elements
    .filter(element => element.text === '×' || element.text === '÷')
    .concat(elements.filter(element => element.text === '+' || element.text === '-'));

  order.forEach(element => {
    const index = elements.indexOf(element);
    const result = solveTriplet(elements[index - 1], element, elements[index + 1]);
    elements.splice(index - 1, 3, result);
  });

  return elements.pop();
}

export default calculate;