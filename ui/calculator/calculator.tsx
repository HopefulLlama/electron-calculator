import * as React from 'react';

import ActiveDisplay from './active-display';
import SummaryDisplay from './summary-display';
import ArbitraryButton from './arbitrary-button';
import NumericButton from './numeric-button';
import OperandButton from './operand-button';
import EquationElement from './equation-element';
import calculate from './calculate';
interface State {
  summary: string,
  elements: EquationElement[]
};

export default class extends React.Component<{}, State> {
  constructor(props: object, state: object) {
    super(props, state);
    this.state = {
      summary: '',
      elements: [new EquationElement('number', '0')]
    };
  }

  reset() {
    this.setState({
      summary: '',
      elements: [new EquationElement('number', '0')]
    });
  }

  clearLast() {
    if(this.lastElementIs(element => element.text.length > 1)) {
      this.lastElement.text = this.lastElement.text.slice(0, - 1);
    } else {
      this.state.elements.pop();
    }

    if(this.state.elements.length === 0) {
      this.state.elements.push(new EquationElement('number', '0'));
    }

    this.setState(this.state);
  }

  calculate() {
    const summary = this.display;
    const elements = [calculate(this.state.elements)];

    this.setState({summary, elements});
  }

  get lastElement(): EquationElement {
    return this.state.elements[this.state.elements.length - 1];
  }

  lastElementIs(test: (equation: EquationElement) => boolean): boolean {
    return this.lastElement !== undefined && test(this.lastElement);
  }

  get display(): string {
    return this.state.elements.reduce((display, element, index) => {
      if(element.isNumber()) {
        return `${display}${element.text}`;
      } else if(element.text === '-' && this.state.elements[index - 1].isOperand()) {
        return `${display} ${element.text}`;
      } else {
        return `${display} ${element.text} `;
      }
    }, '');
  }

  addNumber(text: string): void {
    const emptyList = this.state.elements.length === 0;
    const lastElementIsOperand = this.lastElementIs(element => element.isOperand());

    const isDot = text === '.';
    const lastElementIsNumber = this.lastElementIs(element => element.isNumber());
    const lastElementContainsDot = this.lastElementIs(element => element.text.indexOf('.') > -1);

    const dotIsNotValid = ((lastElementIsNumber && lastElementContainsDot) || lastElementIsOperand || emptyList);

    if(isDot && dotIsNotValid) {
      // do nothing
    } else if(emptyList || lastElementIsOperand) {
      this.state.elements.push(new EquationElement('number', text));
    } else if(lastElementIsNumber && this.lastElementIs(element => element.text === '0') && !isDot) {
      this.lastElement.text = text;
    } else {
      this.lastElement.text = `${this.lastElement.text}${text}`;
    }

    this.setState(this.state);
  }

  addOperand(text: string): void {
    if(this.lastElementIs(element => element.isNumber())) {
      this.state.elements.push(new EquationElement('operand', text));
    } else if(text === '-' && this.lastElementIs(element => element.isOperand())) {
      this.state.elements.push(new EquationElement('number', text));
    }

    this.setState(this.state);
  }

  render() {
    return (
      <div className="container">
        <SummaryDisplay display={this.state.summary} />
        <ActiveDisplay display={this.display} />
        <div className="columns">
          <div className="column"></div>
          <div className="column"></div>

          <div className="column">
            <ArbitraryButton text="C" onClick={() => this.clearLast()} />
          </div>
          <div className="column">
            <ArbitraryButton text="AC" onClick={() => this.reset()} />
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <NumericButton value="7" onClick={() => this.addNumber("7")} />
          </div>
          <div className="column">
            <NumericButton value="8" onClick={() => this.addNumber("8")} />
          </div>
          <div className="column">
            <NumericButton value="9" onClick={() => this.addNumber("9")} />
          </div>
          <div className="column">
            <OperandButton text="÷" onClick={() => this.addOperand("÷")}/>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <NumericButton value="4" onClick={() => this.addNumber("4")} />
          </div>
          <div className="column">
            <NumericButton value="5" onClick={() => this.addNumber("5")} />
          </div>
          <div className="column">
            <NumericButton value="6" onClick={() => this.addNumber("6")} />
          </div>
          <div className="column">
            <OperandButton text="×" onClick={() => this.addOperand("×")}/>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <NumericButton value="1" onClick={() => this.addNumber("1")} />
          </div>
          <div className="column">
            <NumericButton value="2" onClick={() => this.addNumber("2")} />
          </div>
          <div className="column">
            <NumericButton value="3" onClick={() => this.addNumber("3")} />
          </div>
          <div className="column">
            <OperandButton text="-" onClick={() => this.addOperand("-")}/>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <NumericButton value="0" onClick={() => this.addNumber("0")} />
          </div>
          <div className="column">
            <NumericButton value="." onClick={() => this.addNumber(".")} />
          </div>
          <div className="column">
            <ArbitraryButton text="=" onClick={() => this.calculate()} />
          </div>
          <div className="column">
            <OperandButton text="+" onClick={() => this.addOperand("+")}/>
          </div>
        </div>
      </div>
    );
  }
}