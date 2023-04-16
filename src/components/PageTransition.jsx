import React from "react";
import { CSSTransition } from "react-transition-group";
import "../PageTransition.css";

const PageTransition = ({ children, transitionKey }) => {
  return (
    <CSSTransition
      key={transitionKey}
      timeout={300}
      classNames="page-transition"
    >
      <div className="page-transition">{children}</div>
    </CSSTransition>
  );
};

export default PageTransition;
