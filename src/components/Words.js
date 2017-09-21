import React, { Component } from 'react';

export default class Words extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
    };
  }

  render() {
    return (
      <div id="words">
        {
          this.state.words.map((word, i) => (
            <div className="word" key={i}>
              {word.value} - {word.point}
            </div>
          ))
        }
        {
          this.state.words.length === 0 &&
          <h2>
            No Words Found!
          </h2>
        }
      </div>
    );
  }
}
