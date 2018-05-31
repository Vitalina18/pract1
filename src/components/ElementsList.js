import React, { PureComponent } from "react";

class ElementsList extends PureComponent {
  render() {
    let elements = [];
    this.props.selected.forEach(sel => {
      const index = this.props.elements.findIndex(el => el.id === sel);
      if (index >= 0) {
        const el = this.props.elements[index];
        elements.push(
          <li key={el.id}>
            {el.text}{" "}
            <button onClick={() => this.props.onClick(el.id)}>Удалить</button>
          </li>
        );
      }
    });

    return elements.length > 0 ? <ol>{elements}</ol> : null;
  }
}

export default ElementsList;
