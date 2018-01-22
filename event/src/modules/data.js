import axios from 'axios'
import { ordersRetrieved } from '../../../shared/actions'
import { getYemeksepetiGlobals, saveToStorage, getFromStorage } from '../modules/chrome'

const ordersApiAddress = 'http://api.yemeksepeti.com/YS.WebServices/OrderService.svc'

export const getOrders = async (dispatch) => {
    const globals = await getYemeksepetiGlobals(dispatch);

    if(!globals.token || !globals.catalog) {
        dispatch(ordersRetrieved([]));
        return;   
    }

    const cacheKey = `Orders_${globals.token}_${globals.catalog}_${globals.culture}`
    const savedOrders = await getFromStorage(cacheKey);

    if(savedOrders) {
        dispatch(ordersRetrieved(savedOrders));
        return;
    }

    const apiResult = await getOrdersFromApi(globals);
    const filteredData = apiResult.orders.filter(item => item.Status == "Completed");

    if(apiResult.success) {
        await saveToStorage(cacheKey, filteredData);
    }

    dispatch(ordersRetrieved(filteredData));
}

const getOrdersFromApi = async (globals) => {
    const requestBody = {
        ysRequest: {
            Token: globals.token,
            CatalogName: globals.catalog,
            Culture: globals.culture,
            PageNumber: 1,
            PageRowCount: 500
        },
        getExtraRow: false,
        archiveDbOrders: false
    };

    try {
        console.log("Network call")
        const response = await axios.post(`${ordersApiAddress}/GetOrderHistory`, requestBody);

        if(response.status == 200 && response.data.d.Success) {
            return { orders: response.data.d.ResultSet, success: true };
        }
    } catch(err) {
        console.log("GetOrders Error", err);
    }

    return {orders: [], success: false };
}

const filterAndDispatch = (dispatch, event, data) => {
    const filteredData = data.filter(item => item.Status == "Completed");
    dispatch(event(filteredData));
}