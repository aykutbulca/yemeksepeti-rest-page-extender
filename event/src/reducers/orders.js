import { ORDERS_RETRIEVED } from '../../../shared/actions'

export default (state = [], action) => {
  switch (action.type) {
    case ORDERS_RETRIEVED:
      return action.orders;
    default:
      return state;
  }
};
