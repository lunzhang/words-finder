import React, { Component } from 'react';
import { connect } from 'react-redux';
import words from '../../words.json';

const mapStateToProps = function mapStateToProps(state) {
  return {
    state,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableLetters: [],
      letters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      letter_values: { ' ': 0,
        a: 1,
        b: 4,
        c: 4,
        d: 2,
        e: 1,
        f: 4,
        g: 3,
        h: 3,
        i: 1,
        j: 10,
        k: 5,
        l: 2,
        m: 4,
        n: 2,
        o: 1,
        p: 4,
        q: 10,
        r: 1,
        s: 1,
        t: 1,
        u: 2,
        v: 5,
        w: 4,
        x: 8,
        y: 3,
        z: 10 },
      letter_positions: { ' ': -1,
        a: -1,
        b: -1,
        c: -1,
        d: -1,
        e: -1,
        f: -1,
        g: -1,
        h: -1,
        i: -1,
        j: -1,
        k: -1,
        l: -1,
        m: -1,
        n: -1,
        o: -1,
        p: -1,
        q: -1,
        r: -1,
        s: -1,
        t: -1,
        u: -1,
        v: -1,
        w: -1,
        x: -1,
        y: -1,
        z: -1 },
      words: [],
    };
    this.addLetter = this.addLetter.bind(this);
    this.removeLetter = this.removeLetter.bind(this);
    this.updateLetterPosition = this.updateLetterPosition.bind(this);
    this.generateWords = this.generateWords.bind(this);
    this.clearLetters = this.clearLetters.bind(this);
  }

  render() {
    return (
      <div id="main">
        <div id="available-letters">
          {
            this.state.availableLetters.map((letter, index) => (
              <div className="letter unselectable" key={index}>
                {letter}
                <div onClick={() => this.removeLetter(index)} className="remove-letter">
                        X
                </div>
                <div className="point">
                  {this.state.letter_values[letter]}
                </div>
              </div>
            ))
          }
          <div style={{ float: 'right' }}>
            <button id="generate-button" onClick={this.generateWords}>
                Generate
            </button>
            <button id="clear-button" onClick={this.clearLetters}>
                Clear
            </button>
          </div>
        </div>
        <div id="letters">
          {
            this.state.letters.map(letter => (
              <div className="letter-wrapper" key={letter}>
                <div onClick={() => this.addLetter(letter)} className="letter unselectable" >
                  {letter}
                  <div className="point">
                    {this.state.letter_values[letter]}
                  </div>
                </div>
                <div className="letter-position">
                  <input onChange={e => this.updateLetterPosition(e, letter)} type="number" value={this.state.letter_positions[letter]} />
                </div>
              </div>
            ))
          }
        </div>
        <div id="words">
          {
            this.state.words.map((word, i) => (
              <div className="word" key={i}>
                {word.value} - {word.point}
              </div>
            ))
          }
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

  updateLetterPosition(e, letter) {
    const newLetterPosition = Object.assign({}, this.state.letter_positions);
    if (e.target.value > -2 && e.target.value < 9) newLetterPosition[letter] = parseInt(e.target.value, 10);

    this.setState({
      letter_positions: newLetterPosition,
    });
  }

  generateWords() {
    const foundWords = [];
    const requiredWords = [];
    const currentLetters = [];

    // check for required letters
    Object.keys(this.state.letter_positions).forEach((letter) => {
      // position doesn't matter, just add it to required list
      if (this.state.letter_positions[letter] === 0) {
        requiredWords.push(letter);
      } else if (this.state.letter_positions[letter] > 0) {
        // position matters, add to current letters list
        currentLetters[this.state.letter_positions[letter] - 1] = letter;
      }
    });

    const availableLetters = this.state.availableLetters.concat(requiredWords).sort();

    // adds letter to next available spot in array
    function addToArray(arr, letter) {
      const newArr = arr.slice();
      for (let i = 0; i <= newArr.length; i++) {
        if (newArr[i] === undefined) {
          newArr[i] = letter;
          return newArr;
        }
      }
      return newArr;
    }

    function permutateWords(letters) {
      // add to words if letter is not empty, filled, found, and required words is all used
      if (letters.length > 0 && Object.keys(letters).length === letters.length
          && requiredWords.length === 0 && words[letters.join('')]) {
        let point = 0;
        for (let i = 0; i < letters.length; i++) {
          point += this.state.letter_values[letters[i]];
        }

        foundWords.push({
          point,
          value: letters.join(''),
        });
      }

      for (let i = 0; i < availableLetters.length; i++) {
        // skip same letters
        if (availableLetters[i] !== availableLetters[i + 1]) {
          const letter = availableLetters.splice(i, 1)[0];
          let isRequired = false;

          // if letter is required, set required tag so we know letter is used
          if (requiredWords.indexOf(letter) > -1) {
            requiredWords.splice(requiredWords.indexOf(letter), 1);
            isRequired = true;
          }

          if (letter === ' ') {
            // for wild letter, try all letters
            for (let j = 1; j < this.state.letters.length; j++) {
              const newLetters = addToArray(letters, this.state.letters[j]);
              permutateWords.call(this, newLetters);
            }
          } else {
            const newLetters = addToArray(letters, letter);
            permutateWords.call(this, newLetters);
          }

          // add letter back to required if it was used
          if (isRequired) {
            requiredWords.push(letter);
          }

          availableLetters.splice(i, 0, letter);
        }
      }
    }

    permutateWords.call(this, currentLetters);

    this.setState({
      words: foundWords,
    });
  }

  clearLetters() {
    this.setState({
      availableLetters: [],
    });
  }
}

export default connect(mapStateToProps)(Main);
