import React from "react";

const Footer = (props) => {
  return (
    <footer>
      <p>
        Feito por {" "}
        <a href={props.link} target="_blank">
          {props.children}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
