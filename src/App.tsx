import React from "react";
import Settings, { GridSize } from "./components/Settings";
import GeneticVisualizer from "./components/GeneticVisualizer";
import "./App.css";

type AppState = {
  isSettings: boolean;
  endColor: [number, number, number];
  gridSize: GridSize;
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    isSettings: true,
    endColor: [0, 0, 0],
    gridSize: GridSize.Medium,
  };

  switchToVisualize = (
    endColor: [number, number, number],
    gridSize: GridSize
  ) => {
    this.setState({
      isSettings: false,
      endColor: endColor,
      gridSize: gridSize,
    });
  };

  render() {
    if (this.state.isSettings) {
      return <Settings switchToVisualize={this.switchToVisualize} />;
    } else {
      return (
        <GeneticVisualizer
          endColor={this.state.endColor}
          gridSize={this.state.gridSize}
        />
      );
    }
  }
}

export default App;
