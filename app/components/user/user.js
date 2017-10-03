import React from 'react';
import List from '../common/List';
import { Config } from '../../config/config';
import { Fetch } from '../../helper/fetch';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

class UserClass extends React.Component {

    constructor(props) {
        super(props);
        this.options = ['name', 'username', 'email', 'role', 'created', 'updated'];
    }

    componentDidMount() {
        // update bread crumbs
        this.props.updateBreadCrumb([]);

        // Fetch Users
        Fetch.get(Config.USER, {
            token: this.props.userDetail.token
        }).then((response) => {
            this.props.UserList(response.users);
        }, (errorResponse) => {
            this.setState({ error: errorResponse.error });
        })
    }

    render() {
        let createUserLink = null;
        if (this.props.userDetail && this.props.userDetail.user.role.toLowerCase() === 'admin') {
            createUserLink = (<Link className="btn btn-primary" to="/register">Create User</Link>);
        }
        return (<div>
            <h2>Users</h2>
            <div className="mt-2 mb-2 float-right">
                {createUserLink}
            </div>
            <table className="table">
                <thead className="thead-default">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <List token={this.props.userDetail.token} DeleteItem={this.props.DeleteUser} options={this.options} items={this.props.user} compoent="register" />
            </table>
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer,
        userDetail: state.UserDetailReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};

const User = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserClass);

export default User;