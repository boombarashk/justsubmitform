import React from 'react'
import FileList from "./filelist";
import PropTypes from 'prop-types';
import {uniqueId} from "../util";
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';

class FileInput extends React.Component {
    constructor(props){
        super(props);
        this.attachedFiles = props.attachedFiles;
        this.countFiles = props.attachedFiles.length;

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(ev) {
        const size1Mb = 1048576
        const size5Mb = 5 * size1Mb
        const size20Mb = 4 * size5Mb
        let arrayFiles = Array.from(ev.target.files)
        const countFiles = arrayFiles.length
        const indexFile = 0 // not multiple

        const sizeFile = ev.target.files[indexFile].size
//      console.log(sizeFile > size1Mb ? Math.round( sizeFile / size1Mb) : sizeFile)
        if(ev.target.files[indexFile].size > size5Mb ){
            alert("File is too big!");
            ev.target.value=""
        } else {
            this.props.handleLoadFile(ev.target.files[indexFile])
        }
    }

    render(){
        const submitBtnId = uniqueId()

        return <>
            <FileList files={ this.props.attachedFiles }
                      handleDrop={this.props.handleLoadFile} />

            <label htmlFor={ submitBtnId } className="App-fileUploadButton">
                <AttachmentOutlinedIcon className="App-attachment-iconAttach" fontSize="small"/> Прикрепить файл
                <input id={ submitBtnId } type="file" onChange={this.handleChange} className="App-fileUploadButton_hidden"/>
            </label>
        </>
    }
}

export default FileInput;

FileInput.defaultProps = {
    attachedFiles: [],
}
FileList.propTypes = {
    attachedFiles: PropTypes.array,
    handleLoadFile: PropTypes.func
}