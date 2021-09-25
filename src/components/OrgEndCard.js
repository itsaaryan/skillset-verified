import React, { Component } from "react";
import "./OrgEndCard.css";
import OrgEnd from "../abis/OrganizationEndorser.json";
import { Card } from "semantic-ui-react";

export default class OrgEndCard extends Component {
  state = {
    orgEndInfo: {},
    allEmployeesInOrg: [],
  };

  componentDidMount = async () => {
    const web3 = window.web3;
    const OrgEndContract = await new web3.eth.Contract(
      OrgEnd.abi,
      this.props.OrgEndContractAddress
    );

    const orgEndData = await OrgEndContract.methods
      .getOrganizationInfo()
      .call();
    const orgEndInfo = {
      ethAddress: orgEndData[1],
      name: orgEndData[0],
      location: orgEndData[2],
      description: orgEndData[3],
    };

    const employeeCount = await OrgEndContract.methods.totalEmployees().call();

    const allEmployeesInOrg = await Promise.all(
      Array(parseInt(employeeCount))
        .fill()
        .map((ele, index) =>
          OrgEndContract.methods.getEmployeeByIndex(index).call()
        )
    );
    console.log(allEmployeesInOrg);
    this.setState({ orgEndInfo, allEmployeesInOrg });
  };

  render() {
    return (
      <Card className="organization-card">
        <Card.Content>
          <Card.Header>
            <span>{this.state.orgEndInfo?.name}</span>
            <small>{this.state.orgEndInfo?.ethAddress}</small>
          </Card.Header>
          <br></br>
          <div>
            <p>
              <em>Location : </em>
              {this.state.orgEndInfo?.location}
            </p>
          </div>
          <br />
          <div>
            <em>Description :</em>
            <p>{this.state.orgEndInfo?.description}</p>
          </div>
          <br />
          <div>
            <p>
              <em>Employee Count: </em>
              {this.state.allEmployeesInOrg?.length}
            </p>
          </div>
        </Card.Content>
      </Card>
    );
  }
}
