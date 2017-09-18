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
      required_letters: [],
      letters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
      'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',],
      letter_values: {' ': 0, 'a': 1, 'b': 4, 'c': 4, 'd': 2, 'e': 1, 'f': 4, 'g': 3, 'h': 3,
      'i': 1, 'j': 10, 'k': 5, 'l': 2, 'm': 4, 'n': 2, 'o': 1, 'p': 4, 'q': 10, 'r': 1, 's': 1,
      't': 1, 'u': 2, 'v': 5, 'w': 4, 'x': 8, 'y': 3, 'z': 10
      }
    };
    this.addLetter = this.addLetter.bind(this);
    this.removeLetter = this.removeLetter.bind(this);
    this.updateLetterPosition = this.updateLetterPosition.bind(this);
  }

  render() {
    return (
      <div id="main">
        <div id="available-letters">
            {
              this.state.available_letters.map((letter, index) => {
                return (
                  <div className="available-letter" key={index}>
                    <div className="letter unselectable" >
                      {letter.value}
                      <div onClick={() => this.removeLetter(index)} className="remove-letter">
                        X
                      </div>
                      <div className="point">
                        {this.state.letter_values[letter.value]}
                      </div>
                    </div>
                    <div className="letter-position">
                      <input onChange={(e) => this.updateLetterPosition(e, index)} type="number" value={letter.position} />
                    </div>
                  </div>
                );
              })
            }
        </div>
        <div id="letters">
          {
            this.state.letters.map((letter) => {
              return (
                <div onClick={() => this.addLetter(letter)} className="letter unselectable" key={letter}>
                  {letter}
                  <div className="point">
                    {this.state.letter_values[letter]}
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
        available_letters: this.state.available_letters.concat({
            value: letter,
            position: 0,
          })
      });
    }
  }

  removeLetter(index) {
      this.setState({
        available_letters: this.state.available_letters.filter((_, i) => i !== index)
      })
  }

  updateLetterPosition(e, index) {
      this.setState({
        available_letters: this.state.available_letters.map((letter, i) => {
          if(i === index && e.target.value > -1) {
            letter.position = e.target.value;
          }

          return letter;
        })
      });
  }
}

export default connect(mapStateToProps)(Main);
