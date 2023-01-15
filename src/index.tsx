import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux'
import {RouterProvider} from "react-router-dom";
import router from "./routing/Router";
import store from "./store";

/**
 * This is a standard root element of the React DOM from which we will render the application
 * We wrap everything in a redux store context provider so every page in the app has access to global state.
 * Further, we pass in the router that defines the different pages that correspond to the routes.
  */

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
