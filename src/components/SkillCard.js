import React, { Component } from "react";
import { Card, CardContent } from "semantic-ui-react";
import "./SkillCard.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

export default class SkillCard extends Component {
  state = {
    colour: ["#b6e498", "#61dafb", "#764abc", "#83cd29", "#00d1b2"],
  };
  render() {
    const skill = this.props.skill;
    return (
      <Card className="skill-des">
        <CardContent>
          <div className="skillcard_container">
            <div>
              <Card.Header style={{ fontSize: "18px", fontWeight: "600" }}>
                {skill.name}
                <br />
                <small>{skill.experience}</small>
              </Card.Header>

              <br />
              {skill.endorsed ? (
                <div>
                  <div>
                    <em>Endorsed By:</em>
                    <p>
                      <small>{skill.endorser_address}</small>
                    </p>
                  </div>
                  <br />
                  <div>
                    <em>Review: </em>
                    <p>
                      <small>{skill.review}</small>
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ color: "yellow" }}>Not Yet Endorsed</p>
                </div>
              )}
            </div>
            <div>
              <div style={{ width: "100px" }}>
                <CircularProgressbar
                  value={skill.overall_percentage}
                  text={`Score - ${skill.overall_percentage}%`}
                  strokeWidth="5"
                  styles={buildStyles({
                    strokeLinecap: "round",
                    textSize: "12px",
                    pathTransitionDuration: 1,
                    pathColor: `${
                      this.state.colour[Math.floor(Math.random() * 5)]
                    }`,
                    textColor: "#66fcf1",
                    trailColor: "#393b3fa6",
                    backgroundColor: "#66fcf1",
                  })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}
