import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
