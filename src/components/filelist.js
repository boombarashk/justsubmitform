import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { uniqueId } from '../util'
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { connect } from 'react-redux'
import { deleteAttach } from "../ac";

const FileInfo = (fileCfg, id, handleDelete) => {
    return <div className="App-attachment" data-name={ fileCfg.name } key={ id }>
        <div className="App-attachment-label">
            <AttachmentOutlinedIcon className="App-attachment-iconAttach App-attachment-iconAttach_large" fontSize="large"/>
            { fileCfg.name } {/*- { fileCfg.size } (bytes)*/}
        </div>
        <div className="App-attachment-deleteButton" onClick={() => { handleDelete(fileCfg.name) }}>
            <DeleteOutlinedIcon className="App-attachment-iconDelete" fontSize="small"/> Удалить
        </div>
    </div>
}

class FileList extends Component {

    render() {
        const { files } = this.props
        const attachedFilesList = files.map( fileCfg => {
            return FileInfo(fileCfg, uniqueId(), this.props.deleteAttachment)
        })

        return <div className="App-attachmentContainer">
                { attachedFilesList }
            </div>
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteAttachment:  (name) => dispatch(deleteAttach(name)),
})

export default connect(null, mapDispatchToProps)(FileList)

FileList.propTypes = {
    files: PropTypes.array.isRequired,
}