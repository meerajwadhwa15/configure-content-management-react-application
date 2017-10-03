import React from 'react';
import './login.scss';

import { Config } from '../../config/config';
import { Fetch } from '../../helper/fetch';
import { connect } from 'react-redux';
import * as actions from '../../actions/login';
import { bindActionCreators } from 'redux';

class LoginClass extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  // validate called field
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  }

  // validate field
  validateField(name, value) {
    switch (name) {
      case 'username':
        this.usernameInValid = (value) ? false : true;
        break;
      case 'password':
        this.passwordInValid = (value) ? false : true;
        break;
    }
  }

  componentDidMount() {
    // update bread crumb
    this.props.updateBreadCrumb([]);

    // check if user loggen in tehn redirect to next page
    if (this.props.user && this.props.user.token) {
      this.checkForRedirection(this.props.user.user.role);
    }
  }

  // redirect user based on Role
  checkForRedirection(role) {
    if (role.toLowerCase() === 'admin') {
      this.props.history.push('/users');
    } else {
      this.props.history.push('/configurations');
    }
  }

  // validate form
  validateForm() {
    this.validateField('username', this.state.username);
    this.validateField('password', this.state.password);
  }

  // handle submit
  handleSubmit(event) {
    event.preventDefault();
    this.validateForm();
    if (!this.usernameInValid && !this.passwordInValid) {
      // Do login
      Fetch.post(Config.LOGIN_API, {}, JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })).then((response) => {
        // Trigger Login Action
        this.props.LoginSuccess(response);
        // Redirect user to next page by their Role
        this.checkForRedirection(response.user.role);
      }, (errorResponse) => {
        // Dispay Error message
        this.setState({ error: errorResponse.error });
      })
    }
  }

  render() {
    let errorMessage = null;
    if (this.state.error) {
      errorMessage = <div className="alert alert-danger" role="alert">{this.state.error}</div>
    }

    return (<form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
      <h2 className="form-signin-heading">Login</h2>
      {errorMessage}
      <div className={`form-group ${this.usernameInValid ? 'has-danger' : ''}`}>
        <label htmlFor="username" className="sr-only">Username</label>
        <input type="text" name="username" id="username" className="form-control" onChange={(event) => this.handleUserInput(event)} placeholder="Username" required />
        <div className="form-control-feedback">Enter Username.</div>
      </div>

      <div className={`form-group ${this.passwordInValid ? 'has-danger' : ''}`}>
        <label htmlFor="password" className="sr-only">Password</label>
        <input name="password" type="password" onChange={(event) => this.handleUserInput(event)} id="password" className="form-control" placeholder="Password" required />
        <div className="form-control-feedback">Enter Password.</div>
      </div>

      <button disabled={this.usernameInValid || this.passwordInValid} className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>);
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserDetailReducer
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginClass);

