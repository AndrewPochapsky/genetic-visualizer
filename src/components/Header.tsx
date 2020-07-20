import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

type HeaderProps = {
  generationNumber: number;
  mutationChance: number;
  nextGeneration: Function;
  sortByFitness: Function;
  switchToSettings: Function;
};

export default class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Genetic Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Navbar.Text className="mr-sm-2">
              Generation Number: {this.props.generationNumber}
            </Navbar.Text>
            <Navbar.Text className="mr-sm-2">
              Mutation Chance: {this.props.mutationChance * 100}%
            </Navbar.Text>
          </Nav>
          <Form inline>
            <Button
              className="mr-sm-2"
              onClick={(_) => this.props.sortByFitness()}
            >
              Sort by fitness
            </Button>
            <Button
              className="mr-sm-2"
              onClick={(_) => this.props.nextGeneration()}
            >
              Next Generation
            </Button>
            <Button
              className="mr-sm-2"
              onClick={(_) => this.props.nextGeneration(10)}
            >
              Next Generation (x10)
            </Button>
            <Button
              className="mr-sm-2"
              variant="dark"
              onClick={(_) => this.props.switchToSettings()}
            >
              Reset
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
