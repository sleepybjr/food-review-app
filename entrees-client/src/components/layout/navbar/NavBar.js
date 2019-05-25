import React, { Component } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button, Icon } from "antd";
import { Link } from "react-router-dom";
import "./NavBar.css";

class NavBar extends Component {
  state = {
    visible: false
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <nav className="menu">
        <div className="menu__logo">
          <Link to="">E-Review</Link>
        </div>
        <div className="menu__container">
          <div className="menu_left">
            <LeftMenu mode="horizontal" />
          </div>
          <div className="menu_right">
            <RightMenu currentUser={this.props.currentUser} setLogout={this.props.setLogout} mode="horizontal" />
          </div>
          <Button
            className="menu__mobile-button"
            type="primary"
            onClick={this.showDrawer}
          >
            <Icon type="align-right" />
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            className="menu_drawer"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <LeftMenu mode="inline" />
            <RightMenu currentUser={this.props.currentUser} setLogout={this.props.setLogout} mode="inline" />
          </Drawer>
        </div>
      </nav>
    );
  }
}

export default NavBar;
