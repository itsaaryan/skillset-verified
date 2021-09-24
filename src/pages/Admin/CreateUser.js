import React, { Component } from "react";
import "./Admin.css";

export default class CreateUser extends Component {
  state = {
    name: "",
    location: "",
    ethAddress: "0x0",
    description: "",
    role: 0,
  };

  roleOptions = [
    {
      key: "0",
      text: "No-Role-Selected",
      value: "0",
    },
    {
      key: "1",
      text: "Employee",
      value: "1",
    },
    {
      key: "2",
      text: "OrganizationEndorser",
      value: "2",
    },
  ];

  render() {
    return <div>retrun user</div>;
  }
}
