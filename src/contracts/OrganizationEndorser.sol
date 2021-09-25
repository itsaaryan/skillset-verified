pragma solidity >=0.5.0 <0.9.0;
import "./Admin.sol";

contract OrganizationEndorser {
  address admin;
  string name;
  address organization_address;
  string description;
  string location;

  constructor(
    address _admin,
    address _organization_address,
    string memory _name,
    string memory _description,
    string memory _location
  ) public {
    admin = _admin;
    name = _name;
    organization_address = _organization_address;
    description = _description;
    location = _location;
  }

  modifier onlyOrganization() {
    require(Admin(admin).isOrganizationEndorser(msg.sender));
    _;
  }

  /**************************************************************Endorse Skills*************************************************************/

  address[] allEmployees;

  function addEmployees(address employee_address) public onlyOrganization {
    allEmployees.push(employee_address);
  }

  function totalEmployees() public view returns (uint256) {
    return allEmployees.length;
  }
}
