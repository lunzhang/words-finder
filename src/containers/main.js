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
      available_letters: [],
      letters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
      'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',],
      letter_values: {' ': 0, 'a': 1, 'b': 4, 'c': 4, 'd': 2, 'e': 1, 'f': 4, 'g': 3, 'h': 3,
      'i': 1, 'j': 10, 'k': 5, 'l': 2, 'm': 4, 'n': 2, 'o': 1, 'p': 4, 'q': 10, 'r': 1, 's': 1,
      't': 1, 'u': 2, 'v': 5, 'w': 4, 'x': 8, 'y': 3, 'z': 10,},
      letter_positions: {' ': -1, 'a': -1, 'b': -1, 'c': -1, 'd': -1, 'e': -1, 'f': -1, 'g': -1, 'h': -1,
      'i': -1, 'j': -1, 'k': -1, 'l': -1, 'm': -1, 'n': -1, 'o': -1, 'p': -1, 'q': -1, 'r': -1, 's': -1,
      't': -1, 'u': -1, 'v': -1, 'w': -1, 'x': -1, 'y': -1, 'z': -1,}
    };
    this.addLetter = this.addLetter.bind(this);
    this.removeLetter = this.removeLetter.bind(this);
    this.updateLetterPosition = this.updateLetterPosition.bind(this);
    this.generateWords = this.generateWords.bind(this);
  }

  render() {
    return (
      <div id="main">
        <div id="available-letters">
            {
              this.state.available_letters.map((letter, index) => {
                return (
                    <div className="letter unselectable" key={index}>
                      {letter}
                      <div onClick={() => this.removeLetter(index)} className="remove-letter">
                        X
                      </div>
                      <div className="point">
                        {this.state.letter_values[letter]}
                      </div>
                    </div>
                );
              })
            }
            <button id="generate-button" onClick={this.generateWords}>
              Generate
            </button>
        </div>
        <div id="letters">
          {
            this.state.letters.map((letter) => {
              return (
                <div className="letter-wrapper" key={letter}>
                  <div onClick={() => this.addLetter(letter)} className="letter unselectable" >
                    {letter}
                    <div className="point">
                      {this.state.letter_values[letter]}
                    </div>
                  </div>
                  <div className="letter-position">
                    <input onChange={(e) => this.updateLetterPosition(e, letter)} type="number" value={this.state.letter_positions[letter]} />
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }

  addLetter(letter) {
    if(this.state.available_letters.length < 7) {
      this.setState({
        available_letters: this.state.available_letters.concat(letter)
      });
    }
  }

  removeLetter(index) {
      this.setState({
        available_letters: this.state.available_letters.filter((_, i) => i !== index)
      })
  }

  updateLetterPosition(e, letter) {
      let new_letter_positions = Object.assign({}, this.state.letter_positions);
      if(e.target.value > -2 && e.target.value < 9) new_letter_positions[letter] = e.target.value;

      this.setState({
        letter_positions: new_letter_positions
      });
  }

  generateWords() {
      let foundWords = [];
      let requiredWords = [];
      let current_letters = [];
      let available_letters = this.state.available_letters.slice().sort();

      Object.keys(this.state.letter_positions).forEach((letter) => {
        if(this.state.letter_positions[letter] === 0) {
          requiredWords.push(letter);
        } else if(this.state.letter_positions[letter] > 0){
          current_letters[this.state.letter_positions[letter] - 1] = letter;
        }
      });

      function permutateWords(letters) {
          // add to words if letter is not empty, filled, and found
          if(letters.length > 0 && Object.keys(letters).length === letters.length
          && words[letters.join('')]) foundWords.push(letters.join(''));

          for(let i = 0; i < available_letters.length; i++) {
              // skip same letters
              if(available_letters[i] === available_letters[i + 1]) continue;

              let letter = available_letters.splice(i, 1)[0];
              let new_letters = addToArray(letters, letter);
              permutateWords(new_letters);
              available_letters.splice(i, 0, letter);
          }
      }

      // adds letter to next available spot in array
      function addToArray(arr, letter) {
        let newArr = arr.slice()
        for(let i = 0; i <= newArr.length; i++) {
          if(newArr[i] === undefined) {
            newArr[i] = letter;
            return newArr;
          }
        }
      }

      permutateWords(current_letters);

      console.log(foundWords);
  }
}

export default connect(mapStateToProps)(Main);
