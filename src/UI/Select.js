import React, { PureComponent } from "react";

import OptionsList from "./OptionsList";

class Select extends PureComponent {
  render() {
    return (
      <select value={this.props.value} onChange={this.props.onChange}>
        <option value={""}>{this.props.defaultText}</option>
        <OptionsList
          options={this.props.options}
          disabled={this.props.disabled}
        />
      </select>
    );
  }
}

export default Select;
