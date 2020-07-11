import React from "react";
import Settings from "./components/Settings";
import "./App.css";

type AppState = {
  isSettings: boolean;
  endColor: [number, number, number];
  populationSize: number;
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    isSettings: true,
    endColor: [0, 0, 0],
    populationSize: 0,
  };

  switchToVisualize = (
    endColor: [number, number, number],
    populationSize: number
  ) => {
    this.setState({
      isSettings: false,
      endColor: endColor,
      populationSize: populationSize,
    });
  };

  render() {
    if (this.state.isSettings) {
      return <Settings switchToVisualize={this.switchToVisualize} />;
    } else {
      return <div />;
    }
  }
}

export default App;
