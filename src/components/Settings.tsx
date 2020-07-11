import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

type SettingsState = {
  endColor: [number, number, number];
  populationSize: number;
};

export default class Settings extends React.Component<{}, SettingsState> {
  state: SettingsState = {
    endColor: [0, 0, 0],
    populationSize: 0,
  };

  private handlePopulationSizeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({ populationSize: +e.currentTarget.value });
  };

  private handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ populationSize: +e.currentTarget.value });
  };

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
              <Button variant="primary" type="submit">
                Visualize
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
