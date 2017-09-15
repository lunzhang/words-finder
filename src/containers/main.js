import React, { Component } from 'react';
import { connect } from 'react-redux';
import words from '../../words.json';

const mapStateToProps = function mapStateToProps(state) {
  return {
    state,
  };
};

class Main extends Component {
  render() {
    return (
      <div id="main">
        {this.props.state.message}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);
