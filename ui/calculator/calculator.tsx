import * as React from 'react';

import ActiveDisplay from './active-display';
import SummaryDisplay from './summary-display';
import ArbitraryButton from './arbitrary-button';
import NumericButton from './numeric-button';
import OperandButton from './operand-button';

interface State {
  display: string
};

export default class extends React.Component<{}, State> {
  constructor(props: object, state: object) {
    super(props, state);
    this.state = {
      display: ''
    };
  }

  render() {
    return (
      <div className="container">
        <SummaryDisplay />
        <ActiveDisplay />
        <div className="columns">
          <div className="column"></div>
          <div className="column"></div>

          <div className="column">
            <ArbitraryButton text="C" />
          </div>
          <div className="column">
            <ArbitraryButton text="AC" />
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <NumericButton value="7" />
          </div>
          <div className="column">
            <NumericButton value="8" />
          </div>
          <div className="column">
            <NumericButton value="9" />
          </div>
          <div className="column">
            <OperandButton text="÷" />
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <NumericButton value="4" />
          </div>
          <div className="column">
            <NumericButton value="5" />
          </div>
          <div className="column">
            <NumericButton value="6" />
          </div>
          <div className="column">
            <OperandButton text="×" />
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <NumericButton value="1" />
          </div>
          <div className="column">
            <NumericButton value="2" />
          </div>
          <div className="column">
            <NumericButton value="3" />
          </div>
          <div className="column">
            <OperandButton text="-" />
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <NumericButton value="0" />
          </div>
          <div className="column">
            <NumericButton value="." />
          </div>
          <div className="column">
            <ArbitraryButton text="=" />
          </div>
          <div className="column">
            <OperandButton text="+" />
          </div>
        </div>
      </div>
    );
  }
}