import React, { Component } from 'react';

export default class AvailableLetters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableLetters: [],
    };
    this.addLetter = this.addLetter.bind(this);
    this.removeLetter = this.removeLetter.bind(this);
    this.clearLetters = this.clearLetters.bind(this);
  }

  render() {
    return (
      <div id="available-letters">
        <div className="available-letter-wrapper">
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
        </div>
        <div className="available-button-wrapper">
          <button id="generate-button" onClick={() => this.props.generateWords(this.state.availableLetters)}>
              Generate
          </button>
          <button className="clear-button" onClick={this.clearLetters}>
              Clear Letters
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

  // clears all added letters
  clearLetters() {
    this.setState({
      availableLetters: [],
    });
  }
}
