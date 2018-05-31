import React, { PureComponent } from "react";

class OptionsList extends PureComponent {
  render() {
    const options = [];
    this.props.options.forEach(el => {
      if (!this.props.disabled.includes(el.id))
        options.push(
          <option key={el.id} value={el.id}>
            {el.text}
          </option>
        );
    });
    return options;
  }
}

export default OptionsList;
