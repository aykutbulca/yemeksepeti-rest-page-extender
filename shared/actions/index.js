export const GLOBALS_RETRIEVED = 'GLOBALS_RETRIEVED'
export const GET_ORDERS = 'GET_ORDERS'
export const ORDERS_RETRIEVED = 'ORDERS_RETRIEVED'

export function globalsRetrieved(globals) {
  return {
    type: GLOBALS_RETRIEVED,
    globals
  }
}

export function getOrders(restaurantId) {
  return {
    type: GET_ORDERS,
    restaurantId: restaurantId
  }
}

export function ordersRetrieved(orders) {
  return {
    type: ORDERS_RETRIEVED,
    orders: orders
  }
}