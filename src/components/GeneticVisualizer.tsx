import React from "react";
import Header from "./Header";
import GeneticNode from "../logic/GeneticNode";
import { SettingsState, PopulationSize, MutationType } from "./Settings";
import Node from "./node/Node";
import "./GeneticVisualizer.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type VisualizerProps = {
  settings: SettingsState;
};

type VisualizerState = {
  grid: GeneticNode[][];
  generationNumber: number;
};

export default class GeneticVisualizer extends React.Component<
  VisualizerProps,
  VisualizerState
> {
  state: VisualizerState = {
    grid: [],
    generationNumber: 1,
  };

  componentDidMount() {
    this.setState({
      grid: this.getInitialGrid(),
    });
  }

  nextGeneration = (times = 1) => {
    let grid = this.state.grid;
    let flattenedNodes = this.getFlattenedNodes(grid);
    let generationNumber = this.state.generationNumber;
    for (let i = 0; i < times; i++) {
      let matingPool = GeneticNode.getMatingPool(
        flattenedNodes,
        this.props.settings.endColor
      );
      let numCrossovers = flattenedNodes.length - matingPool.length;
      flattenedNodes = this.getNextPopulation(
        matingPool,
        numCrossovers,
        generationNumber
      );
      generationNumber++;
    }
    grid = this.unFlattenNodes(flattenedNodes);
    this.setState({
      grid: grid,
      generationNumber: this.state.generationNumber + times,
    });
  };

  private getNextPopulation(
    matingPool: GeneticNode[],
    numCrossovers: number,
    generationNumber: number
  ): GeneticNode[] {
    let nextPopulation = Array.from(matingPool);
    for (let i = 0; i < numCrossovers; i++) {
      let parents = this.getParents(matingPool);
      let offspring = GeneticNode.crossover(parents[0], parents[1]);
      switch (this.props.settings.mutationType) {
        case MutationType.Gradual: {
          offspring.mutateGradual(generationNumber);
          break;
        }
        case MutationType.Invert: {
          offspring.mutateInvert(generationNumber);
          break;
        }
      }
      nextPopulation.push(offspring);
    }
    return nextPopulation;
  }

  private getParents(matingPool: GeneticNode[]): [GeneticNode, GeneticNode] {
    let index1 = Math.floor(Math.random() * matingPool.length);
    let index2 = Math.floor(Math.random() * matingPool.length);
    while (index2 === index1) {
      index2 = Math.floor(Math.random() * matingPool.length);
    }
    return [matingPool[index1], matingPool[index2]];
  }

  private getFlattenedNodes(geneticNodes: GeneticNode[][]): GeneticNode[] {
    let flattenedNodes: GeneticNode[] = [];
    for (let i = 0; i < geneticNodes.length; i++) {
      for (let j = 0; j < geneticNodes[i].length; j++) {
        flattenedNodes.push(geneticNodes[i][j]);
      }
    }
    return flattenedNodes;
  }

  sortByFitness = () => {
    let endColor = this.props.settings.endColor;
    let flattenedNodes = this.getFlattenedNodes(this.state.grid);
    GeneticNode.sortByFitness(flattenedNodes, endColor);
    this.setState({
      grid: this.unFlattenNodes(flattenedNodes),
    });
  };

  render() {
    return (
      <div>
        <Header
          generationNumber={this.state.generationNumber}
          nextGeneration={this.nextGeneration}
          sortByFitness={this.sortByFitness}
        />
        <Container fluid="sm">
          {this.state.grid.map((row, rowIdx) => {
            return (
              <Row key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  return (
                    <Col>
                      <Node
                        key={`${rowIdx}-${nodeIdx}`}
                        geneticNode={node}
                        populationSize={this.props.settings.populationSize}
                      ></Node>
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

  unFlattenNodes(nodes: GeneticNode[]): GeneticNode[][] {
    let size = this.state.grid.length;
    let index = 0;
    let grid = [];
    for (let i = 0; i < size; i++) {
      let currentRow = [];
      for (let j = 0; j < size; j++) {
        currentRow.push(nodes[index]);
        index++;
      }
      grid.push(currentRow);
    }
    return grid;
  }

  getInitialGrid = () => {
    let size = 0;
    switch (this.props.settings.populationSize) {
      case PopulationSize.Small: {
        size = 10;
        break;
      }
      case PopulationSize.Medium: {
        size = 20;
        break;
      }
      case PopulationSize.Large: {
        size = 36;
        break;
      }
    }
    const grid = [];
    for (let row = 0; row < size; row++) {
      const currentRow = [];
      for (let col = 0; col < size; col++) {
        currentRow.push(new GeneticNode());
      }
      grid.push(currentRow);
    }
    return grid;
  };
}
