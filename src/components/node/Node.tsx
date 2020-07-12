import React from "react";
import "./Node.css";
import GeneticNode from "../../logic/GeneticNode";

type NodeProps = {
  geneticNode: GeneticNode;
};

export default class Node extends React.Component<NodeProps> {
  render() {
    const color = this.props.geneticNode.colorVector;
    return (
      <div
        className="node"
        style={{
          backgroundColor: `rgb(${color[0]}, ${color[1]},${color[2]})`,
          height: "50px",
          width: "50px",
        }}
      ></div>
    );
  }
}
