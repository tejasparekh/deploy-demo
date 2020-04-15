import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import List from './list/List';

function App() {

  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Route path="/" component={List} />
      </Router>
    </React.Fragment>
  );
}

export default App;
