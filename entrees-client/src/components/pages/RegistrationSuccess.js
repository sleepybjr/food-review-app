import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

export default function RegistrationSuccess() {
  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <div style={{ margin: "auto" }}>
          <Title>Account Created Successfully!</Title>
          <p>Your account has been successfully created!</p>
        </div>
      </div>
    </React.Fragment>
  );
}
