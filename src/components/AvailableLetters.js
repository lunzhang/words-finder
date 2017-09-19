import React, { Component } from 'react';

export default class AvailableLetters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableLetters: []
    };
    this.addLetter = this.addLetter.bind(this);
    this.removeLetter = this.removeLetter.bind(this);
    this.clearLetters = this.clearLetters.bind(this);
  }

  render() {
    return (
      <div id="available-letters">
        {
          this.state.availableLetters.map((letter, index) => (
            <div className="letter unselectable" key={index}>
              {letter}
              <div onClick={() => this.removeLetter(index)} className="remove-letter">
                X
              </div>
              <div className="point">
                {this.props.letterValues[letter]}
              </div>
            </div>
          ))
        }
        <div style={{ float: 'right' }}>
          <button id="generate-button" onClick={() => this.props.generateWords(this.state.availableLetters)}>
              Generate
          </button>
          <button id="clear-button" onClick={this.clearLetters}>
              Clear
          </button>
        </div>
      </div>
    );
  }

  addLetter(letter) {
    if (this.state.availableLetters.length < 7) {
      this.setState({
        availableLetters: this.state.availableLetters.concat(letter),
      });
    }
  }

  removeLetter(index) {
    this.setState({
      availableLetters: this.state.availableLetters.filter((_, i) => i !== index),
    });
  }

  clearLetters() {
    this.setState({
      availableLetters: [],
    });
  }
}
