import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

type SettingsState = {
  endColor: [number, number, number];
  populationSize: PopulationSize;
};

type SettingsProps = {
  switchToVisualize: Function;
};

export enum PopulationSize {
  Small,
  Medium,
  Large,
}

export default class Settings extends React.Component<
  SettingsProps,
  SettingsState
> {
  state: SettingsState = {
    endColor: [0, 0, 0],
    populationSize: PopulationSize.Medium,
  };

  private handleVisualize = (e: React.FormEvent) => {
    this.props.switchToVisualize(
      this.state.endColor,
      this.state.populationSize
    );
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
              <Form.Group controlId="formGridState">
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
