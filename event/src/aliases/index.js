import { getOrders } from '../modules/data';
import { GET_ORDERS } from '../../../shared/actions'

const getOrdersAlias = (orginalAction) => {
    return (dispatch, getState) => {
        getOrders(dispatch);
    }
};

export default {
    GET_ORDERS: getOrdersAlias
};
