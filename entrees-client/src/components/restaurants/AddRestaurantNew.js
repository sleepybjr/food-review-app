import React, { Component } from "react";
import PropTypes from "prop-types";

export class AddRestaurant extends Component {
  state = {
    name: "",
    description: ""
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addRestaurant(this.state.name, this.state.description);
    this.setState({ name: "", description: "" });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
        <input
          type="text"
          name="name"
          style={{ flex: "3", padding: "5px" }}
          placeholder="Add Restaurant ..."
          value={this.state.name}
          onChange={this.onChange}
        />
        <input
          type="text"
          name="description"
          style={{ flex: "7", padding: "5px" }}
          placeholder="Add Description ..."
          value={this.state.description}
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{ flex: "1" }}
        />
      </form>
    );
  }
}

// PropTypes
AddRestaurant.propTypes = {
  addRestaurant: PropTypes.func.isRequired,
};

export default AddRestaurant;
