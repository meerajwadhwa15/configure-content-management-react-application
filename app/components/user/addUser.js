import React from 'react';
import { Config } from '../../config/config';
import { Fetch } from '../../helper/fetch';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';
import { bindActionCreators } from 'redux';

class AddUserClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            name: '',
            role: 'User',
            error: null
        };
    }

    componentDidMount() {
        // Set User Id
        let id = null;
        if(this.props.match.params && this.props.match.params.id) {
            id = this.props.match.params.id;
        
            for(let i in this.props.users) {
                if(this.props.users[i]._id == id) {
                    this.setState({
                        id,
                        username: this.props.users[i].username,
                        password: this.props.users[i].password,
                        email: this.props.users[i].email,
                        name: this.props.users[i].name,
                        role: this.props.users[i].role,
                    })
                    break;
                }
            }
        }

        // Update breadcrumb
        this.props.updateBreadCrumb([{
            label: 'User',
            action: '/users'
        }, {
            label: (id)?'Edit User':'Add User',
            active: true
        }]);

        // get User Detail
    }

    // Set input value on change in State
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) });
    }

    // Validate Field
    validateField(name, value) {
        switch (name) {
            case 'username':
                this.setState({ usernameInValid: (value) ? false : true });
                break;
            case 'password':
                this.setState({ passwordInValid: (value) ? false : true });
                break;
            case 'email':
                this.setState({ emailInValid: (value) ? false : true });
                break;
            case 'name':
                this.setState({ nameInValid: (value) ? false : true });
                break;
        }
    }

    // Validate Foem
    validateForm() {
        this.validateField('username', this.state.username);
        this.validateField('password', this.state.password);
        this.validateField('email', this.state.email);
        this.validateField('name', this.state.name);
        return !this.state.usernameInValid && !this.state.passwordInValid && !this.state.emailInValid && !this.state.nameInValid;
    }

    // Handle Form Submit 
    handleSubmit(event) {
        event.preventDefault();
        if (this.validateForm()) {
            // Register User
            let method = (this.state.id)?'put':'post';
            Fetch[method](Config.USER, {
                token: this.props.userDetail.token
            }, JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                name: this.state.name,
                role: this.state.role,
                id: this.state.id
            })).then((response) => {
                
                if(this.state.id) {
                    // Calling Update User Action
                    this.props.UpdateUser({
                        name: this.state.name,
                        role: this.state.role,
                        id: this.state.id
                    });
                } else {
                    // Calling Add User Action
                    this.props.AddUser(response.user);
                }
                
                this.props.history.push('/users');
            }, (errorResponse) => {
                this.setState({ error: errorResponse.error });
            })
        }
    }

    render() {
        let errorMessage = null;
        if (this.state.error) {
            errorMessage = <div className="alert alert-danger" role="alert">{this.state.error}</div>
        }

        let attr = {};
        if(this.state.id) {
            attr.disabled = true;
        }

        return (<form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
            <h2 className="form-signin-heading">Register User</h2>
            {errorMessage}

            <div className={`form-group ${this.state.nameInValid ? 'has-danger' : ''}`}>
                <label htmlFor="name" className="sr-only">Name</label>
                <input type="text" name="name" id="name" value={this.state.name} className="form-control" onChange={(event) => this.handleUserInput(event)} placeholder="Name" required />
                <div className="form-control-feedback">Enter Name.</div>
            </div>

            <div className={`form-group ${this.state.emailInValid ? 'has-danger' : ''}`}>
                <label htmlFor="email" className="sr-only">Email</label>
                <input type="text" name="email" id="email" value={this.state.email} className="form-control" {...attr} onChange={(event) => this.handleUserInput(event)} placeholder="Email" required />
                <div className="form-control-feedback">Enter Email.</div>
            </div>

            <div className="form-group">
                <label htmlFor="role" className="sr-only">Role</label>
                <select type="text" name="role" id="role" value={this.state.role} className="form-control" onChange={(event) => this.handleUserInput(event)} placeholder="Role" required>
                    <option value="user">User</option>
                </select>
            </div>

            <div className={`form-group ${this.state.usernameInValid ? 'has-danger' : ''}`}>
                <label htmlFor="username" className="sr-only">Username</label>
                <input type="text" name="username" {...attr} id="username" value={this.state.username} className="form-control" onChange={(event) => this.handleUserInput(event)} placeholder="Username" required />
                <div className="form-control-feedback">Enter Username.</div>
            </div>

            <div className={`form-group ${this.state.passwordInValid ? 'has-danger' : ''}`}>
                <label htmlFor="password" className="sr-only">Password</label>
                <input name="password" type="password" {...attr} onChange={(event) => this.handleUserInput(event)} id="password" value={this.state.password} className="form-control" placeholder="Password" required />
                <div className="form-control-feedback">Enter Password.</div>
            </div>

            <button disabled={this.state.usernameInValid || this.state.passwordInValid || this.state.emailInValid || this.state.nameInValid} className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>);
    }
}

const mapStateToProps = state => {
    return {
        userDetail: state.UserDetailReducer,
        users: state.UserReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};

const AddUser = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddUserClass);

export default AddUser;