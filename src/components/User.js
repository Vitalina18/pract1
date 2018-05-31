import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }
  loadusers() {
    const { location } = this.props;

    axios
      .get("/api/" + location.pathname)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(() => {
        console.log("get ERRRRRR");
      });
  }
  componentDidMount() {
    this.loadusers();
  }
  DeleteButtonHandle() {
    const { location } = this.props;

    axios
      .delete("/api/" + location.pathname)
      .then(response => {
        this.props.history.push("/users");
      })
      .catch(() => {
        console.log("get ERRRRRR");
      });
  }
  render() {
    console.log(this.state.user);
    if (this.state.user === null) return <p>Загружаю...</p>;
    else if (this.state.user === false) return <p>Пользователь не найден</p>;
    else
      return (
        <div>
          <h1>New user</h1>
          <p>Фамилия:{this.state.user.lastname}</p>
          <p>Имя:{this.state.user.name}</p>
          <p>Отчество:{this.state.user.secondname}</p>
          <p>Телефон:{this.state.user.tel}</p>
          <p>Дата рождения:{this.state.user.date}</p>
          <button onClick={() => this.DeleteButtonHandle()}>
            Удалить пользователя
          </button>
        </div>
      );
  }
}

export default withRouter(User);
