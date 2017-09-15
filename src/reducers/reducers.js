import * as actions from '../actions/actions.js';

const initalState = {
  message: 'Hello World',
};

function appReducer(state = initalState, action) {
  switch (action.type) {
    case actions.ON_MESSAGE:
      break;
  }
  return state;
}

export default appReducer;
