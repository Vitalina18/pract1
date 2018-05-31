import React, { Component } from "react";
import Input, { config } from "../../UI/Input";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.fields = {
      lastname: config("text", "Фамилия"),
      name: config("text", "Имя"),
      secondname: config("text", "Отчество"),
      date: config("date", new Date("25 Dec, 1995")),
      tel: config("text", "Телефонный номер")
    };

    this.initState = {};

    for (let i in this.fields) {
      if (this.fields.hasOwnProperty(i)) this.initState[i] = "";
    }

    this.state = { ...this.initState };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({ ...this.initState });
  };

  render() {
    const inputs = Object.keys(this.fields).map(el => {
      return (
        <Input
          key={el}
          type={this.fields[el].type}
          name={el}
          placeholder={this.fields[el].placeholder}
          value={this.state[el]}
          onChange={this.onChange}
        />
      );
    });
    return (
      <form onSubmit={this.onSubmit}>
        {inputs}
        <button type="submit">Сохранить</button>
      </form>
    );
  }
}

export default UserForm;
