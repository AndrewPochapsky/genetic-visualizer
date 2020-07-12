import React from "react";
import Header from "./Header";
import GeneticNode from "../logic/GeneticNode";
import { GridSize } from "./Settings";
import Node from "./node/Node";
import "./GeneticVisualizer.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type VisualizerProps = {
  endColor: [number, number, number];
  gridSize: GridSize;
};

type VisualizerState = {
  grid: GeneticNode[][];
};

export default class GeneticVisualizer extends React.Component<
  VisualizerProps,
  VisualizerState
> {
  state: VisualizerState = {
    grid: [],
  };

  componentDidMount() {
    this.setState({
      grid: this.getInitialGrid(),
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Container fluid="md">
          {this.state.grid.map((row, _) => {
            return (
              <Row>
                {row.map((node, nodeIdx) => {
                  return (
                    <Col>
                      <Node key={nodeIdx} geneticNode={node}></Node>
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </Container>
      </div>
    );
  }

  getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 30; row++) {
      const currentRow = [];
      for (let col = 0; col < 20; col++) {
        currentRow.push(new GeneticNode());
      }
      grid.push(currentRow);
    }
    return grid;
  };
}
