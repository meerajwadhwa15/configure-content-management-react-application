import React from 'react';
import { Link } from 'react-router-dom';
import { Config } from '../../config/config';
import { Fetch } from '../../helper/fetch';

import Dropdown from 'react-bootstrap/lib/Dropdown';


export default class Item extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownState: false
        };

        this.apiMap = {
            register: Config.USER,
            configuration: Config.CONFIGURATION
        }
    }

    approveConfiguration() {
        this.toggleDropdown();
        Fetch.put(Config.APPROVE_CONFIGURATION, {
            token: this.props.token
        }, JSON.stringify({
            id: this.props.item._id,
            approveBy: this.props.userDetail._id
        })).then((response) => {
            this.props.ApproveConfiguration({
                approve: true,
                id: this.props.item._id
            });
        }, (errorResponse) => {
            this.setState({ error: errorResponse.error });
        });
    }

    publishConfiguration() {
        this.toggleDropdown();
        Fetch.put(Config.PUBLISH_CONFIGURATION, {
            token: this.props.token
        }, JSON.stringify({
            id: this.props.item._id,
            publishBy: this.props.userDetail._id
        })).then((response) => {
            this.props.PublishConfiguration({
                publish: true,
                id: this.props.item._id
            });
        }, (errorResponse) => {
            this.setState({ error: errorResponse.error });
        })
    }

    deleteItem() {
        // Delete item
        this.toggleDropdown();
        let url = `${this.apiMap[this.props.compoent]}?id=${this.props.item._id}`;
        Fetch.delete(url, {
            token: this.props.token
        }).then((response) => {
            this.props.DeleteItem({
                id: this.props.item._id
            });
        }, (errorResponse) => {
            this.setState({ error: errorResponse.error });
        });
    }

    toggleDropdown() {
        this.setState({
            dropdownState: !this.state.dropdownState
        });
    }

    render() {
        const { item, options, key } = this.props;
        
        if (item) {
            let configurationAction = null;
            if (this.props.userDetail && this.props.userDetail.role && this.props.userDetail.role.toLowerCase() === 'admin' && this.props.compoent && this.props.compoent === 'configuration') {
                if (!item.approve) {
                    configurationAction = (<a className="dropdown-item" href="javascript: void(0);" onClick={this.approveConfiguration.bind(this)}>Approve</a>);
                } else if (!item.publish) {
                    configurationAction = (<a className="dropdown-item" href="javascript: void(0);" onClick={this.publishConfiguration.bind(this)}>Publish</a>);
                }
            }

            let commonActionsButton = (<td>
                <div className={`btn-group ${this.state.dropdownState ? 'show' : 'hide'}`} role="group">
                    <button id="btnGroupDrop1" type="button" onClick={this.toggleDropdown.bind(this)} className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded={`${this.state.dropdownState ? 'show' : 'hide'}`}>Actions</button>
                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        <Link className="dropdown-item" to={`/${this.props.compoent}/edit/${item._id}`}>Edit</Link>
                        <a className="dropdown-item" onClick={this.deleteItem.bind(this)} href="javascript: void(0);">Delete</a>
                        {configurationAction}
                    </div>
                </div>
            </td>);

            return (<tr key={item._id}>
                <td>{key}</td>
                {options.map((value) => {
                    if (value == 'publish') {
                        return (<td>{(item[value]) ? 'published' : 'un published'}</td>);
                    } else if (value == 'approve') {
                        return (<td>{(item[value]) ? 'approved' : 'un approved'}</td>);
                    }
                    return (<td>{(item[value]) ? item[value] : '-'}</td>)
                })}
                {commonActionsButton}
            </tr>);
        } else {
            return (<tr><td>Loading...</td></tr>);
        }
    }
}