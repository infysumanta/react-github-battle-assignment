import React, { Component } from "react";
class PopularPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      language: "All",
    };
  }
  componentDidMount() {
    fetch(
      `https://api.github.com/search/repositories?q=stars:%3E1+language:${this.state.language}&sort=stars&order=desc&type=Repositories`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ data }));
  }

  changeLanguage = (language) => {
    this.setState((prevState) => ({
      language: language,
    }));
    fetch(
      `https://api.github.com/search/repositories?q=stars:%3E1+language:${this.state.language}&sort=stars&order=desc&type=Repositories`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ data }));
  };

  render() {
    console.log(this.state.data);
    return (
      <div className="popular">
        <div className="popular-menu">
          {["All", "Javascript", "Ruby", "Java", "CSS", "Python"].map(
            (item, i) => {
              return (
                <div
                  key={i}
                  className={
                    this.state.language === item
                      ? "menu-item active"
                      : "menu-item"
                  }
                  onClick={() => this.changeLanguage(item)}
                >
                  {item}
                </div>
              );
            }
          )}
        </div>
        <ul className="grid">
          {this.state.data &&
            this.state.data.items.map((item, i) => {
              return (
                <li className="list" key={item.id}>
                  <div className="info">
                    <h2># {i + 1}</h2>
                    <img src={item.owner.avatar_url} alt="avatar" />
                    <h3 className="active">{item.name}</h3>
                  </div>

                  <div className="flex justify-start">
                    <i
                      className="popular-icon fa fa-user user"
                      aria-hidden="true"
                    ></i>
                    <p>{item.name}</p>
                  </div>
                  <div className="flex justify-start">
                    <i
                      className="popular-icon fa fa-star star"
                      aria-hidden="true"
                    ></i>
                    <p>{item.stargazers_count} stars</p>
                  </div>
                  <div className="flex justify-start">
                    <i
                      className="popular-icon fa fa-code-fork fork"
                      aria-hidden="true"
                    ></i>
                    <p>{item.forks} forks</p>
                  </div>
                  <div className="flex justify-start">
                    <i
                      className="popular-icon fa fa-exclamation-triangle issue"
                      aria-hidden="true"
                    ></i>
                    <p>{item.open_issues_count} open issues</p>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default PopularPage;
