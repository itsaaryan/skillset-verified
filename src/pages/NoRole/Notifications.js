import React, { Component } from "react";
import { Table, Header, Image, Grid } from "semantic-ui-react";
import ChatBody from "../../components/ChatBody";
import Nochats from "../../components/NoChats";
import "./Notifications.css";

export default class Notifications extends Component {
  colour = ["b6e498", "61dafb", "764abc", "83cd29", "00d1b2"];
  state = {
    curr: {},
    conversations: [
      {
        name: "Aaryan Mahendra",
        ethAddress: "0x4Dc1e5cA7e7F19f5BB20Cc7f62C6d7b4Cd7C0aEa",
      },
    ],
  };

  genImg = (name) => {
    return `https://ui-avatars.com/api/?background=${
      this.colour[Math.floor(Math.random() * 5)]
    }&color=fff&name=${name}`;
  };

  setCurr = (data) => {
    const curr = {
      ...data,
      avatar: this.genImg(data.name),
    };
    this.setState({ curr });
  };

  render() {
    return (
      <div className="notifications">
        <Grid style={{ height: "100%", width: "100%" }}>
          <Grid.Row>
            <Grid.Column width={6} style={{ borderRight: "1px solid #c5c6c7" }}>
              <div className="sidechat-container">
                <Table basic="very" celled collapsing>
                  <Table.Header>
                    <Table.Row className="header-row">
                      <Table.HeaderCell className="notification-sidechat">
                        Coversations
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <div
                    style={{
                      maxHeight: "70vh",
                      overflow: "auto",
                      overflowX: "clip",
                      paddingRight: "7px",
                    }}
                  >
                    <Table.Body className="sidechat-body">
                      {this.state?.conversations?.map((data) => {
                        return (
                          <Table.Row
                            className="row-cell-container"
                            onClick={() => this.setCurr(data)}
                          >
                            <Table.Cell className="header-row-cell">
                              <Header
                                as="h4"
                                image
                                className="notification-sidechat"
                              >
                                <Image
                                  src={this.genImg(data.name)}
                                  rounded
                                  size="mini"
                                />
                                <Header.Content>
                                  {data.name}
                                  <Header.Subheader className="notification-sidechat-subheading">
                                    <small style={{ wordBreak: "break-word" }}>
                                      <em>{data.ethAddress}</em>
                                    </small>
                                  </Header.Subheader>
                                </Header.Content>
                              </Header>
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </div>
                </Table>
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              {this.state.curr.ethAddress ? (
                <ChatBody
                  name={this.state.curr.name}
                  ethAddress={this.state.curr.ethAddress}
                  avatar={this.state.curr.avatar}
                />
              ) : (
                <Nochats />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
