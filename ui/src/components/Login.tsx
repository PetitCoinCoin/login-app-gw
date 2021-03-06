import React, { Component } from "react";

interface IProps {};

interface IState {
  email?: string,
  password?: string
};

export default class Login extends Component<IProps, IState> {
  constructor(props:IProps){
    super(props);
    this.state = {
      email:"",
      password:""
    }
  };
    
  handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
    
  handleSignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const url = "http://localhost:5000/login";
    const formData  = new FormData();
    const data: any = this.state;
    for (let name in data) {
      formData.append(name, data[name]);
    }

    fetch(url, {
      method: 'POST',
      body: formData
    }).then( res => res.json())
      .then(data=>{
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('email', data.email);
        if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
          window.location.replace("/")
        } else {
          alert(data.error);
        }
      }).catch(err => console.log(err));
    };
    
    render() {
      return (
        <div className="container-sm auth-wrapper">
          <div className="auth-inner">
            <form>
              <div className="form-group">
                <label htmlFor="validationDefault01" className="form-label">Email address</label>
                <input 
                  type="email"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Enter email"
                  required />
              </div>

              <div className="form-group">
                <label htmlFor="validationDefault02" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Enter password"
                  required />
              </div>

              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
              </div>

              <button 
                type="submit"
                className="btn btn-dark btn-block"
                onClick={this.handleSignIn}
              >
                Submit
              </button>
              <p className="text-right">
                No account yet ? <a href="/sign-up">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      );
    }
  }
