import React, { Component } from "react";
import { Row, Typography } from "antd";
import ReviewsCard from "./ReviewsCard";
import axios from "axios";

const { Title, Text } = Typography;

export class ReviewsTable extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false
  };

  componentDidMount() {
    this.fetch();
  }

  // need to add pagination to the reviewtable
  fetch = (params = {}) => {
    this.setState({ loading: true });
    axios
      .get(`/api/entrees/${this.props.match.params.id}`, {
        params: {
          results: 10,
          ...params
        }
        // headers: {
        //   'Content-Type': "application/json"
        // }
      })
      .then(res => {
        console.log("here");
        console.log(res);
        const pagination = { ...this.state.pagination };

        pagination.total = res.data.totalElements;
        this.setState({
          loading: false,
          data: res.data,
          pagination
        });
      })
      .catch(res => console.log(res));
  };

  render() {
    let reviews = null;
    if (this.state.data.reviews) {
      reviews = this.state.data.reviews.map(review => (
        <ReviewsCard key={review.id} review={review} />
      ));
    }
    return (
      <div>
      <Title level={2}>{this.state.data.name}</Title>
      <Text>{this.state.data.description}</Text>
        <div style={{ background: "#ECECEC", padding: "30px" }}>
          <Row type="flex" gutter={16}>
            {reviews}
          </Row>
        </div>
      </div>
    );
  }
}

export default ReviewsTable;
