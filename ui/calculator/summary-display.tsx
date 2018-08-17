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
      <h1>{this.state.display || ''}</h1>
    );
  }
}