import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null
    };
  }
  loadArticle() {
    const { location } = this.props;

    axios
      .get("/api/" + location.pathname)
      .then(response => {
        this.setState({ article: response.data });
      })
      .catch(() => {
        console.log("get ERRRRRR");
      });
  }
  componentDidMount() {
    this.loadArticle();
  }
  DeleteButtonHandle() {
    const { location } = this.props;
    console.log(location);

    axios
      .delete("/api/" + location.pathname)
      .then(response => {
        console.log("Delete", response.data);
        this.props.history.push("/articles");
      })
      .catch(() => {
        console.log("get ERRRRRR");
      });
  }
  render() {
    if (this.state.article === null) return <p>Загружаю...</p>;
    else if (this.state.article === false) return <p>Пользователь не найден</p>;
    else
      return (
        <div>
          <h1>{this.state.article.name}</h1>
          <p>Количество страниц:{this.state.article.pages}</p>
          <p>Опубликована:{this.state.article.date}</p>
          <p>Авторы:</p>
          <ol>
            {this.state.article.authors.map(el => {
              console.log(el);
              return (
                <li key={el.id}>
                  <Link to={`/users/${el.id}`}>
                    {" "}
                    {`${el.lastname} ${el.name} ${el.secondname}`}
                  </Link>
                </li>
              );
            })}
          </ol>
          <button onClick={() => this.DeleteButtonHandle()}>
            Удалить cтатью
          </button>
        </div>
      );
  }
}

export default withRouter(Article);
