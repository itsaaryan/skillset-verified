const Admin = artifacts.require("Admin");
const Employee = artifacts.require("Employee");
const OrganizationEndorser = artifacts.require("OrganizationEndorser");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Admin);

  const admin = await Admin.deployed();

  console.log(admin.address);
  // await deployer.deploy(Supplier, admin.address);
  // await deployer.deploy(Transporter, admin.address);
  // await deployer.deploy(MedCycle, admin.address);
};
