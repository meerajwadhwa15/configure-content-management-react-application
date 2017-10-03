import React from 'react';
import { Config } from '../../config/config';
import { Fetch } from '../../helper/fetch';
import { connect } from 'react-redux';
import * as actions from '../../actions/configurations';
import { bindActionCreators } from 'redux';

let JSONEditor = require('jsoneditor/dist/jsoneditor');
let Ajv = require('ajv');

import 'jsoneditor/dist/jsoneditor.min.css';

class AddConfigurationsClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            configuration: ''
        }
    }

    componentWillUnmount() {
        // destroy Edit on component Close
        this.editor.destroy();
    }

    componentDidMount() {

        // Initialize Editor
        this.editor = new JSONEditor(document.getElementById("jsoneditor"), {
            mode: 'code',
            ajv: new Ajv({ allErrors: true, verbose: true }),
            onChange: () => {
                this.state.configuration = this.editor.get();
            },
            onError: () => {
                this.state.configurationInValid = true;
            }
        });

        // Set User Id
        let id = null;
        if (this.props.match.params && this.props.match.params.id) {
            id = this.props.match.params.id;

            for (let i in this.props.configurations) {
                if (this.props.configurations[i]._id == id) {
                    this.setState({
                        id,
                        configuration: JSON.parse(this.props.configurations[i].configuration),
                        name: this.props.configurations[i].name
                    }, () => {
                        this.editor.set(this.state.configuration);
                    });
                    break;
                }
            }
        }

        // Update bread crumb
        this.props.updateBreadCrumb([{
            label: 'Configuration',
            action: '/configurations'
        }, {
            label: (id) ? 'Edit Configuration' : 'Add Configuration',
            active: true
        }]);
    }

    // Set input value on change
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) });
    }

    // Validate Field
    validateField(name, value) {
        switch (name) {
            case 'configuration':
                this.setState({ configurationInValid: (value) ? false : true });
                break;
            case 'name':
                this.setState({ nameInValid: (value) ? false : true });
                break;
        }
    }

    // Validate Form
    validateForm() {
        this.validateField('configuration', this.state.configuration);
        this.validateField('name', this.state.name);
    }

    // Handle Form Submit
    handleSubmit(event) {
        event.preventDefault();
        this.validateForm();
        if (!this.state.configurationInValid && !this.state.nameInValid) {
            // Register User
            let method = (this.state.id) ? 'put' : 'post';
            Fetch[method](Config.CONFIGURATION, {
                token: this.props.userDetail.token
            }, JSON.stringify({
                name: this.state.name,
                configuration: this.state.configuration,
                userId: this.props.userDetail.user._id,
                id: this.state.id
            })).then((response) => {
                if (this.state.id) {
                    //Calling Update action
                    this.props.UpdateConfiguration({
                        name: this.state.name,
                        configuration: JSON.stringify(this.state.configuration),
                        userId: this.props.userDetail.user._id
                    });
                } else {
                    // Calling Add Action
                    this.props.AddConfiguration(response.configuration);
                }
                // Navigating to List Page
                this.props.history.push('/configurations');
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

        return (<form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
            <h2 className="form-signin-heading">Add Configuration</h2>
            {errorMessage}

            <div className={`form-group ${this.state.nameInValid ? 'has-danger' : ''}`}>
                <label htmlFor="name" className="sr-only">Name</label>
                <input type="text" name="name" id="name" value={this.state.name} className="form-control" onChange={(event) => this.handleUserInput(event)} placeholder="Name" required />
                <div className="form-control-feedback">Enter Name.</div>
            </div>

            <div className="form-group" id="jsoneditor">

            </div>

            <button disabled={this.state.usernameInValid || this.state.passwordInValid || this.state.emailInValid || this.state.nameInValid} className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
        </form>);
    }
}

const mapStateToProps = state => {
    return {
        userDetail: state.UserDetailReducer,
        configurations: state.ConfigurationsReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};

const AddConfigurations = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddConfigurationsClass);

export default AddConfigurations;