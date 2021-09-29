import _ from "lodash";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { Search, Grid, Header, Segment } from "semantic-ui-react";
import Skills from "../abis/Skills.json";

const source = [
  {
    title: "Mohr Group",
    description: "Intuitive discrete attitude",
    image: "https://s3.amazonaws.com/uifaces/faces/twitter/stephcoue/128.jpg",
    price: "$19.10",
  },
  {
    title: "Corwin, Turner and Crooks",
    description: "De-engineered actuating support",
    image: "https://s3.amazonaws.com/uifaces/faces/twitter/gu5taf/128.jpg",
    price: "$8.70",
  },
  {
    title: "Block, Hagenes and Gaylord",
    description: "Front-line background concept",
    image: "https://s3.amazonaws.com/uifaces/faces/twitter/rickdt/128.jpg",
    price: "$15.16",
  },
  {
    title: "Ruecker - Hirthe",
    description: "Streamlined zero administration encoding",
    image:
      "https://s3.amazonaws.com/uifaces/faces/twitter/franciscoamk/128.jpg",
    price: "$80.04",
  },
  {
    title: "McKenzie, Doyle and Hand",
    description: "Quality-focused optimizing artificial intelligence",
    image:
      "https://s3.amazonaws.com/uifaces/faces/twitter/BroumiYoussef/128.jpg",
    price: "$40.60",
  },
];

const initialState = { isLoading: false, results: [], value: "" };

export default class SearchBar extends Component {
  state = initialState;

  //   componentDidMount = async () =>{
  //         const web3=window.web3;
  //         const networkId = await web3.eth.net.getId();
  //         const skillData = await Skills.networks[networkId];

  //         if(skillData){
  //             const skills=await new web3.eth.Contract(Skills.abi,skillData.address);
  //             const skillLength= await skills?.methods?.getSkillLength().call();
  //             const allSkills = await Promise.all(
  //                 Array(parseInt(skillLength)).fill()
  //                 .map((ele,index)=> skills.methods?.getSkillsByIndex(index).call())
  //             )

  //         }
  //         else{
  //             toast.error("Skill contract does not exist on this network!!");
  //         }
  //   }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = (result) => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Search
        aligned="center"
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        value={value}
      />
    );
  }
}
