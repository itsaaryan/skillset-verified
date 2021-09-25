import React, { Component } from "react";
import { toast } from "react-toastify";
import EmployeeCard from "../../components/EmployeeCard";
import "./Admin.css";
import Admin from "../../abis/Admin.json";

export default class AllEmployees extends Component {
  state = {
    employees: [],
  };

  componentDidMount = async () => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const AdminData = await Admin.networks[networkId];
    if (AdminData) {
      const admin = await new web3.eth.Contract(Admin.abi, AdminData.address);
      const employeeCount = await admin?.methods.employeeCount().call();
      console.log(employeeCount);
      const employees = await Promise.all(
        Array(parseInt(employeeCount))
          .fill()
          .map((ele, index) =>
            admin.methods.getEmployeeContractByIndex(index).call()
          )
      );
      this.setState({ employees });
    } else {
      toast.error("The Admin Contract does not exist on this network!");
    }
  };

  render() {
    return (
      <div className="admin">
        <h2 className="card-heading">All Registered Employees</h2>
        {this.state.employees?.map((employee, index) => (
          <EmployeeCard key={index} employeeContractAddress={employee} />
        ))}
      </div>
    );
  }
}
