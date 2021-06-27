import './App.css';
import Content from './Content';
import {Forgot} from './Forgot';
import PasswordReset from './PasswordReset';
import HomePage from './HomePage';
import SignUp from './SignUp';
import PostJob from './PostJob';
import JobsPosted from './JobsPosted'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/">
          <HomePage/>
        </Route>
        <Route exact path="/login">
          <Content/>
        </Route>
        <Route exact path="/register">
          <SignUp/>
        </Route>
        <Route path="/ForgotPassword">
          <Forgot/>
        </Route>
        <Route path="/ResetPassword">
          <PasswordReset/>
        </Route>
        <Route path="/postjob">
          <PostJob/>
        </Route>
        <Route path="/myjobs">
          <JobsPosted/>
        </Route>
        </Switch>
    </Router>
  );
}

export default App;
