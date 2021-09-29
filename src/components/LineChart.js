import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class LineChart extends Component {
  state = {
    data: {},
    options: {},
    newdata: {},
  };

  componentDidMount = () => {
    console.log(this.chartRef);
    var data = {
      labels: [...Array(this.props.overallEndorsement?.length).keys()],
      datasets: [
        {
          label: "Endorse Spread",
          data: this.props.overallEndorsement,
          fill: false,
          backgroundColor: "#45a29e",
          borderColor: "rgba(69,162,158,0.2)",
        },
      ],
    };

    var options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    this.setState({
      data,
      options,
    });
  };
  render() {
    return <Line data={this.state.data} options={this.state.options} />;
  }
}
