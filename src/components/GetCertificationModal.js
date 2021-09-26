import React, { Component } from "react";
import { toast } from "react-toastify";
import { Button, Form, Header, Modal } from "semantic-ui-react";
import Admin from "../abis/Admin.json";
import Employee from "../abis/Employee.json";
import "./Modals.css";

export default class GetCertificationModal extends Component {
  state = {
    name: "",
    organization: "",
    score: "",
  };

  handleSubmit = async (e) => {
    const { name, organization, score } = this.state;
    if (!name || !organization || !(score >= 1 && score <= 100)) {
      toast.error("Please enter all the fields.");
      return;
    }
    e.preventDefault();
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const AdminData = await Admin.networks[networkId];
    const accounts = await web3.eth.getAccounts();
    if (AdminData) {
      const admin = await new web3.eth.Contract(Admin.abi, AdminData.address);
      const employeeContractAddress = await admin?.methods
        ?.getEmployeeContractByAddress(accounts[0])
        .call();
      const EmployeeContract = await new web3.eth.Contract(
        Employee.abi,
        employeeContractAddress
      );
      try {
        await EmployeeContract.methods
          .addCertification(name, organization, score)
          .send({
            from: accounts[0],
          });
        toast.success("Certification saved successfullyy!!");
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("The Admin Contract does not exist on this network!");
    }
    this.props.closeCertificationModal();
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <Modal
        as={Form}
        onSubmit={(e) => this.handleSubmit(e)}
        open={this.props.isOpen}
        size="tiny"
        className="modal-des"
      >
        <Header
          className="modal-heading"
          icon="pencil"
          content="Enter Certification Details"
          as="h2"
        />
        <Modal.Content className="modal-content">
          <Form className="form-inputs">
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
            <Form.Field className="form-inputs">
              <input
                id="organization"
                placeholder="Organization"
                autoComplete="off"
                autoCorrect="off"
                value={this.state.organization}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field className="form-inputs">
              <input
                id="score"
                placeholder="Score"
                autoComplete="off"
                autoCorrect="off"
                type="number"
                min="1"
                max="100"
                value={this.state.score}
                onChange={this.handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions className="modal-actions">
          <Button
            className="close-button"
            type="button"
            color="red"
            icon="times"
            content="Close"
            onClick={() => this.props.closeCertificationModal()}
          />
          <Button
            className="button-css"
            type="submit"
            color="green"
            icon="save"
            content="Save"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}
