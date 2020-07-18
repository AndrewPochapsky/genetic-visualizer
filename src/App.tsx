import React from "react";
import Settings, {
  getDefaultSettings,
  SettingsState,
} from "./components/Settings";
import GeneticVisualizer from "./components/GeneticVisualizer";
import "./App.css";

type AppState = {
  isSettings: boolean;
  settings: SettingsState;
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    isSettings: true,
    settings: getDefaultSettings(),
  };

  switchToVisualize = (settingsState: SettingsState) => {
    this.setState({
      isSettings: false,
      settings: settingsState,
    });
  };

  switchToSettings = () => {
    this.setState({ isSettings: true });
  };

  render() {
    if (this.state.isSettings) {
      return <Settings switchToVisualize={this.switchToVisualize} />;
    } else {
      return (
        <GeneticVisualizer
          settings={this.state.settings}
          switchToSettings={this.switchToSettings}
        />
      );
    }
  }
}

export default App;
