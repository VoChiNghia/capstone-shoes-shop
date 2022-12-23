import React from 'react';
import ReactDOM from 'react-dom/client';
import {unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import './Style/global.css'
import {Provider} from 'react-redux'
import { stores } from './store/store';
import {createBrowserHistory} from '@remix-run/router'
import Routers from './Router/Router';
import './util/darkMode'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const history = createBrowserHistory({ v5Compat: true })
root.render(
  <Provider store={stores}>
     <HistoryRouter history={history}>
      <Routers/>
  </HistoryRouter>
  </Provider>
);

