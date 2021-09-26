import React, { Component } from "react";
import { toast } from "react-toastify";
import { Card, Grid } from "semantic-ui-react";
import Admin from "../../abis/Admin.json";
import Employee from "../../abis/Employee.json";
import LineChart from "../../components/LineChart";
import SkillCard from "../../components/SkillCard";
import "./Employee.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

export default class EmployeePage extends Component {
  state = {
    employeedata: {},
    overallEndorsement: [],
    skills: [
      {
        name: "C++",
        overall_percentage: "97",
        experience: "2 years",
        endorsed: true,
        endorser_address: "0x0",
        review: "Really good at problem solving",
      },
      {
        name: "Java",
        overall_percentage: "67",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Python",
        overall_percentage: "75",
        experience: "2 years",
        endorsed: true,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Javascript",
        overall_percentage: "50",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Node",
        overall_percentage: "71",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "React",
        overall_percentage: "62",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "CPP",
        overall_percentage: "97",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Mongo",
        overall_percentage: "29",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
    ],
    certifications: [
      {
        name: "Udemy Web Dev certificate",
        organization: "0x0",
        score: "96",
        endorsed: true,
      },
      {
        name: "Udemy Web Dev certificate",
        organization: "0x0",
        score: "75",
        endorsed: false,
      },
    ],
    workExps: [
      {
        role: "Web Developer",
        organization: "0x0",
        startdate: "Nov 2020",
        enddate: "Mar 2021",
        endorsed: false,
        description: "Build 200% websites.",
      },
      {
        role: "Web Developer",
        organization: "NYX Wolves",
        startdate: "Nov 2020",
        enddate: "Mar 2021",
        endorsed: false,
        description: "Build 200% websites.",
      },
    ],
    educations: [
      {
        institute: "0x0",
        startdate: "Nov 2020",
        enddate: "Mar 2021",
        endorsed: false,
        description: "NSIT, B.Tech, IT",
      },
      {
        institute: "0x0",
        startdate: "Nov 2020",
        enddate: "Mar 2021",
        endorsed: false,
        description: "NSIT, B.Tech, IT",
      },
    ],
    colour: ["#b6e498", "#61dafb", "#764abc", "#83cd29", "#00d1b2"],
    readmore: false,
  };

  componentDidMount = async () => {
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
      this.getSkills(EmployeeContract);
      this.getCertifications(EmployeeContract);
      this.getWorkExp(EmployeeContract);
      this.getEducation(EmployeeContract);
      const employeedata = await EmployeeContract.methods
        .getEmployeeInfo()
        .call();
      const newEmployedata = {
        ethAddress: employeedata[0],
        name: employeedata[1],
        location: employeedata[2],
        description: employeedata[3],
        overallEndorsement: employeedata[4],
        endorsecount: employeedata[5],
      };
      const endorseCount = await EmployeeContract.methods
        ?.endorsecount()
        .call();
      const overallEndorsement = await Promise.all(
        Array(parseInt(endorseCount))
          .fill()
          .map((ele, index) =>
            EmployeeContract?.methods?.overallEndorsement(index).call()
          )
      );
      console.log(overallEndorsement);
      this.setState({ employeedata: newEmployedata, overallEndorsement });
    } else {
      toast.error("The Admin Contract does not exist on this network!");
    }
  };

  getSkills = async (EmployeeContract) => {
    const skillCount = await EmployeeContract?.methods?.getSkillCount().call();
    const skills = await Promise.all(
      Array(parseInt(skillCount))
        .fill()
        .map((ele, index) =>
          EmployeeContract?.methods?.getSkillByIndex(index).call()
        )
    );
    // this.setState({ skills });
  };

  getCertifications = async (EmployeeContract) => {
    const certiCount = await EmployeeContract?.methods
      ?.getCertificationCount()
      .call();
    const certifications = await Promise.all(
      Array(parseInt(certiCount))
        .fill()
        .map((ele, index) =>
          EmployeeContract?.methods?.getCertificationByIndex(index).call()
        )
    );
    //this.setState({ certifications });
  };

  getWorkExp = async (EmployeeContract) => {
    const workExpCount = await EmployeeContract?.methods
      ?.getWorkExpCount()
      .call();
    const workExps = await Promise.all(
      Array(parseInt(workExpCount))
        .fill()
        .map((ele, index) =>
          EmployeeContract?.methods?.getWorkExpByIndex(index).call()
        )
    );
    // this.setState({ workExps });
  };

