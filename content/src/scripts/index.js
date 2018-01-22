import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

import App from './components/app/App';

const proxyStore = new Store({portName: 'ys-rso-port'});

const prevOrdersDiv = document.createElement('div');
prevOrdersDiv.id = 'ys-rso';

const refItem = document.querySelector(".restaurant-tabs");

if(refItem && refItem.parentNode) {
  refItem.parentNode.insertBefore(prevOrdersDiv, refItem);

  //https://github.com/tshaddix/react-chrome-redux/issues/5
  const unsubscribe = proxyStore.subscribe(() => {
    unsubscribe();
    render(
      <Provider store={proxyStore}>
        <App/>
      </Provider>,
      document.getElementById('ys-rso')
    );
  });
}