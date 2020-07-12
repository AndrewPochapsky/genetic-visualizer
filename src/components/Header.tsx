import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

type HeaderProps = {
  generationNumber: number;
  nextGeneration: Function;
  sortByFitness: Function;
};

export default class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Genetic Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Navbar.Text>
              Generation Number: {this.props.generationNumber}
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
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
