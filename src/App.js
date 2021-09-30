import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import Web3 from "web3";
import Admin from "./abis/Admin.json";
import "react-toastify/dist/ReactToastify.css";
import MetaMaskGuide from "./MetaMaskGuide";
import { Container } from "semantic-ui-react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminPageCreate from "./pages/Admin/CreateUser";
import AllEmployees from "./pages/Admin/AllEmployees";
import AllOrganizationEndorser from "./pages/Admin/AllOrganizationEndorser";
import EmployeePage from "./pages/Employee/Employee";
import UpdateProfile from "./pages/Employee/UpdateProfile";
import Organization from "./pages/OrganizationEndorser/Organization";
import EndorseSkill from "./pages/OrganizationEndorser/EndorseSkill";
import Endorse from "./pages/OrganizationEndorser/EndorseSection";
import Navbar from "./components/Navbar";
import GetEmployee from "./pages/GetRoutes/GetEmployee";

export default class App extends Component {
  state = {
    isMetamaskPresent: true,
    account: "",
    isOwner: false,
    isEmployee: false,
    isOrganizationEndorser: false,
    admin: {},
  };

  async componentWillMount() {
    await this.loadWeb3();
    if (this.state.isMetamaskPresent) await this.loadBlockChainData();
  }

  loadWeb3 = async () => {
    this.setState({ isMetaMaskPresent: true });
    if (window.ethereum) {
      window.ethereum.request({
        method: "eth_requestAccounts",
      });
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      this.setState({ isMetaMaskPresent: false });
    }
  };

  loadBlockChainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
      this.setState({ account: accounts[0] });
    }
    const networkId = await web3.eth.net.getId();
    const AdminData = await Admin.networks[networkId];
    if (AdminData) {
      const admin = await new web3.eth.Contract(Admin.abi, AdminData.address);
      const isEmployee = await admin?.methods?.isEmployee(accounts[0]).call();
      const isOrganizationEndorser = await admin?.methods
        ?.isOrganizationEndorser(accounts[0])
        .call();
      const owner = await admin?.methods?.owner().call();
      this.setState({
        admin,
        isEmployee,
        isOrganizationEndorser,
        isOwner: accounts[0] === owner,
      });
    } else {
      toast.error("The Admin Contract does not exist on this network!");
    }
  };

  adminRoutes = () => {
    return (
      <>
        <Route path="/" exact component={AllEmployees} />
        <Route
          path="/all-organization-endorser"
          exact
          component={AllOrganizationEndorser}
        />
        <Route path="/create-user" exact component={AdminPageCreate} />
      </>
    );
  };

  employeeRoutes = () => {
    return (
      <>
        <Route path="/" exact component={EmployeePage} />
        <Route pth="/update-profile" exact component={UpdateProfile} />
      </>
    );
  };

  isOrganizationEndorserRoutes = () => {
    return (
      <>
        <Route path="/" exact component={Organization} />
        <Route path="/endorse-skill" exact component={EndorseSkill} />
        <Route path="/endorse-section" exact component={Endorse} />
      </>
    );
  };

  noRoleRoutes = () => {};

  renderRoutes = () => {
    if (this.state.isOwner) return this.adminRoutes();
    else if (this.state.isEmployee) return this.employeeRoutes();
    else if (this.state.isOrganizationEndorser)
      return this.isOrganizationEndorserRoutes();
    else return this.noRoleRoutes();
  };

  render() {
    return this.state.isMetamaskPresent ? (
      <BrowserRouter>
        <Navbar />
        <Container>
          <ToastContainer />
          <Switch>
            <Route
              path="/getemployee/:employee_address"
              exact
              component={GetEmployee}
            />
            {this.renderRoutes()}
          </Switch>
        </Container>
      </BrowserRouter>
    ) : (
      <MetaMaskGuide />
    );
  }
}
