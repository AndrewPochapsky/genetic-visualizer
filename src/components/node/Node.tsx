import React from "react";
import "./Node.css";
import GeneticNode from "../../logic/GeneticNode";
import { PopulationSize } from "../Settings";

type NodeProps = {
  geneticNode: GeneticNode;
  populationSize: PopulationSize;
};

export default class Node extends React.Component<NodeProps> {
  render() {
    const color = this.props.geneticNode.colorVector;
    let height = "50px";
    let width = "50px";
    switch (this.props.populationSize) {
      case PopulationSize.Small: {
        height = "100px";
        width = "100px";
        break;
      }
      case PopulationSize.Medium: {
        height = "50px";
        width = "50px";
        break;
      }
      case PopulationSize.Large: {
        height = "15px";
        width = "15px";
        break;
      }
    }

    return (
      <div
        className="node"
        style={{
          backgroundColor: `rgb(${color[0]}, ${color[1]},${color[2]})`,
          height: height,
          width: width,
        }}
      ></div>
    );
  }
}
