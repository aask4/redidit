import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux'
render(
 <Provider>
     <App />
 </Provider>
, document.getElementById('app'));