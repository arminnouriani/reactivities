import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.css';
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css'
import './app/layout/style.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import HomePage from './features/home/homepage';
import { createBrowserHistory } from "history";

export const history = createBrowserHistory({ window });

//
ReactDOM.render(
  <StoreContext.Provider value={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='/' element={<HomePage />} ></Route>
        <Route path='/*' element={<App />}></Route>
      </Routes>

    </HistoryRouter>
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
