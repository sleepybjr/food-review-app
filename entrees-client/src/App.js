import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layout/navbar/NavBar";
import NotFound from "./components/layout/NotFound";
import Restaurants from "./components/restaurants/RestaurantsNew";
import EntreesTable from "./components/entrees/EntreesTable";
import ReviewsTable from "./components/reviews/ReviewsTable";
// import AddRestaurant from "./components/AddRestaurant";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import RegisterUser from "./components/pages/RegisterUser";
import RegistrationSuccess from "./components/pages/RegistrationSuccess";
import axios from "axios";
import { currentUserGet } from "./utilities/Api";
import { message } from "antd";

import "./App.css";

class App extends Component {
  state = {
    restaurants: [],
    currentUser: null,
    isAuthenticated: false
  };

  componentDidMount() {
    this.getUser();
    axios
      .get("/api/restaurants")
      .then(res => this.setState({ restaurants: res.data.content }));
  }

  setLogout = () => {
    localStorage.removeItem("accessToken");
    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    message.success("Logout successful!");
  };

  setLogin = () => {
    this.getUser();
    message.success("Login successful!");
  };

  getUser = () => {
    currentUserGet().then(user =>
      this.setState({
        currentUser: user,
        isAuthenticated: true
      })
    ).catch((error) => message.error(error));
  };

  // Toggles To Complete
  markComplete = id => {
    this.setState({
      restaurants: this.state.restaurants.map(restaurant => {
        if (restaurant.id === id) {
          restaurant.add_entree = !restaurant.add_entree;
        }
        return restaurant;
      })
    });
  };

  delRestaurant = id => {
    axios.delete(`/api/restaurants/${id}`).then(res =>
      this.setState({
        restaurants: [
          ...this.state.restaurants.filter(restaurant => restaurant.id !== id)
        ]
      })
    );
  };

  addRestaurant = (name, description) => {
    axios
      .post("/api/restaurants", {
        name,
        description
        // }).then(res => console.log(res.data));
      })
      .then(res =>
        this.setState({ restaurants: [...this.state.restaurants, res.data] })
      );
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <NavBar
              currentUser={this.state.currentUser}
              setLogout={this.setLogout}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <React.Fragment>
                    {/* <AddRestaurant addRestaurant={this.addRestaurant} /> */}
                    {/* <Restaurants
                      restaurants={this.state.restaurants}
                      markComplete={this.markComplete}
                      delRestaurant={this.delRestaurant}
                    /> */}
                    <Restaurants />
                  </React.Fragment>
                )}
              />
              <Route path="/about" component={About} />
              {/* <Route exact path="/user/login" component={Login} /> */}
              <Route
                exact
                path="/user/login"
                render={props => <Login setLogin={this.setLogin} />}
              />
              <Route exact path="/user/create" component={RegisterUser} />
              <Route
                path="/user/create/success"
                component={RegistrationSuccess}
              />
              <Route
                path="/restaurants/:id"
                component={EntreesTable}
              />
              <Route
                path="/entrees/:id"
                component={ReviewsTable}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
