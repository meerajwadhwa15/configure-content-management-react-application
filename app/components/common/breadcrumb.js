import React from 'react';
import { Link } from 'react-router-dom';

export default class Breadcrumb extends React.Component {
    render() {
        
        const { paths } = this.props;

        if (paths && paths.length) {
            return (<ol className="breadcrumb">
                {paths.map((link) => {
                    let actionLink = (link.active) ? <span>{link.label}</span> : (<Link to={link.action}>{link.label}</Link>);
                    return (<li className={`breadcrumb-item ${(link.active) ? 'active' : ''}`}>{actionLink}</li>)
                })}</ol>);
        } else {
            return null;
        }
    }
}