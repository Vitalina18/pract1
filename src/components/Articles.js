import React, { Component } from "react";
import List from "./List";
import axios from "axios";
import Select from "../UI/Select";
import ElementsList from "./ElementsList";
import { Link } from "react-router-dom";

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Date: "",
      Articles: [],
      Users: [],
      Authors: [],
      SelectValue: ""
    };
  }

  loadarticles() {
    axios
      .get("/api/articles")
      .then(response => {
        console.log(response.data);
        this.setState({ Articles: response.data });
      })
      .catch(() => {
        console.log("get ERRRRRR");
      });
  }

  loadusers() {
    axios
      .get("/api/users")
      .then(response => {
        const newUsers = response.data.map(el => {
          return { id: el._id, text: `${el.name} ${el.lastname}` };
        });
        this.setState({ Users: newUsers });
      })
      .catch(() => {
        console.log("get ERRRRRR");
      });
  }

  componentDidMount() {
    this.loadarticles();
    this.loadusers();
  }
  onClickAddAuthor = () => {
    this.setState(prevState => {
      return {
        SelectValue: "",
        Authors: [...prevState.Authors, prevState.SelectValue]
      };
    });
  };

  onClickDeleteAuthor = id => {
    this.setState(prevState => {
      const newAuthors = prevState.Authors.filter(el => el !== id);
      return { Authors: newAuthors };
    });
  };
  onClickSaveArticles = () => {
    const article = {
      name: this.state.Name,
      date: this.state.Date,
      pages: this.state.pages,
      authors: this.state.Authors
    };
    axios
      .post("/api/articles", article)
      .then(() => {
        this.loadarticles();
      })
      .catch(() => {
        console.log("ERRRRRR");
      });
  };
  handleChangeName(event) {
    this.setState({ Name: event.target.value });
  }
  handleChangeDate(event) {
    this.setState({ Date: event.target.value });
  }
  handleChangePages(event) {
    this.setState({ Pages: event.target.value });
  }
  handleChangeSelect = event => {
    const value = event.target.value;
    this.setState({ SelectValue: value });
  };
  render() {
    let disabledSave = false;
    if (this.state.Name === "") disabledSave = true;
    if (this.state.Authors.length === 0) disabledSave = true;
    console.log(this.state.Authors.length, disabledSave);
    return (
      <div>
        <h1>Articles</h1>
        <p>{this.props.children}</p>
        <div>
          <ul>
            {this.state.Articles.map(el => {
              return (
                <li key={el._id}>
                  <Link to={`/articles/${el._id}`}>{el.name}</Link>
                </li>
              );
            })}
          </ul>
          <input
            placeholder="Name"
            value={this.state.Name}
            onChange={event => this.handleChangeName(event)}
          />
          <input
            // placeholder="Date"
            // value={this.state.Date}
            type="date"
            onChange={event => this.handleChangeDate(event)}
          />
          <input
            placeholder="Pages"
            type="number"
            value={this.state.Pages}
            onChange={event => this.handleChangePages(event)}
          />
          <Select
            disabled={this.state.Authors}
            value={this.state.SelectValue}
            options={this.state.Users}
            onChange={this.handleChangeSelect}
            defaultText={"Выберите автора"}
          />
          {this.state.SelectValue ? (
            <button onClick={this.onClickAddAuthor}>Добавить автора </button>
          ) : null}
          <p>Выбранные пользователи</p>
        </div>
        <ElementsList
          elements={this.state.Users}
          selected={this.state.Authors}
          onClick={this.onClickDeleteAuthor}
        />
        <button disabled={disabledSave} onClick={this.onClickSaveArticles}>
          Добавить статью{" "}
        </button>
      </div>
    );
  }
}

export default ArticleList;
