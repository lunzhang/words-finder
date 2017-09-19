import React, { Component } from 'react';
import { connect } from 'react-redux';
import AvailableLetters from '../components/AvailableLetters';
import words from '../../words.json';

const mapStateToProps = function mapStateToProps(state) {
  return {
    letters: state.letters,
    letterValues: state.letterValues,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letterPositions: { ' ': -1,
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
    this.updateLetterPosition = this.updateLetterPosition.bind(this);
    this.generateWords = this.generateWords.bind(this);
  }

  render() {
    return (
      <div id="main">
        <AvailableLetters ref="availableLetters" letterValues={this.props.letterValues} generateWords={this.generateWords}/>
        <div id="letters">
          {
            this.props.letters.map(letter => (
              <div className="letter-wrapper" key={letter}>
                <div onClick={() => this.addLetter(letter)} className="letter unselectable" >
                  {letter}
                  <div className="point">
                    {this.props.letterValues[letter]}
                  </div>
                </div>
                <div className="letter-position">
                  <input onChange={e => this.updateLetterPosition(e, letter)} type="number" value={this.state.letterPositions[letter]} />
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
      this.refs.availableLetters.addLetter(letter);
  }

  updateLetterPosition(e, letter) {
    const newLetterPosition = Object.assign({}, this.state.letterPositions);
    if (e.target.value > -2 && e.target.value < 9) newLetterPosition[letter] = parseInt(e.target.value, 10);

    this.setState({
      letterPositions: newLetterPosition,
    });
  }

  generateWords(letterTiles) {
    const foundWords = [];
    const requiredWords = [];
    const currentLetters = [];

    // check for required letters
    Object.keys(this.state.letterPositions).forEach((letter) => {
      // position doesn't matter, just add it to required list
      if (this.state.letterPositions[letter] === 0) {
        requiredWords.push(letter);
      } else if (this.state.letterPositions[letter] > 0) {
        // position matters, add to current letters list
        currentLetters[this.state.letterPositions[letter] - 1] = letter;
      }
    });

    const availableLetters = letterTiles.concat(requiredWords).sort();

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
          point += this.props.letterValues[letters[i]];
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
            for (let j = 1; j < this.props.letters.length; j++) {
              const newLetters = addToArray(letters, this.props.letters[j]);
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
}

export default connect(mapStateToProps)(Main);
