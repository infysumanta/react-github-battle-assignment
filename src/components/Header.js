import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header className="flex">
        <div className="flex">
          <NavLink
            to="/"
            exact
            className={(isActive) =>
              "active" + (!isActive ? " non-active" : "")
            }
          >
            <h4>Popular</h4>
          </NavLink>
          <NavLink
            to="/battle"
            exact
            className={(isActive) =>
              "active" + (!isActive ? " non-active" : "")
            }
          >
            <h4> Battle</h4>
          </NavLink>
        </div>
        <button className="mode-switch" onClick={() => this.props.changeMode()}>
          {this.props.darkMode ? "💡" : "🔦"}
        </button>
      </header>
    );
  }
}

export default Header;
