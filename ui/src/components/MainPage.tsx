import { Component } from "react";
import {isLoggedIn} from '../auth';

export default class MainPage extends Component {
  render() {
    return (
      <div>
        { isLoggedIn() ?
          <h3>Welcome to Gatewatcher !</h3>
        :
          <h2>Please log in</h2>
        }
      </div>
    );
  }
}
