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
    skills: [],
    certifications: [],
    workExps: [],
    educations: [],
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

    var newskills = [];
    skills.forEach((certi) => {
      newskills.push({
        name: certi[0],
        overall_percentage: certi[1],
        experience: certi[2],
        endorsed: certi[3],
        endorser_address: certi[4],
        review: certi[5],
        visible: certi[6],
      });
      return;
    });

    this.setState({ skills: newskills });
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
    var newcertifications = [];
    certifications.forEach((certi) => {
      newcertifications.push({
        name: certi[0],
        organization: certi[1],
        score: certi[2],
        endorsed: certi[3],
      });
      return;
    });
    this.setState({ certifications: newcertifications });
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

    var newworkExps = [];
    workExps.forEach((work) => {
      newworkExps.push({
        role: work[0],
        organization: work[1],
        startdate: work[2],
        enddate: work[3],
        endorsed: work[4],
        description: work[5],
      });
      return;
    });

    this.setState({ workExps: newworkExps });
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
    var neweducation = [];
    educations.forEach((certi) => {
      neweducation.push({
        institute: certi[0],
        startdate: certi[1],
        enddate: certi[2],
        endorsed: certi[3],
        description: certi[4],
      });
      return;
    });
    this.setState({ educations: neweducation });
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
                    <small style={{ wordBreak: "break-word" }}>
                      {this.state.employeedata?.ethAddress}
                    </small>
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
                          <div style={{ paddingRight: "50px" }}>
                            <p>{education.description}</p>
                            <small
                              style={{
                                wordBreak: "break-word",
                                fontSize: "10px",
                              }}
                            >
                              {education.institute}
                            </small>
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
                  <br />
                  <div>
                    {this.state.certifications?.map((certi, index) => (
                      <div key={index} className="certification-container">
                        <div>
                          <p>{certi.name}</p>
                          <small style={{ wordBreak: "break-word" }}>
                            {certi.organization}
                          </small>
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
                          <small style={{ wordBreak: "break-word" }}>
                            {workExp.organization}
                          </small>
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
                  {this.state.skills?.map((skill, index) =>
                    skill.visible ? (
                      <div>
                        <SkillCard skill={skill} key={index} />
                      </div>
                    ) : (
                      <></>
                    )
                  )}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
