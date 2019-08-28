import {
  CREATE_STREAM,
  FETCH_STREAM,
  DELETE_STREAM,
  FETCH_ALL_STREAMS,
  EDIT_STREAM
} from '../actions/type';

import _ from 'lodash';

export const streamReducer = (state = {}, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case FETCH_STREAM:
    case CREATE_STREAM:
    case EDIT_STREAM:
      // const newState = { ...state };
      // newState[action.payload.id] = action.payload;
      // return newState;
      return { ...state, [action.payload.id]: action.payload };

    case DELETE_STREAM:
      // return state.filter(stream => stream.id !== action.payload.id);
      // return state.splice(action.payload, 1);
      // const newState = {...state};

      // New method
      const { [action.payload.id]: omitted, ...rest } = state;
      return rest;

    case FETCH_ALL_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    default:
      return state;
  }
};
