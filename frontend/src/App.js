import logo from './logo.svg';
import './App.css';
import { Header, Button, Icon } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserForm from './UserForm.js';

function App() {
  return (
    <Router>
      <header>
        <Button icon>
          <Icon name='arrow left' />
        </Button>
        <Header as='h1'>[logo] CourseEasy</Header>
      </header>

      <Switch>
        <Route path='/'>
          <UserForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
