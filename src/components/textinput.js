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
                ref={this.props.refInput}
                defaultValue={this.props.value}
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
    value: '',
    half: false
}

Textinput.propTypes = {
    refInput: PropTypes.object.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.any,
    half: PropTypes.bool
}