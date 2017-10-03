import React from 'react';
import 'bootstrap/scss/bootstrap.scss';
import './app.scss';

import { Header } from './components/header/header';
import { Login } from './components/auth/login';
import User from './components/user/user';
import AddUser from './components/user/addUser';
import Configurations from './components/configurations/configurations';
import AddConfigurations from './components/configurations/addConfigurations';
import Breadcrumb from './components/common/breadcrumb';

import { Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paths: []
        };
    }

    // update bread crumb
    updateBreadCrumb(paths) {
        this.setState({
            paths
        });
    }

    render() {
        return (<div>
            <Header />
            <div className="container">
                <Breadcrumb paths={this.state.paths} />
                <Switch>
                    <Route exact path="/" render={(props) => (
                        <Login {...props} updateBreadCrumb={this.updateBreadCrumb.bind(this)} />
                    )} />

                    <Route path="/users" render={(props) => (
                        <User {...props} updateBreadCrumb={this.updateBreadCrumb.bind(this)} />
                    )} />

                    <Route exact path="/register" render={(props) => (
                        <AddUser {...props} updateBreadCrumb={this.updateBreadCrumb.bind(this)} />
                    )} />

                    <Route path="/register/edit/:id" render={(props) => (
                        <AddUser {...props} updateBreadCrumb={this.updateBreadCrumb.bind(this)} />
                    )} />

                    <Route path="/configurations" render={(props) => (
                        <Configurations {...props} updateBreadCrumb={this.updateBreadCrumb.bind(this)} />
                    )} />

                    <Route path="/configuration/add" render={(props) => (
                        <AddConfigurations {...props} updateBreadCrumb={this.updateBreadCrumb.bind(this)} />
                    )} />

                    <Route path="/configuration/edit/:id" render={(props) => (
                        <AddConfigurations {...props} updateBreadCrumb={this.updateBreadCrumb.bind(this)} />
                    )} />

                </Switch>
            </div>
        </div>);
    }
}