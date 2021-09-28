import React, { Component } from "react";
import Organization from "../../abis/OrganizationEndorser.json";
import Admin from "../../abis/Admin.json";
import { toast } from "react-toastify";
import OrgEndCard from "../../components/OrgEndCard";
import EmployeeCard from "../../components/EmployeeCard";

export default class OrganizationEndorser extends Component {
  state = {
    orgcontractAddress: "",
    employees: [],
  };

  componentDidMount = async () => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const AdminData = await Admin.networks[networkId];
    const accounts = await web3.eth.getAccounts();
    if (AdminData) {
      const admin = await new web3.eth.Contract(Admin.abi, AdminData.address);
      const orgContractAddress = await admin?.methods
        ?.getOrganizationContractByAddress(accounts[0])
        .call();
      const orgContract = await new web3.eth.Contract(
        Organization.abi,
        orgContractAddress
      );

      const employeeCount = await orgContract?.methods?.totalEmployees().call();

      const employees = await Promise.all(
        Array(parseInt(employeeCount))
          .fill()
          .map((ele, index) =>
            orgContract?.methods?.getEmployeeByIndex(index).call()
          )
      );
      var newarr = [];
      await employees.forEach(async (ele) => {
        const employeecontact = await admin.methods
          .getEmployeeContractByAddress(ele)
          .call();
        newarr.push(employeecontact);
        return;
      });
      this.setState({ orgContractAddress, employees: newarr });
    } else {
      toast.error("The Admin Contract does not exist on this network!");
    }
  };

  render() {
    return (
      <div>
        {this.state.orgContractAddress && (
          <OrgEndCard OrgEndContractAddress={this.state.orgContractAddress} />
        )}
        {this.state.employees?.length > 0 && (
          <h2 className="card-heading">Employees in the organization</h2>
        )}
        {this.state.employees?.map((employee, index) => (
          <EmployeeCard key={index} employeeContractAddress={employee} />
        ))}
      </div>
    );
  }
}
