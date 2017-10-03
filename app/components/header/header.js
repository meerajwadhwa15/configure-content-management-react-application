import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/login';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class HeaderClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    };
  }

  // toggle Dropdown
  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  }

  // logout user
  logout() {
    // trigger logout action
    this.props.Logout();
    this.props.history.push('/');
  }

  render() {
    let userLink = null, logoutDropdown = null, configurationLink = null;

    if (this.props.user && this.props.user.user) {
      logoutDropdown = (<div className={`dropdown ${this.state.showDropdown ? 'show' : 'hide'}`}>
        <a className="btn btn-secondary dropdown-toggle" onClick={this.toggleDropdown.bind(this)} href="javascript: void(0);" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {this.props.user.user.name}
        </a>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a className="dropdown-item" onClick={this.logout.bind(this)} href="javascrit: void(0);">Logout</a>
        </div>
      </div>);

      configurationLink = (<li className="nav-item">
        <Link className="nav-link" to="/configurations">Configuration</Link>
      </li>);

      if (this.props.user.user.role === 'Admin') {
        userLink = (<li className="nav-item">
          <Link className="nav-link" to="/users">
            Users <span className="sr-only">(current)</span>
          </Link>
        </li>);
      }

    }

    return (<nav className="navbar navbar-toggleable-md fixed-top navbar-inverse bg-inverse">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link className="navbar-brand" to="/">Assignment</Link>
      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          {userLink}
          {configurationLink}
        </ul>
      </div>
      {logoutDropdown}
    </nav>);
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

export const Header = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderClass));
