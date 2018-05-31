import React from "react";
//import "./modal.css"

const modal = props => {
  return (
    <div>
      {props.children}
      <button onClick={props.closeButton}>Закрыть</button>
    </div>
  );
};
export default modal;
