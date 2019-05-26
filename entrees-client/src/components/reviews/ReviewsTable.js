import React, { Component } from "react";
import { Row, Typography, Button } from "antd";
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
  // add sorting
  // move axios to api file
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
    const newUrl = `/entrees/${this.props.match.params.id}/reviews/create`;
    return (
      <div>
        <div style={{ overflow: "hidden" }}>
          <Title level={2}>{this.state.data.name}</Title>
          <span style={{ float: "left", paddingTop: "8px" }}>
            <Text>{this.state.data.description}</Text>
          </span>
          <span
            style={{
              float: "right",
              paddingBottom: "10px",
              paddingRight: "10px"
            }}
          >
            <Button onClick={() => this.props.history.push(newUrl)} type="primary">
              Write Review
            </Button>
          </span>
        </div>
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
