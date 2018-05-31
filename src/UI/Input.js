import React, { PureComponent } from "react";

export const config = (type, placeholder) => {
  return { type, placeholder };
};

class Input extends PureComponent {
  render() {
    return (
      <input
        type={this.props.type}
        name={this.props.name}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

export default Input;
