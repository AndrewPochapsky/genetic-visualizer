import React from "react";
import Header from "./Header";
import GeneticNode from "../logic/GeneticNode";

type VisualizerProps = {
  endColor: [number, number, number];
  populationSize: number;
};

type VisualizerState = {
  grid: Array<GeneticNode>;
};

export default class GeneticVisualizer extends React.Component<
  VisualizerProps,
  VisualizerState
> {
  render() {
    return (
      <div>
        <Header />
        <div className="grid"></div>
      </div>
    );
  }
}
