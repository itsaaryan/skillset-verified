import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import Employee from "../abis/Employee.json";
import "./EmployeeCard.css";

export default class EmployeeCard extends Component {
  state = {
    employeedata: {},
    skills: [
      {
        name: "C++",
        overall_percentage: "97%",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Java",
        overall_percentage: "97%",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Python",
        overall_percentage: "97%",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Javascript",
        overall_percentage: "97%",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Node",
        overall_percentage: "97%",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "React",
        overall_percentage: "97%",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "CPP",
        overall_percentage: "97%",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Mongo",
        overall_percentage: "97%",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Mongo",
        overall_percentage: "97%",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Mongo",
        overall_percentage: "97%",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Mongo",
        overall_percentage: "97%",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Mongo",
        overall_percentage: "97%",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Mongo",
        overall_percentage: "97%",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Mongo",
        overall_percentage: "97%",
        experience: "2 years",
        endorsed: false,
        endorser_address: "0x0",
        review: "",
      },
      {
        name: "Mongo",
        overall_percentage: "97%",
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
        score: "96%",
        endorsed: true,
      },
      {
        name: "Udemy Web Dev certificate",
        organization: "0x0",
        score: "96%",
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
    const EmployeeContract = await new web3.eth.Contract(
      Employee.abi,
      this.props.employeeContractAddress
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
    this.setState({ employeedata: newEmployedata });
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
      <Card className="employee-card">
        <Card.Content>
          <Card.Header>
            <span>{this.state.employeedata?.name}</span>
            <small>{this.state.employeedata.ethAddress}</small>
          </Card.Header>
          <br></br>
          <div>
            <p>
              <em>Location : </em>
              {this.state.employeedata?.location}
            </p>
          </div>
          <br />
          <div>
            <em>Description :</em>
            <p>{this.state.employeedata?.description}</p>
          </div>
          <br />
          <div>
            <em>Skills:</em>
            <div className="skill-holder">
              {this.state.skills?.map((skill, index) => (
                <div
                  className="skill-design"
                  style={{
                    border: `1px solid ${this.state.colour[index % 5]}`,
                  }}
                >
                  <p>{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
          <br />
          {this.state.readmore ? (
            <div>
              <div>
                <em>Education:</em>
                <div className="education">
                  {this.state.educations?.map((education, index) => (
                    <div className="education-design">
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
                            color: education.endorsed ? "#00d1b2" : "yellow",
                            opacity: "0.7",
                          }}
                        >
                          {education.endorsed ? "Endorsed" : "Not Yet Endorsed"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <br />
              <div>
                <em>Certifications:</em>
                <div className="certifications">
                  {this.state.certifications?.map((certification, index) => (
                    <div className="certification-design">
                      <div>
                        <p>{certification.name}</p>
                        <small>{certification.organization}</small>
                      </div>
                      <div>
                        <p>
                          <em>Score: {certification.score}</em>
                        </p>
                        <p
                          style={{
                            color: certification.endorsed
                              ? "#00d1b2"
                              : "yellow",
                            opacity: "0.7",
                          }}
                        >
                          {certification.endorsed
                            ? "Endorsed"
                            : "Not Yet Endorsed"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <br />
              <div>
                <em>Work Experience:</em>
                <div className="workexp">
                  {this.state.workExps?.map((work, index) => (
                    <div className="workexp-design">
                      <div>
                        <p>{work.role}</p>
                        <small>{work.organization}</small>
                      </div>
                      <div>
                        <p>
                          <em>
                            <small>
                              {work.startdate} - {work.enddate}
                            </small>
                          </em>
                        </p>
                        <p
                          style={{
                            color: work.endorsed ? "#00d1b2" : "yellow",
                            opacity: "0.7",
                          }}
                        >
                          {work.endorsed ? "Endorsed" : "Not Yet Endorsed"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="readopenclose"
                onClick={() => this.setState({ readmore: false })}
              >
                <p>Hide</p>
              </div>
            </div>
          ) : (
            <div
              className="readopenclose"
              onClick={() => this.setState({ readmore: true })}
            >
              <p>...Read More</p>
            </div>
          )}
        </Card.Content>
      </Card>
    );
  }
}
