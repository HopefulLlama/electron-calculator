import * as React from 'react';

import ActiveDisplay from './active-display';
import SummaryDisplay from './summary-display';
import ArbitraryButton from './arbitrary-button';
import NumericButton from './numeric-button';
import OperandButton from './operand-button';
import EquationElement from './equation-element';
import doFirst from '../util/do-first';
import Task from '../util/task';
interface State {
  elements: EquationElement[]
};

export default class extends React.Component<{}, State> {
  constructor(props: object, state: object) {
    super(props, state);
    this.state = {
      elements: []
    };
  }

  reset() {
    this.setState({
      elements: []
    });
  }

  get lastElement(): EquationElement {
    return this.state.elements[this.state.elements.length - 1];
  }

  lastElementIs(test: (equation: EquationElement) => boolean): boolean {
    return this.lastElement !== undefined && test(this.lastElement);
  }

  get display(): string {
    return this.state.elements.reduce((display, element, index) => {
      return doFirst([
        new Task(() => element.isNumber(), text => `${text}${element.text}`),
        new Task(() => element.text === '-' && this.state.elements[index - 1].isOperand(), text => `${text} ${element.text}`),
        new Task(() => true, text => `${text} ${element.text} `)
      ], display);
    }, '')
  }

  addNumber(text: string): void {
    const emptyList = this.state.elements.length === 0;
    const lastElementIsOperand = this.lastElementIs(lastElement => lastElement.isOperand());

    if(emptyList || lastElementIsOperand) {
      this.state.elements.push(new EquationElement('number', text));
    } else {
      this.lastElement.text = `${this.lastElement.text}${text}`;
    }

    this.setState(this.state);
  }

  addOperand(text: string): void {
    const element = doFirst([
      new Task(() => this.lastElementIs(element => element.isNumber()), () => new EquationElement('operand', text)),
      new Task(() => text === '-' && this.lastElementIs(element => element.isOperand() && element.text !== '-'), () => new EquationElement('number', text))
    ], null)

    if(element !== null) {
      this.state.elements.push(element);
    }
    this.setState(this.state);
  }

  render() {
    return (
      <div className="container">
        <SummaryDisplay />
        <ActiveDisplay display={this.display} />
        <div className="columns">
          <div className="column"></div>
          <div className="column"></div>

          <div className="column">
            <ArbitraryButton text="C" onClick={() => {}} />
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
            <ArbitraryButton text="=" onClick={() => {}} />
          </div>
          <div className="column">
            <OperandButton text="+" onClick={() => this.addOperand("+")}/>
          </div>
        </div>
      </div>
    );
  }
}