import React, { Component } from "react";
import { Divider, Image, Input, Loader } from "semantic-ui-react";
import "./ChatBody.css";

const senderDesign = {
  position: "relative",
  fontSize: "16px",
  padding: "10px",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  width: "fit-content",
  marginBottom: "23px",
  maxWidth: "60%",
  boxShadow: "0 0 0 1px lightgray",
};

const receiverDesign = {
  position: "relative",
  fontSize: "16px",
  padding: "10px",
  backgroundColor: "rgba(0, 128, 128,.6)",
  borderRadius: "10px",
  width: "fit-content",
  marginBottom: "23px",
  marginLeft: "auto",
  color: "white",
  maxWidth: "60%",
  boxShadow: "0 0 0 1px lightgray",
};

export default class ChatBody extends Component {
  state = {
    chats: [],
    loading: false,
    message: "",
    account: "",
  };

  componentDidMount = async () => {};

  sendMessage = async () => {};

  render() {
    return this.state.loading ? (
      <Loader active />
    ) : (
      <>
        <div style={{ marginTop: "7px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Image
                src={this.props.avatar}
                avatar
                style={{ fontSize: "25px" }}
              />
              <span
                style={{
                  matginLeft: "10px",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                {this.props.name}
              </span>
            </div>
            <small
              style={{
                fontWeight: "600",
                wordBreak: "break-word",
                fontSize: "0.7rem",
                marginTop: "30px",
              }}
            >
              {this.props.ethAddress}
            </small>
          </div>
          <hr></hr>
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              overflow: "auto",
              paddingLeft: "4px",
              paddingRight: "4px",
              paddingTop: "10px",
              height: "61vh",
            }}
          >
            {this.state.chats?.map((chat, index) => {
              return (
                <p
                  key={index}
                  style={
                    this.state.account !== chat.sender
                      ? senderDesign
                      : receiverDesign
                  }
                >
                  {chat.sender !== "none" && (
                    <>
                      <small>
                        <b
                          style={{
                            color: "lightgray",
                            fontSize: "10px",
                            float: "left",
                            marginBottom: "3px",
                          }}
                        >
                          {chat.sender}
                        </b>
                      </small>
                      <br></br>
                    </>
                  )}
                  <span style={{ float: "left" }}>{chat.message}</span>
                  <br></br>
                  <small
                    style={{
                      float: "right",
                      color: "lightgray",
                      fontSize: "10px",
                    }}
                  >
                    {new Date(chat.timeStamp?.toDate()).toUTCString()}
                  </small>
                </p>
              );
            })}
          </div>
        </div>
        <div
          style={{
            height: "50px",

            minWidth: "3rem",
          }}
        >
          <Input
            value={this.state.message}
            action={{
              color: "rgba(31, 30, 30, 0.581)",
              labelPosition: "right",
              icon: "send",
              content: "Send",
              onClick: () => this.sendMessage(),
            }}
            onChange={(e) => this.setState({ message: e.target.value })}
            style={{
              width: "100%",
            }}
            placeholder="Enter text..."
            className="design-chat-input"
          />
        </div>
      </>
    );
  }
}
