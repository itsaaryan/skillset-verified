pragma solidity >=0.5.0 <0.9.0;
import "./Employee.sol";
import "./OrganizationEndorser.sol";

contract Admin {
  address public owner;

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "sorry!,Ony owner is allowed to visit!");
    _;
  }

  event UserRegister(address indexed EthAddress, string Name);

  mapping(address => address) registeredEmployeesmap;
  mapping(address => address) registeredOrganizationmap;
  address[] registeredEmployees;
  address[] registeredOrganization;

  function registerUser(
    address EthAddress,
    string memory Name,
    string memory Location,
    string memory Description,
    uint256 Role
  ) public onlyOwner {
    if (Role == 1) {
      Employee newEmployee = new Employee(
        owner,
        EthAddress,
        Name,
        Location,
        Description
      );
      registeredEmployeesmap[EthAddress] = address(newEmployee);
      registeredEmployees.push(EthAddress);
    } else {
      OrganizationEndorser newOrganizationEndorser = new OrganizationEndorser(
        owner,
        EthAddress,
        Name,
        Location,
        Description
      );
      registeredOrganizationmap[EthAddress] = address(newOrganizationEndorser);
      registeredOrganization.push(EthAddress);
    }
    emit UserRegister(EthAddress, Name);
  }

  /****************************************************************USER SECTION**************************************************/

  function isEmployee(address _employeeAddress) public view returns (bool) {
    return registeredEmployeesmap[_employeeAddress] != address(0x0);
  }

  function isOrganizationEndorser(address _organizationEndorser)
    public
    view
    returns (bool)
  {
    return registeredOrganizationmap[_organizationEndorser] != address(0x0);
  }
}
