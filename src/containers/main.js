import React, { Component } from 'react';
import { connect } from 'react-redux';
import AvailableLetters from '../components/AvailableLetters';
import AllLetters from '../components/AllLetters';
import Words from '../components/Words';
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
    this.addLetter = this.addLetter.bind(this);
    this.clearLetters = this.clearLetters.bind(this);
    this.generateWords = this.generateWords.bind(this);
  }

  render() {
    return (
      <div id="main">
        <div id="instructions">
          <h1>
            Instructions
          </h1>
          <p>
            1. Click on the tiles to add letters. Maximum of 7 letters.
          </p>
          <p>
            2. Set the index under each tile to reflect must use letters.
            <b> Exe: </b> -1 means the letter {"doesn't"} have to appear in the word.
            0 means the letter can be anywhere in the word.
            1 means the letter has to be the first letter in the word, etc...
          </p>
          <p>
            3. Click on Generate to get a list of available words from the letters, ordered based on descending point value.
          </p>
          <p>
            4. Click on Clear to remove all the selected letters and reset all indexes on letters.
          </p>
        </div>
        <AvailableLetters ref="availableLetters" letterValues={this.props.letterValues} generateWords={this.generateWords} clearLetters={this.clearLetters} />
        <AllLetters ref="allLetters" letters={this.props.letters} letterValues={this.props.letterValues} addLetter={this.addLetter} />
        <Words ref="words" />
      </div>
    );
  }

  addLetter(letter) {
    this.refs.availableLetters.addLetter(letter);
  }

  clearLetters() {
    this.refs.allLetters.clearLetters();
  }

  generateWords(letterTiles) {
    const foundWords = [];
    const requiredWords = [];
    const currentLetters = [];
    const letterPositions = this.refs.allLetters.state.letterPositions;

    // check for required letters
    Object.keys(letterPositions).forEach((letter) => {
      // position doesn't matter, just add it to required list
      if (letterPositions[letter] === 0) {
        requiredWords.push(letter);
      } else if (letterPositions[letter] > 0) {
        // position matters, add to current letters list
        currentLetters[letterPositions[letter] - 1] = letter;
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

    function sortWords(a, b) {
      return b.point - a.point;
    }

    permutateWords.call(this, currentLetters);

    foundWords.sort(sortWords);

    this.refs.words.setState({
      words: foundWords,
    });
  }
}

export default connect(mapStateToProps)(Main);
