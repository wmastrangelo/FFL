import React, { Component } from 'react';
import * as signalR from "@microsoft/signalr";
import '../styles/login.css'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      success: '',
    };
    this.ws = null;
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: '', success: '' });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    if (!username || !password) {
      this.setState({ error: 'Username and password are required.' });
      return;
    }
    this.ws.send("Login", username, password)
  };

  componentDidMount() {
    this.ws = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5207/users")
      .withAutomaticReconnect()
      .build();
    this.ws.on("LoginSuccess", (teamID) => {this.props.onLogin(teamID, false)})
    this.ws.on("LoginFailed", (message) => { this.setState({error: message}) })
    this.ws.on("LoginAdmin", (teamID) => {this.props.onLogin(teamID, true)})
    this.startConnection();
  }
  async startConnection() {
    try {
      await this.ws.start();
      console.log("SignalR connected");
    } catch (err) {
      console.error("Connection error:", err);
    }
  }
  componentWillUnmount() {
    if (this.ws) {
      console.log("Stopping connection...");
      this.ws.stop();
    }
  }

  render() {
    const { username, password, error, success } = this.state;

    return (
      <div className='login-page'>
        <div className="login-container elevate">
          <h2>THE LEAGUE</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <form className='login-form' onSubmit={this.handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label>Username</label><br />
              <input
                className='login-input'
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Password</label><br />
              <input
                className='login-input'
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                style={{ width: '100%' }}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;