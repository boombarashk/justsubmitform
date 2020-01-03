import React from 'react';
import PropTypes from 'prop-types';

export default class Label extends React.Component {
    render(){
        return <label htmlFor={this.props.htmlFor} className="App-label">
            {this.props.label}
        </label>
    }
}

Label.propTypes = {
    label: PropTypes.string.isRequired,
    htmlFor: PropTypes.string
}