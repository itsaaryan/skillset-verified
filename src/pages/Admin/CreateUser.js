import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Card, Dropdown, Form, Message } from "semantic-ui-react";
import "./Admin.css";
import Admin from "../../abis/Admin.json";
import { toast } from "react-toastify";

class CreateUser extends Component {
  state = {
    name: "",
    location: "",
    ethAddress: "",
    description: "",
    role: 0,
    loading: false,
    errorMessage: "",
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

  handleDropdownSelect = (e, data) => {
    this.setState({ role: data.value });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const AdminData = await Admin.networks[networkId];
    if (AdminData) {
      const admin = await new web3.eth.Contract(Admin.abi, AdminData.address);
      const { ethAddress, name, location, role, description } = this.state;
      const owner = await admin.methods.owner().call();
      if (owner !== accounts[0]) {
        this.setState({
          errorMessage: "Sorry! You are not the Admin!!",
          loading: false,
        });
        return;
      }
      try {
        await admin.methods
          .registerUser(ethAddress, name, location, description, role)
          .send({ from: accounts[0] });
        toast.success("New user registered succressfully!!!!");
        this.props.history.push("/");
        this.setState({
          name: "",
          location: "",
          ethAddress: "",
          description: "",
          role: 0,
        });
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div className="create-user">
        <Card className="card-style">
          <Card.Content>
            <Card.Header centered>
              <h2 className="card-heading">Register New User</h2>
            </Card.Header>
            <hr className="horizontal-line"></hr>
            <br></br>
            <Form error={!!this.state.errorMessage}>
              <Form.Field className="form-inputs">
                <input
                  id="name"
                  placeholder="Name"
                  autoComplete="off"
                  autoCorrect="off"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <br />
              <Form.Field className="form-inputs">
                <input
                  id="location"
                  placeholder="Location"
                  autoComplete="off"
                  autoCorrect="off"
                  value={this.state.location}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <br />
              <Form.Field className="form-inputs">
                <input
                  id="description"
                  placeholder="Description"
                  autoComplete="off"
                  autoCorrect="off"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <br />
              <Form.Field className="form-inputs">
                <input
                  id="ethAddress"
                  placeholder="0x0"
                  autoComplete="off"
                  autoCorrect="off"
                  value={this.state.ethAddress}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <br />
              <Form.Field className="form-inputs">
                <Dropdown
                  placeholder="Select Role"
                  fluid
                  selection
                  options={this.roleOptions}
                  onChange={this.handleDropdownSelect}
                />
              </Form.Field>
              <br />
              <Message
                error
                header="Oops!!"
                content={this.state.errorMessage}
              />
              <br />
              <div className="button-holder">
                <Button
                  className="button-css"
                  type="submit"
                  onClick={this.handleSubmit}
                  loading={this.state.loading}
                >
                  Register
                </Button>
              </div>
            </Form>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default withRouter(CreateUser);
