import React from 'react';
import List from '../common/List';
import { Config } from '../../config/config';
import { Fetch } from '../../helper/fetch';
import { connect } from 'react-redux';
import * as actions from '../../actions/configurations';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

class ConfigurationsClass extends React.Component {

    componentDidMount() {
        // Update breadcrumb
        this.props.updateBreadCrumb([]);

        // Fetch Configurations
        let url = (this.props.userDetail && this.props.userDetail.user.role.toLowerCase() !== 'admin') ? Config.CONFIGURATION + '?userId=' + this.props.userDetail.user._id : Config.ALL_CONFIGURATION;

        Fetch.get(url, {
            token: this.props.userDetail.token
        }).then((response) => {
            this.props.ListConfiguration(response.configurations);
        }, (errorResponse) => {
            this.setState({ error: errorResponse.error });
        })
    }

    constructor(props) {
        super(props);
        this.options = ['name', 'configuration', 'approve', 'publish', 'created', 'updated'];
    }

    render() {
        const { configurations } = this.props;
        let createConfiguration = null;
        if (this.props.userDetail && this.props.userDetail.user.role.toLowerCase() !== 'admin') {
            createConfiguration = (<div className="mt-2 mb-2 float-right">
                <Link className="btn btn-primary" to="/configuration/add">Add Configuration</Link>
            </div>);
        }
        return (<div>
            <h2>Configurations</h2>
            {createConfiguration}
            <table className="table">
                <thead className="thead-default">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Configuration</th>
                        <th>Approve</th>
                        <th>Publish</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <List DeleteItem={this.props.DeleteConfiguration} items={configurations} ApproveConfiguration={this.props.ApproveConfiguration} PublishConfiguration={this.props.PublishConfiguration} token={this.props.userDetail.token} userDetail={this.props.userDetail.user} options={this.options} compoent="configuration" />
            </table>
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        configurations: state.ConfigurationsReducer,
        userDetail: state.UserDetailReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};

const Configurations = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfigurationsClass);

export default Configurations;