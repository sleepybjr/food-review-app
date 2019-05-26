import { Card, Col, Rate, Avatar } from "antd";
import React, { Component } from "react";
import "./ReviewsCard.css";
import dateFormat from "dateformat";

const { Meta } = Card;

class ReviewsCard extends Component {
  render() {
    return (
      <Col style={{ padding: "8px" }} xs={24} sm={12} md={8}>
        <Card bordered={false}>
          <Meta
            avatar={<Avatar icon="user" />}
            title={this.props.review.createdBy.username}
            description={[
              <div key={1}>
                <div className="rate-mini-header">
                  <Rate
                    disabled
                    value={parseInt(this.props.review.rating, 10)}
                  />
                  <div className="rate-date">
                    {dateFormat(
                      this.props.review.creationDateTime,
                      "mmm dS, yyyy"
                    )}
                  </div>
                </div>
                {this.props.review.text}
              </div>
            ]}
          />
        </Card>
      </Col>
    );
  }
}

export default ReviewsCard;
