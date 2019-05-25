import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

class RightMenu extends Component {

  render() {
    const setLogout = this.props.setLogout;
    let menuItems;
    // console.log(this.props.currentUser);
    if (this.props.currentUser === null) {
      menuItems = [
        <Menu.Item key="signin">
          <Link to="/user/login">Sign In</Link>
        </Menu.Item>,
        <Menu.Item key="signup">
          <Link to="/user/create">Sign Up</Link>
        </Menu.Item>
      ];
    } else {
      menuItems = [
        <Menu.Item key="logout">
          <Link onClick={setLogout} to="/">Log Out</Link>
        </Menu.Item>
      ];
    }
    return <Menu mode={this.props.mode}>{menuItems}</Menu>;
  }
}

export default RightMenu;
