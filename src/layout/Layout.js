import React from "react";
import { NavLink } from "react-router-dom";

const Layout = props => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/users" activeStyle={{ color: "green" }}>
              Преподаватели
            </NavLink>
          </li>
          <li>
            <NavLink to="/articles" activeStyle={{ color: "green" }}>
              Публикации
            </NavLink>
          </li>
        </ul>
        <main>{props.children}</main>
      </nav>
    </div>
  );
};

export default Layout;
