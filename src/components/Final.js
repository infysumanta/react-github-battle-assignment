import React, { Component } from "react";
import PlayerCard from "./PlayerCard";

class Final extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOne: null,
      playerTwo: null,
      winner: 0,
    };
  }

  getFirstPlayer = (player) => {
    fetch(`https://api.github.com/users/${player}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          playerOne: data,
        });
      });
  };
  getSecondPlayer = (player) => {
    fetch(`https://api.github.com/users/${player}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          playerTwo: data,
        });
      });
  };

  getDetails = async () => {
    const search = this.props.location.search;
    const playerOne = new URLSearchParams(search).get("playerOne");
    const playerTwo = new URLSearchParams(search).get("playerTwo");
    await this.getFirstPlayer(playerOne);
    await this.getSecondPlayer(playerTwo);
  };

  render() {
    let winner = 0;
    if (!this.state.playerOne) {
      if (!this.state.playerTwo) {
        this.getDetails();
      }
    }

    if (this.state.playerOne && this.state.playerTwo) {
      winner =
        this.state.playerOne.followers * 20 +
          this.state.playerOne.followers.public_repos <
        this.state.playerTwo.followers * 20 +
          this.state.playerTwo.followers.public_repos
          ? 2
          : 1;
      return (
        <div className="final-flex">
          <PlayerCard
            winner={winner === 1 ? true : false}
            player={this.state.playerOne}
          />
          <PlayerCard
            winner={winner === 2 ? true : false}
            player={this.state.playerTwo}
          />
        </div>
      );
    } else {
      return <div className="final-flex">Loading....</div>;
    }
  }
}

export default Final;
