import React, { Component } from "react";
import PropTypes from "prop-types";

export class RestaurantItem extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.restaurant.add_entree ? "line-through" : "none"
    };
  };

  render() {
    const { id, name, description } = this.props.restaurant;
    return (
      <div style={this.getStyle()}>
        <p>
          <input
            type="checkbox"
            onChange={this.props.markComplete.bind(this, id)}
          />{" "}
          {name} {"- "} {description}
          <button
            onClick={this.props.delRestaurant.bind(this, id)}
            style={btnStyle}
          >
            x
          </button>
        </p>
      </div>
    );
  }
}

// PropTypes
RestaurantItem.propTypes = {
  restaurant: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delRestaurant: PropTypes.func.isRequired
};

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right"
};

export default RestaurantItem;
