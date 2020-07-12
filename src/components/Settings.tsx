import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export interface SettingsState {
  endColor: [number, number, number];
  populationSize: PopulationSize;
  mutationType: MutationType;
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
            <Form>
              <Form.Group controlId="formEndColor">
                <Form.Label>The color to converge to</Form.Label>
                <Form.Control type="color" onChange={this.handleColorChange} />
              </Form.Group>
              <Form.Group controlId="formPopulationSize">
                <Form.Label>Population Size</Form.Label>
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
                <Form.Label>Mutation Type</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Gradual"
                  onChange={this.handleMutationTypeChange}
                >
                  <option>Gradual</option>
                  <option>Invert</option>
                </Form.Control>
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
