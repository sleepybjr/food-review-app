import React, { Component } from "react";
import RestaurantItem from "./RestaurantItem";
import PropTypes from "prop-types";

class Restaurants extends Component {
  render() {
    return this.props.restaurants.map(restaurant => (
      <RestaurantItem
        key={restaurant.id}
        restaurant={restaurant}
        markComplete={this.props.markComplete}
        delRestaurant={this.props.delRestaurant}
      />
    ));
  }
}

// PropTypes
Restaurants.propTypes = {
  restaurants: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delRestaurant: PropTypes.func.isRequired
};

export default Restaurants;
