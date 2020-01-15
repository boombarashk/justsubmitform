import React from 'react'
import PropTypes from 'prop-types';
import {uniqueId} from "../util";
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';

class FileInput extends React.Component {
    render(){
        const submitBtnId = uniqueId()

        return <>
            <label htmlFor={ submitBtnId } className="App-fileUploadButton">
                <AttachmentOutlinedIcon className="App-attachment-iconAttach" fontSize="small"/> Прикрепить файл
                <input id={ submitBtnId } type="file" onChange={(ev) => this.props.handleLoadFiles(ev.target.files)}
                       className="App-fileUploadButton_hidden"/>
            </label>
        </>
    }
}

export default FileInput;

FileInput.propTypes = {
    handleLoadFiles: PropTypes.func.isRequired
}