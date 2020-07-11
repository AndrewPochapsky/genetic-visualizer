import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

type SettingsState = {
  endColor: [number, number, number];
  populationSize: number;
};

type SettingsProps = {
  switchToVisualize: Function;
};

export default class Settings extends React.Component<
  SettingsProps,
  SettingsState
> {
  state: SettingsState = {
    endColor: [0, 0, 0],
    populationSize: 0,
  };

  private handleVisualize = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.switchToVisualize(
      this.state.endColor,
      this.state.populationSize
    );
  };

  private handlePopulationSizeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({ populationSize: +e.currentTarget.value });
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
              <Form.Group controlId="formPopulationSize">
                <Form.Label>Population Size</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  placeholder="Enter population size"
                  onChange={this.handlePopulationSizeChange}
                />
              </Form.Group>
              <Form.Group controlId="formEndColor">
                <Form.Label>The color to converge to</Form.Label>
                <Form.Control type="color" onChange={this.handleColorChange} />
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
