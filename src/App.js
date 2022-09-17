import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route } from "react-router-dom";
import PopularPage from "./components/PopularPage";
import BattlePage from "./components/BattlePage";
import Final from "./components/Final";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    };
  }

  changeMode = () => {
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode,
    }));
  };

  render() {
    return (
      <BrowserRouter>
        <div className={this.state.darkMode ? "bg-dark" : ""}>
          <div className="container">
            <Header
              changeMode={this.changeMode}
              darkMode={this.state.darkMode}
            />

            <Route path="/" exact>
              <PopularPage />
            </Route>
            <Route path="/battle" exact>
              <BattlePage />
            </Route>
            <Route path="/battle/results" component={Final} exact></Route>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
