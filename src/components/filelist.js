import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { uniqueId } from '../util'
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const FileInfo = (fileCfg, id) => {
    return <div className="App-attachment" data-name={ fileCfg.name } key={ id }>
        <div className="App-attachment-label">
            <AttachmentOutlinedIcon className="App-attachment-iconAttach App-attachment-iconAttach_large" fontSize="large"/>
            { fileCfg.name } {/*- { fileCfg.size } (bytes)*/}
        </div>
        <div className="App-attachment-deleteButton">
            <DeleteOutlinedIcon className="App-attachment-iconDelete" fontSize="small"/> Удалить
        </div>
    </div>
}

class FileList extends Component {

    render() {
        const attachedFiles = this.props.files
        const attachedFilesList = attachedFiles.map( fileCfg => {
            return FileInfo(fileCfg, uniqueId())
        })

        return <div className="App-attachmentContainer">
                { attachedFilesList }
            </div>
    }
}

export default FileList

FileList.propTypes = {
    files: PropTypes.array.isRequired,
}