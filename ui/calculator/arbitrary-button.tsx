import * as React from 'react';

interface Props {
  text: string,
  onClick: Function
};

export default class extends React.Component<Props, {}> {
  constructor(props: Props, state: object) {
    super(props, state);
  }

  render() {
    return (
      <button className="button arbitrary-button is-primary is-fullwidth" onClick={() => this.props.onClick()}>{this.props.text}</button>
    );
  }
}