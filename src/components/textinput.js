import React from 'react';
import PropTypes from 'prop-types';
import Label from "./label";

export default class Textinput extends React.Component {
    render(){
        const { label } = this.props
        const inputLabel = this.props.label && <Label label={label}/>
        const inputClass = `App-textInput ${ this.props.half ? "App-textInput-half": "" }`

        return <>
            {inputLabel}

            <input
                type={this.props.type}
                className={inputClass}
                placeholder={this.props.placeholder}
            />
        </>
    }
}

Textinput.defaultProps = {
    label: null,
    type: 'text',
    placeholder: '',
    half: false
}

Textinput.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.any,
    half: PropTypes.bool
}