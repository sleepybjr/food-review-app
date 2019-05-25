import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import React, { Component } from "react";
import { signInPost } from "./../../utilities/Api";
import { withRouter } from 'react-router';

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        signInPost(values)
          .then(res => {
            // console.log(res.data);
            if (res.data.accessToken) {
              localStorage.accessToken = res.data.accessToken;
              this.props.setLogin();
              this.props.history.push("/");
            }
          })
          .catch(res =>
            message.error('Incorrect username or password.')
          );
        // console.log("Received values of form: ", values);
      }
    });
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
            <Form.Item>
              {getFieldDecorator("usernameOrEmail", {
                rules: [
                  { required: true, message: "Please enter your username or email." }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username / Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please enter your password." }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <a href="/user/create">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);

export default withRouter(WrappedNormalLoginForm);
