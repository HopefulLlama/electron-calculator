import * as React from 'react';

interface Props {
  display: string
};

export default class extends React.Component<Props, {}> {
  constructor(props: Props, state: {}) {
    super(props, state);
  }

  render() {
    return (
      <div className="field">
        <div className="control">
          <input className="input is-primary is-rounded has-text-right" type="text" disabled value = {this.props.display || ''} />
        </div>
      </div>
    );
  }
}