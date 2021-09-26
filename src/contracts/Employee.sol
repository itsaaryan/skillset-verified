pragma solidity >=0.5.0 <0.9.0;
import "./Admin.sol";

contract Employee {
  address admin;
  address employee_address;
  string description;
  string location;
  uint256[] public overallEndorsement;
  uint256 public endorsecount;
  string name;

  constructor(
    address _admin,
    address _employee_address,
    string memory _name,
    string memory _description,
    string memory _location
  ) public {
    admin = _admin;
    name = _name;
    employee_address = _employee_address;
    description = _description;
    location = _location;
    endorsecount = 0;
  }

  modifier OnlyEmployee() {
    require(msg.sender == employee_address);
    _;
  }

  function getEmployeeInfo()
    public
    view
    returns (
      address,
      string memory,
      string memory,
      string memory,
      uint256,
      uint256
    )
  {
    return (employee_address, name, description, location, 0, endorsecount);
  }

  /*********************************************************SKILLS SECTION**********************************************************/

  struct skillInfo {
    string name;
    uint256 overall_percentage;
    string experience;
    bool endorsed;
    address endorser_address;
    string review;
  }

  mapping(string => skillInfo) skillmap;
  string[] skills;

  event skillVerified(address indexed employee, address indexed endorser);

  event skillAdded(address indexed employee, string skillname);

  function addSkill(string memory _name, string memory _experience)
    public
    OnlyEmployee
  {
    skillInfo memory employeeSkillSet;
    employeeSkillSet.name = _name;
    employeeSkillSet.experience = _experience;
    employeeSkillSet.overall_percentage = 0;
    employeeSkillSet.endorsed = false;
    skillmap[_name] = employeeSkillSet;
    skills.push(_name);
    emit skillAdded(msg.sender, _name);
  }

  function endorseSkill(string memory _name, uint256 _overall_percentage)
    public
  {
    require(Admin(admin).isOrganizationEndorser(msg.sender));
    skillmap[_name].overall_percentage = _overall_percentage;
    overallEndorsement.push(_overall_percentage);
    endorsecount = endorsecount + 1;
    skillmap[_name].endorsed = true;
    emit skillVerified(employee_address, msg.sender);
  }

  function getSkillByName(string memory _name)
    private
    view
    returns (
      string memory,
      uint256,
      string memory,
      bool,
      address,
      string memory
    )
  {
    return (
      skillmap[_name].name,
      skillmap[_name].overall_percentage,
      skillmap[_name].experience,
      skillmap[_name].endorsed,
      skillmap[_name].endorser_address,
      skillmap[_name].review
    );
  }

  function getSkillCount() public view returns (uint256) {
    return skills.length;
  }

  function getSkillByIndex(uint256 _index)
    public
    view
    returns (
      string memory,
      uint256,
      string memory,
      bool,
      address,
      string memory
    )
  {
    return getSkillByName(skills[_index]);
  }

  /*********************************************************CERTIFICATION SECTION**********************************************************/

  event certificationAdded(
    address indexed employee,
    address indexed organization
  );

  event certificationVerified(
    address indexed employee,
    address indexed organization
  );

  struct certificationInfo {
    string name;
    address organization;
    uint256 score;
    bool endorsed;
  }

  mapping(string => certificationInfo) certificationmap;
  string[] certifications;

  function addCertification(
    string memory _name,
    address _organization,
    uint256 _score
  ) public OnlyEmployee {
    certificationInfo memory newcertificationInfo;
    newcertificationInfo.name = _name;
    newcertificationInfo.organization = _organization;
    newcertificationInfo.score = _score;
    newcertificationInfo.endorsed = false;
    certificationmap[_name] = newcertificationInfo;
    certifications.push(_name);
    emit certificationAdded(msg.sender, _organization);
  }

  function endorseCertification(string memory _name) public {
    require(Admin(admin).isOrganizationEndorser(msg.sender));
    require(msg.sender == certificationmap[_name].organization);
    certificationmap[_name].endorsed = true;
    emit certificationVerified(employee_address, msg.sender);
  }

  function getCertificationByName(string memory _name)
    private
    view
    returns (
      string memory,
      address,
      uint256,
      bool
    )
  {
    return (
      certificationmap[_name].name,
      certificationmap[_name].organization,
      certificationmap[_name].score,
      skillmap[_name].endorsed
    );
  }

  function getCertificationCount() public view returns (uint256) {
    return certifications.length;
  }

  function getCertificationByIndex(uint256 _index)
    public
    view
    returns (
      string memory,
      address,
      uint256,
      bool
    )
  {
    return getCertificationByName(certifications[_index]);
  }

  /********************************************************************Work Experience Section********************************************************************/

  event workexpAdded(address indexed employee, address indexed organization);

  event workexpEndorsed(address indexed employee, address indexed organization);

  struct workexpInfo {
    string role;
    address organization;
    string startdate;
    string enddate;
    bool endorsed;
    string description;
  }

  mapping(address => workexpInfo) workexpmap;
  address[] workexps;

  function addWorkExp(
    string memory _role,
    address _organization,
    string memory _startdate,
    string memory _enddate,
    string memory _description
  ) public OnlyEmployee {
    workexpInfo memory newworkexp;
    newworkexp.role = _role;
    newworkexp.organization = _organization;
    newworkexp.startdate = _startdate;
    newworkexp.enddate = _enddate;
    newworkexp.endorsed = false;
    newworkexp.description = _description;
    workexpmap[_organization] = newworkexp;
    workexps.push(_organization);
    emit workexpAdded(msg.sender, _organization);
  }

  function endorseWorkExp() public {
    require(Admin(admin).isOrganizationEndorser(msg.sender));
    require(workexpmap[msg.sender].organization != address(0x0));
    workexpmap[msg.sender].endorsed = true;
    emit workexpEndorsed(employee_address, msg.sender);
  }

  function getWorkExpByAddress(address _organization)
    private
    view
    returns (
      string memory,
      address,
      string memory,
      string memory,
      bool,
      string memory
    )
  {
    return (
      workexpmap[_organization].role,
      workexpmap[_organization].organization,
      workexpmap[_organization].startdate,
      workexpmap[_organization].enddate,
      workexpmap[_organization].endorsed,
      workexpmap[_organization].description
    );
  }

  function getWorkExpCount() public view returns (uint256) {
    return workexps.length;
  }

  function getWorkExpByIndex(uint256 _index)
    public
    view
    returns (
      string memory,
      address,
      string memory,
      string memory,
      bool,
      string memory
    )
  {
    return getWorkExpByAddress(workexps[_index]);
  }

  /********************************************************************Education Section********************************************************************/

  event EducationAdded(address indexed employee, address indexed institute);

  event educationEndorsed(address indexed employee, address indexed institute);

  struct educationInfo {
    address institute;
    string startdate;
    string enddate;
    bool endorsed;
    string description;
  }

  mapping(address => educationInfo) educationmap;
  address[] educations;

  function addEducation(
    address _institute,
    string memory _startdate,
    string memory _enddate,
    string memory _description
  ) public OnlyEmployee {
    educationInfo memory newEducation;
    newEducation.institute = _institute;
    newEducation.startdate = _startdate;
    newEducation.enddate = _enddate;
    newEducation.endorsed = false;
    newEducation.description = _description;
    educationmap[_institute] = newEducation;
    educations.push(_institute);
    emit EducationAdded(msg.sender, _institute);
  }

  function endorseEducation() public {
    require(Admin(admin).isOrganizationEndorser(msg.sender));
    require(educationmap[msg.sender].institute != address(0x0));
    educationmap[msg.sender].endorsed = true;
    emit educationEndorsed(employee_address, msg.sender);
  }

  function getEducationByAddress(address _institute)
    private
    view
    returns (
      address,
      string memory,
      string memory,
      bool,
      string memory
    )
  {
    return (
      educationmap[_institute].institute,
      educationmap[_institute].startdate,
      educationmap[_institute].enddate,
      educationmap[_institute].endorsed,
      educationmap[_institute].description
    );
  }

  function getEducationCount() public view returns (uint256) {
    return educations.length;
  }

  function getEducationByIndex(uint256 _index)
    public
    view
    returns (
      address,
      string memory,
      string memory,
      bool,
      string memory
    )
  {
    return getEducationByAddress(educations[_index]);
  }
}
