import React from 'react'
import {connect} from 'react-redux'
import { addAttach } from '../ac'

const FileInfo = fileCfg => {
    // fixme generate uniqKey
    return <div className="App-attachment">
        { fileCfg.name } - { fileCfg.size } (bytes)
    </div>
}

class Fileinput extends React.Component {
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
        const indexFile = countFiles - 1 // == 0

        const sizeFile = ev.target.files[indexFile].size
//      console.log(sizeFile > size1Mb ? Math.round( sizeFile / size1Mb) : sizeFile)
        if(ev.target.files[indexFile].size > 30000/*size5Mb */){
            alert("File is too big!");

           ev.target.value=""
        } else {

            let file = ev.target.files[indexFile];
            const reader = new FileReader();
            /*
             * fileCfg object
             * name: string,
             * size: number,
             * data: base64
                               {
                                    "name" : "имя файла",
                                    "content": "содержимое файла закодированное base64",
                                    "encoding" : "base64",
                                }
             * */
            reader.onload = (event) => {
                this.props.addAttachment({
                    name: file.name,
                    size: file.size,
                    content: window.btoa(event.target.result)
                })
            };
            reader.readAsBinaryString(file);// readAsText
        }
    }

    render(){
        const attachedFilesList = this.props.attachedFiles.map( fileCfg => FileInfo(fileCfg) )

        return <div>
            <input type="file" onChange={this.handleChange}/>{/*multiple*/}

            { attachedFilesList.length ? attachedFilesList : 'no attach' }
        </div>
    }
}

const mapDispatchToProps = (dispatch) => ({
    addAttachment:  (fileCfg) => dispatch(addAttach(fileCfg)),
})

export default connect(null, mapDispatchToProps)(Fileinput);

Fileinput.defaultProps = {
    attachedFiles: [],
}
