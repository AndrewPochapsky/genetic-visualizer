import React from "react";
import Header from "./Header";
import Node from "../logic/Node";

type VisualizerState = {
  grid: Array<Node>;
  startColor: [number, number, number];
};

export default class GeneticVisualizer extends React.Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}
