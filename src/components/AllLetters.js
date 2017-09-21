import React, { Component } from 'react';

export default class AllLetters extends Component {
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
    };
    this.clearPositions = this.clearPositions.bind(this);
    this.updateLetterPosition = this.updateLetterPosition.bind(this);
  }

  render() {
    return (
      <div id="letters">
        {
          this.props.letters.map(letter => (
            <div className="letter-wrapper" key={letter}>
              <div onClick={() => this.props.addLetter(letter)} className="letter unselectable" >
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
        <div className="clear-button-wrapper">
          <button className="clear-button" onClick={this.clearPositions}>
              Clear Positions
          </button>
        </div>
      </div>
    );
  }

  updateLetterPosition(e, letter) {
    const newLetterPosition = Object.assign({}, this.state.letterPositions);
    if (e.target.value > -2 && e.target.value < 9) newLetterPosition[letter] = parseInt(e.target.value, 10);

    this.setState({
      letterPositions: newLetterPosition,
    });
  }

  // reset all letter positions back to -1
  clearPositions() {
    const newLetterPositions = {};
    Object.keys(this.state.letterPositions).forEach((key) => {
      newLetterPositions[key] = -1;
    });

    this.setState({
      letterPositions: newLetterPositions,
    });
  }
}
