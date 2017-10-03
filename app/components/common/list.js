import React from 'react';
import Item from './item';

export default class List extends React.Component {
    render() {
        const { items, options } = this.props;
        if (items && items.length) {
            return (<tbody>
                {items.map((item, i) => <Item key={i} item={item} {...this.props} />)}
            </tbody>);
        } else {
            return (<tbody><tr><td className="text-center" colSpan={this.props.options.length + 2}>No record found</td></tr></tbody>)
        }
    }
}