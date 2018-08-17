import * as React from 'react';

interface Props {
  text: string
};

export default class extends React.Component<Props, {}> {
  constructor(props: Props, state: object) {
    super(props, state);
  }

  render() {
    return (
      <button className="button is-primary is-fullwidth">{this.props.text}</button>
    );
  }
}