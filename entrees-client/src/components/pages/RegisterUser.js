import { Form, Icon, Input, Button } from "antd";
import React, { Component } from "react";
import { prettyServerSideError } from "./../../utilities/ServerSide";
import { signUpPost, validateUniqueUsernameGet, validateUniqueEmailGet } from "./../../utilities/Api";

class C extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        signUpPost(values)
          .then(res => {
            if (res.data.success === true) {
              this.props.history.push("/user/create/success");
            } else {
              // then needs to handle general errors that still successfully post
              // console.log(res.data.error);
            }
          })
          .catch(res =>
            res.response.data.errors.map(error =>
              this.props.form.setFields({
                [error.field]: {
                  value: values[error.field],
                  errors: [
                    new Error(prettyServerSideError(error.defaultMessage))
                  ]
                }
              })
            )
          );
        // console.log("Received values of form: ", values);
      }
    });
  };

  validateUniqueUser = (rule, value, callback) => {
    const form = this.props.form;
    validateUniqueUsernameGet(value).then(res => {
      if (res.data.available === false) {
        // i can use callbacks to set the error message but this looks way cleaner
        form.setFields({
          username: {
            value,
            errors: [new Error("Please enter a unique username.")]
          }
        });
      }
    });

    callback();
  };

  validateUniqueEmail = (rule, value, callback) => {
    const form = this.props.form;
    validateUniqueEmailGet(value).then(res => {
      if (res.data.available === false) {
        // i can use callbacks to set the error message but this looks way cleaner
        form.setFields({
          email: {
            value,
            errors: [new Error("Please enter a unique email.")]
          }
        });
      }
    });

    callback();
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Please ensure both passwords match.");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      // add callback otherwise prints error when it doesnt match (security issue)
      form.validateFields(["confirm"], { force: true }, () => {});
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <div style={{ display: "flex" }}>
          <Form
            onSubmit={this.handleSubmit}
            style={{ margin: "auto" }}
            className="login-form"
          >
            <Form.Item label="Name" hasFeedback>
              {getFieldDecorator("name", {
                rules: [
                  {
                    whitespace: true,
                    required: true,
                    message: "Please enter your name."
                  },
                  {
                    min: 4,
                    max: 40,
                    message: "Size must be between 4 and 40."
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="smile" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Name"
                />
              )}
            </Form.Item>
            <Form.Item label="Email" hasFeedback>
              {getFieldDecorator("email", {
                rules: [
                  {
                    whitespace: true,
                    required: true,
                    message: "Please enter your email."
                  },
                  {
                    type: "email",
                    message: "Please use a valid email."
                  },
                  {
                    max: 40,
                    message: "Size must be below 40."
                  },
                  {
                    validator: this.validateUniqueEmail
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon
                      type="calendar"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item label="Username" hasFeedback>
              {getFieldDecorator("username", {
                rules: [
                  {
                    whitespace: true,
                    required: true,
                    message: "Please enter your username."
                  },
                  {
                    min: 3,
                    max: 15,
                    message: "Size must be between 3 and 15."
                  },
                  {
                    validator: this.validateUniqueUser
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    whitespace: true,
                    required: true,
                    message: "Please enter your password."
                  },
                  {
                    min: 6,
                    max: 20,
                    message: "Size must be between 6 and 20."
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password."
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Password"
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Register
              </Button>
              Or <a href="/user/login">login now!</a>
            </Form.Item>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

const RegisterUser = Form.create({ name: "normal_login" })(C);

export default RegisterUser;
