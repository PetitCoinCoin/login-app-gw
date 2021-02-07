
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {isLoggedIn, deleteTokens} from '../auth';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Header extends Component {
  render() {

    return (  
        <div className="custom-header">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/"}>
                <img src={"https://www.gatewatcher.com/static/img/GW_LOGO_RVB.png"} className="app-logo" alt="logo" />
              </Link>
              <div className="collapse navbar-collapse">
                  { isLoggedIn() ? 
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                          <button 
                              type="button"
                              className="btn btn-link nav-link"
                              onClick={() => {
                                deleteTokens();
                                window.location.replace("/")
                              }}
                          >
                              Logout
                          </button>
                        </li>
                    </ul>
                  :
                  <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to={"/login"}>Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                      </li>
                  </ul>
                  }
              </div>
            </div>
          </nav>
        </div>
    );
  }
}