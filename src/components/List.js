import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showList: false
    };
  }
  toggleButtonHandle() {
    this.setState(prevState => ({
      showList: !prevState.showList
    }));
  }
  render() {
    const buttonText = this.state.showList ? "Hide" : "Show";
    let content;
    if (this.props.list.length > 0) {
      content = <p>hjfjd</p>;
      const List = this.state.showList
        ? this.props.list.map(el => {
            const link = this.props.location + el._id;
            return (
              <li key={el._id}>
                <Link to={link}>{el.text}</Link>
              </li>
            );
          })
        : null;
      content = (
        <div>
          <button onClick={() => this.toggleButtonHandle()}>
            {buttonText}
          </button>
          <ul>{List}</ul>
        </div>
      );
    } else {
      content = <p>List is empty </p>;
    }

    return content;
  }
}
export default List;
