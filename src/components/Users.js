import React, { Component } from "react";
import List from "./List";
import axios from "axios";
import Modal from "../UI/Modal/modal";
import UserForm from "./Forms/User";
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalIsVisible: false,
      VitList: []
    };
  }

  loadusers() {
    axios
      .get("/api/users")
      .then(response => {
        this.setState({ VitList: response.data });
      })
      .catch(() => {
        console.log("get ERRRRRR");
      });
  }

  componentDidMount() {
    this.loadusers();
  }
  onSubmit = user => {
    axios
      .post("/api/users", user)
      .then(() => {
        this.loadusers();
      })
      .catch(() => {
        console.log("ERRRRRR");
      });
  };
  toggleModal = () => {
    this.setState(prevState => {
      return { ModalIsVisible: !prevState.ModalIsVisible };
    });
  };
  render() {
    const list = this.state.VitList.map(el => {
      return {
        _id: el._id,
        text: el.name + " " + el.secondname + " " + el.lastname
      };
    });
    return (
      <div>
        <h1>Hello,user!</h1>
        <List list={list} location={"/users/"} />
        <button onClick={this.toggleModal}>Добавить пользователя</button>
        {this.state.ModalIsVisible ? (
          <Modal>
            <UserForm onSubmit={this.onSubmit} />
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default UserList;
