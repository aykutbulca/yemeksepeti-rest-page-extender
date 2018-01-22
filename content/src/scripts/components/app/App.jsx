import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { getOrders } from '../../../../../shared/actions';
import { l } from '../../../../../shared/resources';
import * as styles from './styles';

class App extends Component {
  constructor(props) {
    super(props);
    const restaurantId = this.getRestaurantId();
    this.state = { restaurantId: restaurantId };
  }

  componentDidMount() {
    this.props.getOrders(this.state.restaurantId)
  }

  getRestaurantId() {
    const attributeName = "data-category-name";

    const restItem = document.querySelector(`[${attributeName}]`);
    if(restItem) {
      return restItem.attributes[attributeName].value;
    }

    return null;
  }

  render() {
    console.log("Render");

    if(this.props.orders && this.props.orders.length > 0) {
      const orders = this.props.orders.filter(item => item.RestaurantCategoryName == this.state.restaurantId);
      const hasOrders = orders.length > 0;

      if(hasOrders) {
        const count = (orders.length < 3 ? orders.length: 3);
        return (
          <div>
            <div style={styles.headerPanelStyle}>
              <h2 style={styles.headerTextStyle}><b>{`${this.localize("previousOrders")} (${orders.length})`}</b></h2>
            </div>
            <div style={this.getRootComponentStyle(count)}>
              {hasOrders ? this.renderOrderList(orders): null}
            </div>
          </div>
        );
      }
    }

    return null;
  }

  renderOrderList(orders) {
    const listItems = orders.map(order => this.renderOrderListItem(order));
    
    return (
      <ul>
        {listItems}
      </ul>
    );
  }

  renderOrderListItem(order) {
    return (
      <li key={order.OrderGroupId}>
        <div className="row detailTopBox" style={styles.rowStyle}>
          <div className="col-md-13">
              <div style={styles.contentTextStyle}>
                <a href={`${this.localize("orderDetailLink")}?trackingNumber=${order.TrackingNumber}&oh=1`} target="_blank">
                  <strong>{this.fixTextLength(order.Description, 75)}</strong>
                </a>
              </div>
              <div style={styles.amountTextStyle}>
                <span style={styles.spanRightMargin}>{this.localize("orderDate")}: <strong>{this.orderDateToString(order.DeliveryDate, order.OrderDateTextByMinute)}</strong>
                </span>
                <span style={styles.spanRightMargin}>{this.localize("total")}: <strong>{order.Total} TL</strong></span>
              </div>
          </div>
          <div className="col-md-3">
              <div style={styles.pointBoxStyle}>
                <div className="points">
                  { this.renderOrderPoint("flavour", order.Flavour) }
                  { this.renderOrderPoint("service", order.Serving) }
                  { this.renderOrderPoint("speed", order.Speed) }
                </div>
              </div>
          </div>
        </div>
      </li>
    );

    /*
    <div className="col-md-2">
      <button data-order-group-id="7c830eb1-6a04-4b15-a2ab-de29b0cf62cc" style={{margin: '6px'}} className="ys-btn ys-btn-primary ys-btn-lg middle">
        TEKRARLA
      </button>
    </div>
    */
  }

  renderOrderPoint(key, point){
    if(point <= 0) {
      return null;
    }

    return (
      <div className={`point ys-invert point${point}`} style={styles.pointStyle}>
        <span style={styles.pointHeaderStyle}>{this.localize(key)}</span>
        <span className="point" style={styles.pointValueStyle}>{point}</span>
      </div>
    )
  }

  getRootComponentStyle(itemCount) {
    return {
      height: (itemCount * 50) + 2,
      overflow: 'auto',
      marginBottom: '15px',
      border: '1px solid #f3f3f3'
    }
  }

  fixTextLength(text, maxlength) {
    if(text && text.trim().length > maxlength) {
      return `${text.trim().substring(0, maxlength)}...`;
    }
    return text.trim();
  }

  orderDateToString(orderDateJsonString, description) {
    const date = new Date(parseInt(orderDateJsonString.replace('/Date(', ''))).toLocaleString(this.props.culture, { timeZone: 'UTC' });
    return `${date.replace(',', ' -')} (${description})`;
  }

  localize(key) {
    return l(this.props.culture, key)
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    culture: state.globals.culture
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getOrders }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);