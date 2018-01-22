import { GLOBALS_RETRIEVED } from '../../../shared/actions'

const initialState = {
  token: '',
  catalog: '',
  culture: "tr-TR"
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GLOBALS_RETRIEVED:
      return action.globals;
    default:
      return state;
  }
};
