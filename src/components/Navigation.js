import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="nav">

      <div className="logo">
        <img src="./img/flag.png" alt="logo" />
      </div>

      <div className="links">
        <NavLink exact to="/" activeClassName="nav-active">
          Home
        </NavLink>

        <NavLink exact to="a-propos" activeClassName="nav-active">
          About
        </NavLink>
      </div>
      
    </div>
  );
};

export default Navigation;
