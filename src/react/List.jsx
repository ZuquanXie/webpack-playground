import React from 'react';

class List extends React.Component {
    render() {
        const {children} = this.props;
        const arr = React.Children.toArray(children);
        arr.sort((a, b) => b.props.children - a.props.children);
        return(
            <ul>{arr}</ul>
        );
    }
}

export default List;
