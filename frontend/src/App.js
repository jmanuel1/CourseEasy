import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserForm from './UserForm.js';
import Recommendations from './Recommendations.js';
import Header from './Header.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/recommendations'>
          <Header prevRoute='/' />
          <Recommendations />
        </Route>
        <Route path='/'>
          <Header prevRoute='/' />
          <UserForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
