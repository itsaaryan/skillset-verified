import React, { Component } from "react";
import { Button, Header, Modal, Table } from "semantic-ui-react";
import "./Modals.css";
import Admin from "../abis/Admin.json";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

class GetInfoModal extends Component {
  state = {
    loading: false,
  };

  createUser = async (e) => {
    e.preventDefault();
    const { ethAddress, name, location, role, description } = this.props.info;
    if (!name || !location || !description || !role || !ethAddress) {
      toast.error("Please fill all the fields!!");
      return;
    }
    this.setState({ loading: true, errorMessage: "" });
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const AdminData = await Admin.networks[networkId];
    if (AdminData) {
      const admin = await new web3.eth.Contract(Admin.abi, AdminData.address);

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
        this.props.history.push(
          `${role === "1" ? "/" : "/all-organization-endorser"}`
        );
      } catch (err) {
        console.log(err);
      }
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <>
        <Modal open={this.props.isOpen} size="tiny" className="modal-des">
          <Header
            className="modal-heading"
            icon="pencil"
            content="Info Provided to Admins"
            as="h2"
          />
          <Modal.Content className="modal-content">
            <Table className="design-info-table">
              <Table.Row>
                <Table.HeaderCell>Fields</Table.HeaderCell>
                <Table.HeaderCell>Values Provided</Table.HeaderCell>
              </Table.Row>
              <hr style={{ border: "none", borderTop: "1px solid white" }} />
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <p style={{ fontWeight: "700" }}>Name</p>
                  </Table.Cell>
                  <Table.Cell>
                    <p>{this.props.info?.name}</p>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p style={{ fontWeight: "700" }}>Eth Address</p>
                  </Table.Cell>
                  <Table.Cell>
                    <p>{this.props.info?.ethAddress}</p>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p style={{ fontWeight: "700" }}>Location</p>
                  </Table.Cell>
                  <Table.Cell>
                    <p>{this.props.info?.location}</p>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p style={{ fontWeight: "700" }}>Description</p>
                  </Table.Cell>
                  <Table.Cell>
                    <p>{this.props.info?.description}</p>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p style={{ fontWeight: "700" }}>Role Requested</p>
                  </Table.Cell>
                  <Table.Cell>
                    <p>
                      {this.props.info?.role === "1"
                        ? "Employee"
                        : "Organization Endorser"}
                    </p>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Modal.Content>
          <Modal.Actions className="modal-actions">
            <Button
              className="close-button"
              type="button"
              color="red"
              icon="times"
              content="Close"
              onClick={() => this.props.closeInfoModal()}
            />
            {this.props.admin && (
              <Button
                className="button-css"
                type="submit"
                color="green"
                icon="save"
                content="Register User"
                loading={this.state.loading}
                onClick={this.createUser}
              />
            )}
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default withRouter(GetInfoModal);
