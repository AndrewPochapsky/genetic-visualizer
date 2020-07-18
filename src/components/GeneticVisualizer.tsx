import React from "react";
import Header from "./Header";
import GeneticNode from "../logic/GeneticNode";
import { SettingsState, PopulationSize, MutationType } from "./Settings";
import Node from "./node/Node";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type VisualizerProps = {
  settings: SettingsState;
  switchToSettings: Function;
};

type VisualizerState = {
  grid: GeneticNode[][];
  generationNumber: number;
  mutationChance: number;
};

export default class GeneticVisualizer extends React.Component<
  VisualizerProps,
  VisualizerState
> {
  state: VisualizerState = {
    grid: [],
    generationNumber: 1,
    mutationChance: this.props.settings.mutationChance,
  };

  componentDidMount() {
    this.setState({
      grid: this.getInitialGrid(),
    });
  }

  /**
   * Entry point for gettting the next generation of nodes.
   *
   * @param times  The number of generations to acquire before updating grid
   */
  public nextGeneration = (times = 1) => {
    let grid = this.state.grid;
    let flattenedNodes = this.getFlattenedNodes(grid);
    let generationNumber = this.state.generationNumber;
    for (let i = 0; i < times; i++) {
      let matingPool = GeneticNode.getMatingPool(
        flattenedNodes,
        this.props.settings.endColor,
        this.props.settings.matingPoolPercent
      );
      // Keeps the population size constant.
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

  /**
   * Sorts the nodes in the grid by their fitness.
   */
  public sortByFitness = () => {
    let endColor = this.props.settings.endColor;
    let flattenedNodes = this.getFlattenedNodes(this.state.grid);
    GeneticNode.sortByFitness(flattenedNodes, endColor);
    this.setState({
      grid: this.unFlattenNodes(flattenedNodes),
    });
  };

  /**
   * Gets the next population of nodes by creating offspring from the given
   * mating pool.
   *
   * @param matingPool  The genetic nodes to get parents from
   * @param numCrossovers  The number of cross overs to perform
   * @param generationNumber  The generation number
   *
   * @returns The new population
   */
  private getNextPopulation(
    matingPool: GeneticNode[],
    numCrossovers: number,
    generationNumber: number
  ): GeneticNode[] {
    let nextPopulation = Array.from(matingPool);
    for (let i = 0; i < numCrossovers; i++) {
      let parents = this.getParents(matingPool);
      let offspring = GeneticNode.crossover(parents[0], parents[1]);
      let mutationChance = this.mutateOffspring(offspring, generationNumber);
      this.setState({ mutationChance: mutationChance });
      nextPopulation.push(offspring);
    }
    return nextPopulation;
  }

  /**
   * Mutates the given offspring based on mutationType.
   *
   * @param offspring  The new genetic node
   * @param generationNumber  The generation number
   *
   * @returns The updated mutation chance
   */
  private mutateOffspring(
    offspring: GeneticNode,
    generationNumber: number
  ): number {
    switch (this.props.settings.mutationType) {
      case MutationType.Gradual: {
        return offspring.mutateGradual(
          this.props.settings.decreaseMutation ? generationNumber : -1,
          this.props.settings.mutationChance
        );
      }
      case MutationType.Invert: {
        return offspring.mutateInvert(
          this.props.settings.decreaseMutation ? generationNumber : -1,
          this.props.settings.mutationChance
        );
      }
    }
  }

  /**
   * Retrieves two random parents from the given mating pool.
   *
   * @param matingPool  The mating pool to choose parents from
   *
   * @returns The two chosen parents in an array of length 2
   */
  private getParents(matingPool: GeneticNode[]): [GeneticNode, GeneticNode] {
    let index1 = Math.floor(Math.random() * matingPool.length);
    let index2 = Math.floor(Math.random() * matingPool.length);
    while (index2 === index1) {
      index2 = Math.floor(Math.random() * matingPool.length);
    }
    return [matingPool[index1], matingPool[index2]];
  }

  /**
   * Converts the 2d array of genetic nodes into a 1d array of genetic nodes.
   *
   * @param nodes  The nodes to flatten
   *
   * @returns The flattened nodes
   */
  private getFlattenedNodes(nodes: GeneticNode[][]): GeneticNode[] {
    let flattenedNodes: GeneticNode[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes[i].length; j++) {
        flattenedNodes.push(nodes[i][j]);
      }
    }
    return flattenedNodes;
  }

  /**
   * Converts 1d array of genetic nodes into a 2d array of genetic nodes
   * into the size it was initially set to.
   *
   * @param nodes  The nodes to unflatten
   *
   * @returns The nodes in a 2d array
   */
  private unFlattenNodes(nodes: GeneticNode[]): GeneticNode[][] {
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

  /**
   * Gets the initial grid.
   *
   * @returns The created grid of genetic nodes
   */
  private getInitialGrid = (): GeneticNode[][] => {
    let size = this.getGridSize();
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

  /**
   * Gets the grid size based on the chosen populationSize.
   *
   * @returns The grid size
   */
  private getGridSize(): number {
    switch (this.props.settings.populationSize) {
      case PopulationSize.Small: {
        return 10;
      }
      case PopulationSize.Medium: {
        return 20;
      }
      case PopulationSize.Large: {
        return 36;
      }
    }
  }

  render() {
    return (
      <div>
        <Header
          generationNumber={this.state.generationNumber}
          mutationChance={this.state.mutationChance}
          nextGeneration={this.nextGeneration}
          sortByFitness={this.sortByFitness}
          switchToSettings={this.props.switchToSettings}
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
}
