import { isEmpty } from "lodash";
import React, { Component } from "react";
import { Button, Header, Modal, Table } from "semantic-ui-react";
import "./Modals.css";

export default class GetInfoModal extends Component {
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
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}
