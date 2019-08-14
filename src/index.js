import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import App from './components/App/App';

ReactDOM.render(
  <div className="App">
    <Helmet>
      <title>Equipe.Games</title>
      <meta charSet="utf-8" />
    </Helmet>
    <Router>
      <Route path="/" exact component={App} />
    </Router>
  </div>,
  document.getElementById('root'),
);
