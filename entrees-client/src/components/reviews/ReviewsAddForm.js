import React, { Component } from "react";
import { Form, Icon, Input, Button, Rate, message } from "antd";
import { addReviewPost } from "./../../utilities/Api";

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const buttonFormItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { offset: 4, span: 20 },
  },
};

class P extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const entreeId = this.props.match.params.id;
        addReviewPost(entreeId, values)
          .then(res => {
            console.log(res.data);
            if (res.data.success === true) {
              message.success(res.data.message)
              this.props.history.push(`/entrees/${entreeId}`);
            } else {
              // then needs to handle general errors that still successfully post
              // console.log(res.data.error);
            }
          })
          .catch(res => 
            message.error(res.response.data.message)
          );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Form {...formItemLayout} 
          // style={{ margin: "auto" }}
          onSubmit={this.handleSubmit}
          className="review-form"
        >
          <Form.Item label="Review">
            {getFieldDecorator("text", {
              rules: [
                { required: true, message: "Please input your review." },
                {
                  max: 500,
                  message: "Must use less than 500 characters."
                }
              ]
            })(
              <TextArea
                rows={4}
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Enter your review here. (500 char max)"
              />
            )}
          </Form.Item>
          <Form.Item label="Rating">
            {getFieldDecorator("rating", {
              rules: [{ required: true, message: "Please choose your rating." }]
            })(<Rate />)}
          </Form.Item>
          <Form.Item {...buttonFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="review-form-button"
            >
              Create Review
            </Button>
          </Form.Item>
        </Form>
    );
  }
}

const WrappedPostReviewForm = Form.create({ name: "review_form" })(P);

export default WrappedPostReviewForm;
