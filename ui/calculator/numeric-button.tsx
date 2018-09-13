import * as React from 'react';

interface Props {
  value: string,
  onClick: Function
};

export default class extends React.Component<Props, {}> {
  constructor(props: Props, state: object) {
    super(props, state);
  }

  render() {
    return (
      <button className="button numeric-button is-primary is-outlined is-fullwidth" onClick={() => this.props.onClick()}>{this.props.value}</button>
    );
  }
}