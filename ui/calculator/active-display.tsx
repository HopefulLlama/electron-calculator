import * as React from 'react';

interface State {
  display: string
};

export default class extends React.Component<{}, State> {
  constructor(props: object, state: State) {
    super(props, state);
    this.state = {
      display: ''
    };
  }

  render() {
    return (
      <div className="field">
        <div className="control">
          <input className="input is-primary is-rounded has-text-right" type="text" disabled value = {this.state.display || ''} />
        </div>
      </div>
    );
  }
}