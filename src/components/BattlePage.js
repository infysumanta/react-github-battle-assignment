import React, { Component } from "react";
import { Link } from "react-router-dom";
class BattlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: "",
      player2: "",
      playerOneImage: "",
      playerTwoImage: "",
      click1: false,
      click2: false,
    };
  }

  handleChangePlayerOne = (event) => {
    this.setState({ player1: event.target.value });
  };

  handleChangePlayerTwo = (event) => {
    this.setState({ player2: event.target.value });
  };

  handleSubmitPlayerOne = () => {
    this.setState((previousState) => ({
      click1: !previousState.click1,
    }));
    fetch(`https://api.github.com/users/${this.state.player1}`)
      .then((res) => res.json())
      .then((data) => this.setState({ playerOneImage: data.avatar_url }));
  };

  handleSubmitPlayerTwo = (event) => {
    this.setState((previousState) => ({
      click2: !previousState.click2,
    }));
    fetch(`https://api.github.com/users/${this.state.player2}`)
      .then((res) => res.json())
      .then((data) => this.setState({ playerTwoImage: data.avatar_url }));
  };

  render() {
    return (
      <div className="battle">
        <h2>Instructions</h2>
        <div className="flex justify-center">
          <div>
            <p>Enter two Github users</p>
            <i className="battle-icons fa fa-users fa-5x users"></i>
          </div>
          <div>
            <p>Battle</p>
            <i
              className="battle-icons fa fa-fighter-jet fa-5x jet"
              aria-hidden="true"
            ></i>
          </div>
          <div>
            <p>See the winner</p>
            <i
              className="battle-icons fa fa-trophy fa-5x trophy"
              aria-hidden="true"
            ></i>
          </div>
        </div>
        <h2>Players</h2>
        <div className="flex">
          <div>
            <p>Player One</p>
            {!this.state.click1 ? (
              <div className="flex justify-start">
                <input
                  placeholder="github username"
                  value={this.state.player1}
                  onChange={this.handleChangePlayerOne}
                />
                <button onClick={this.handleSubmitPlayerOne} className="submit">
                  Submit
                </button>
              </div>
            ) : (
              <div className="list large flex">
                <img
                  src={this.state.playerOneImage}
                  alt=""
                  className="profileImage"
                />
                <h3>{this.state.player1}</h3>
              </div>
            )}
          </div>
          <div>
            <p>Player Two</p>
            {!this.state.click2 ? (
              <div className="flex justify-start">
                <input
                  placeholder="github username"
                  value={this.state.player2}
                  onChange={this.handleChangePlayerTwo}
                />
                <button onClick={this.handleSubmitPlayerTwo} className="submit">
                  Submit
                </button>
              </div>
            ) : (
              <div className="list large flex">
                <img
                  src={this.state.playerTwoImage}
                  className="profileImage"
                  alt=""
                />
                <h3>{this.state.player2}</h3>
              </div>
            )}
          </div>
        </div>
        {this.state.click1 && this.state.click2 ? (
          <Link
            to={`/battle/results?playerOne=${this.state.player1}&playerTwo=${this.state.player2}`}
            exact
          >
            <button className="battle-btn">Battle</button>
          </Link>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default BattlePage;
