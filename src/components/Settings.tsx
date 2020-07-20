import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export interface SettingsState {
  endColor: [number, number, number];
  populationSize: PopulationSize;
  mutationType: MutationType;
  mutationChance: number;
  decreaseMutation: boolean;
  matingPoolPercent: number;
}

type SettingsProps = {
  switchToVisualize: Function;
};

export enum PopulationSize {
  Small,
  Medium,
  Large,
}

export enum MutationType {
  Gradual,
  Invert,
}

export function getDefaultSettings(): SettingsState {
  return {
    endColor: [0, 0, 0],
    populationSize: PopulationSize.Medium,
    mutationType: MutationType.Gradual,
    mutationChance: 0.3,
    decreaseMutation: false,
    matingPoolPercent: 0.25,
  };
}

export default class Settings extends React.Component<
  SettingsProps,
  SettingsState
> {
  state: SettingsState = getDefaultSettings();

  private handleVisualize = (_: React.FormEvent) => {
    this.props.switchToVisualize(this.state);
  };

  private handleMutationTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let mutationType = MutationType.Gradual;
    switch (e.currentTarget.value) {
      case "Gradual": {
        mutationType = MutationType.Gradual;
        break;
      }
      case "Invert": {
        mutationType = MutationType.Invert;
        break;
      }
    }
    this.setState({
      mutationType: mutationType,
    });
  };

  private handlePopulationSizeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let populationSize = PopulationSize.Medium;
    switch (e.currentTarget.value) {
      case "Small": {
        populationSize = PopulationSize.Small;
        break;
      }
      case "Medium": {
        populationSize = PopulationSize.Medium;
        break;
      }
      case "Large": {
        populationSize = PopulationSize.Large;
        break;
      }
    }
    this.setState({
      populationSize: populationSize,
    });
  };

  private handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ endColor: this.hexToRgb(e.currentTarget.value) });
  };

  private handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ decreaseMutation: e.currentTarget.checked });
  };

  private handleMutationChanceChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({
      mutationChance: +e.currentTarget.value,
    });
  };

  private handleMatingPoolPercentChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({
      matingPoolPercent: +e.currentTarget.value,
    });
  };

  private hexToRgb(hex: string): [number, number, number] {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [
      parseInt(result![1], 16),
      parseInt(result![2], 16),
      parseInt(result![3], 16),
    ];
  }

  render() {
    return (
      <div className="container">
        <Card>
          <Card.Header as="h5">Genetic Visualizer</Card.Header>
          <Card.Body>
            <p>
              {" "}
              Welcome to Genetic Visualizer! This app aims to be an educational
              resource for genetic algorithms by showing one in action for
              optimizing colors. Genetic algorithms are heavily inspired by
              Darwins's Theory of Evolution and Natural Selection. It works by
              selecting "fittest" individuals of the population to pass their
              genes on and randomly mutates the genes of the offspring. In this
              example we have chosen the color of the node to be its core gene
              and are optimizing based on how close it is to a target color that
              we choose. Genetic algorithms work with the following four steps:
            </p>
            <ol>
              <li>
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  Initial Population:{" "}
                </span>{" "}
                The algorithm functions by acting on a population of entities
                containing genes. In this example the population is made up of
                white nodes in a grid where each node has a color vector
                representing a gene.
              </li>
              <li>
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  Choosing mating pool:{" "}
                </span>{" "}
                First the group of entities that will be used for the next
                generation is chosen based on fitness. What fitness is depends
                on the application. In this case, the fitness of each node is
                determined to how similar its color is to the target color we
                are optimizing for.
              </li>
              <li>
                <span style={{ fontWeight: "bold" }}> Crossover: </span> Once
                the mating pool has been chosen, the crossover step is
                performed. Crossover is when new offspring are created by mixing
                the genes of two parents in the mating pool. The number of
                crossovers is typically constant to ensure that the overall size
                of the population remains the same for each generation.
              </li>
              <li>
                <span style={{ fontWeight: "bold" }}> Mutation: </span> When an
                offspring is created there is a random chance to modify its
                genes in some way. This is how the population "evolves". The
                favourability of a mutation is determined by the fitness.
              </li>
            </ol>
            <Form>
              <Form.Group controlId="formEndColor">
                <Form.Label style={{ fontWeight: "bold" }}>
                  The color to converge to:
                </Form.Label>
                <p style={{ color: "grey" }}>
                  This is the color we base a node's fitness off of. The mating
                  pool will be made up of the nodes which are closest to this
                  color.
                </p>
                <Form.Control type="color" onChange={this.handleColorChange} />
              </Form.Group>
              <Form.Group controlId="formPopulationSize">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Population Size:
                </Form.Label>
                <p style={{ color: "grey" }}>
                  This determines how many nodes are in the population.
                </p>
                <Form.Control
                  as="select"
                  defaultValue="Medium"
                  onChange={this.handlePopulationSizeChange}
                >
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formMutationType">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Mutation Type:
                </Form.Label>
                <p style={{ color: "grey" }}>
                  Gradual: Adds a value between -50 and 50 to a color channel.
                </p>
                <p style={{ color: "grey" }}>
                  Invert: Inverts a given color channel (ie. 255 - channel).
                </p>
                <Form.Control
                  as="select"
                  defaultValue="Gradual"
                  onChange={this.handleMutationTypeChange}
                >
                  <option>Gradual</option>
                  <option>Invert</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formCheck">
                <Form.Check
                  type="checkbox"
                  label="Decrease mutation chance over generations"
                  onChange={this.handleCheckBoxChange}
                  checked={this.state.decreaseMutation}
                />
              </Form.Group>
              <Form.Group controlId="formMutationRange">
                <Form.Label>
                  <span style={{ fontWeight: "bold" }}>Mutation Chance:</span>{" "}
                  {Math.floor(this.state.mutationChance * 100)}%
                </Form.Label>
                <p style={{ color: "grey" }}>
                  The chance for the color channel of an offpspring to mutate.
                </p>
                <Form.Control
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={this.state.mutationChance}
                  onChange={this.handleMutationChanceChange}
                />
              </Form.Group>
              <Form.Group controlId="formMatingPoolRange">
                <Form.Label>
                  <span style={{ fontWeight: "bold" }}>
                    Percentage of population in mating pool:
                  </span>{" "}
                  {Math.floor(this.state.matingPoolPercent * 100)}%
                </Form.Label>
                <p style={{ color: "grey" }}>
                  How many nodes are used to generate the next population. For
                  example, if the percentage is 50%, then the 50% most fit nodes
                  will be selected to populate the next generation.{" "}
                </p>
                <Form.Control
                  type="range"
                  min="0.02"
                  max="1"
                  step="0.01"
                  value={this.state.matingPoolPercent}
                  onChange={this.handleMatingPoolPercentChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={this.handleVisualize}>
                Visualize
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