  getEducation = async (EmployeeContract) => {
    const educationCount = await EmployeeContract?.methods
      ?.getEducationCount()
      .call();
    const educations = await Promise.all(
      Array(parseInt(educationCount))
        .fill()
        .map((ele, index) =>
          EmployeeContract?.methods?.getEducationByIndex(index).call()
        )
    );
    // this.setState({ educations });
  };

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <Card className="personal-info">
                <Card.Content>
                  <Card.Header>
                    {this.state.employeedata?.name}
                    <small>{this.state.employeedata?.ethAddress}</small>
                  </Card.Header>
                  <br />
                  <div>
                    <p>
                      <em>Location: </em>
                      {this.state.employeedata?.location}
                    </p>
                  </div>
                  <br />
                  <div>
                    <p>
                      <em>Overall Endorsement Rating:</em>
                    </p>
                    <LineChart
                      overallEndorsement={this.state.overallEndorsement}
                    />
                  </div>
                </Card.Content>
              </Card>
              <Card className="employee-des">
                <Card.Content>
                  <Card.Header>About</Card.Header>
                  <div>
                    <p>{this.state.employeedata?.description}</p>
                  </div>
                  <br />
                  <div>
                    <Card.Header
                      style={{ fontSize: "19px", fontWeight: "600" }}
                    >
                      Education
                    </Card.Header>
                    <br />
                    <div className="education">
                      {this.state.educations?.map((education, index) => (
                        <div className="education-design" key={index}>
                          <div>
                            <p>{education.description}</p>
                            <small>{education.institute}</small>
                          </div>
                          <div>
                            <small>
                              <em>
                                {education.startdate} - {education.enddate}
                              </em>
                            </small>
                            <p
                              style={{
                                color: education.endorsed
                                  ? "#00d1b2"
                                  : "yellow",
                                opacity: "0.7",
                              }}
                            >
                              {education.endorsed
                                ? "Endorsed"
                                : "Not Yet Endorsed"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={10}>
              <Card className="employee-des">
                <Card.Content>
                  <Card.Header>Certifications</Card.Header>
                  <div>
                    {this.state.certifications?.map((certi, index) => (
                      <div key={index} className="certification-container">
                        <div>
                          <p>{certi.name}</p>
                          <small>{certi.organization}</small>
                          <p
                            style={{
                              color: certi.endorsed ? "#00d1b2" : "yellow",
                              opacity: "0.7",
                            }}
                          >
                            {certi.endorsed ? "Endorsed" : "Not Yet Endorsed"}
                          </p>
                        </div>
                        <div>
                          <div style={{ width: "100px" }}>
                            <CircularProgressbar
                              value={certi.score}
                              text={`Score - ${certi.score}%`}
                              strokeWidth="5"
                              styles={buildStyles({
                                strokeLinecap: "round",
                                textSize: "12px",
                                pathTransitionDuration: 1,
                                pathColor: `rgba(102,252,241, ${
                                  certi.score / 100
                                })`,
                                textColor: "#66fcf1",
                                trailColor: "#393b3fa6",
                                backgroundColor: "#66fcf1",
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Content>
              </Card>
              <Card className="employee-des">
                <Card.Content>
                  <Card.Header>Work Experiences</Card.Header>
                  <br />
                  <div className="education">
                    {this.state.workExps?.map((workExp, index) => (
                      <div className="education-design" key={index}>
                        <div>
                          <p>{workExp.role}</p>
                          <small>{workExp.organization}</small>
                        </div>
                        <div>
                          <small>
                            <em>
                              {workExp.startdate} - {workExp.enddate}
                            </em>
                          </small>
                          <p
                            style={{
                              color: workExp.endorsed ? "#00d1b2" : "yellow",
                              opacity: "0.7",
                            }}
                          >
                            {workExp.endorsed ? "Endorsed" : "Not Yet Endorsed"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Content>
              </Card>
              <Card className="employee-des">
                <Card.Content>
                  <Card.Header>Skills</Card.Header>
                  <br />
                  {this.state.skills?.map((skill, index) => (
                    <div>
                      <SkillCard skill={skill} key={index} />
                    </div>
                  ))}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
