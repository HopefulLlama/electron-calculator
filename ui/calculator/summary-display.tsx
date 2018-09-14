import * as React from 'react';

interface Props {
  display: string
};

export default class extends React.Component<Props, {}> {
  constructor(props: Props, state: object) {
    super(props, state);
  }

  render() {
    return (
      <h1 id="summary-display" className="has-text-right">{this.props.display}</h1>
    );
  }
}