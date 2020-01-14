import React from 'react';
import FileInput from "./fileinput";
import Textinput from "./textinput";
import Label from "./label";
import {connect} from 'react-redux'
import { uniqueId } from '../util'
import { addAttach } from "../ac"
import DragAndDrop from './draganddrop'
import { INPUTS_CONFIG } from '../constants'

class Formbox extends React.Component {
    constructor(props) {
        super(props);

        this.refInputs = INPUTS_CONFIG.map(() => React.createRef());
        this.refInputs.push( React.createRef() ); // ref for textarea

        this.state = {
            inputValues: INPUTS_CONFIG.map(() => ''),
            textValue: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLoadFile = (file) => {
        const reader = new FileReader();
        /*
         * fileCfg object
         * name: имя файла [string],
         * size: размер в байтах [number],
         * content: содержимое файла, закодированное base64

                           + "encoding" : "base64"
         * */
        reader.onload = (event) => {
            this.props.addAttachment({
                name: file.name,
                size: file.size,
                content: event.target.result.replace(/^data:.+;base64,/, '')
            })
        };

        try {
            reader.readAsDataURL(file)
        } catch(e){
            console.log('ERROR: ', e)
        }
    }

    handleSubmit(ev) {
        /* магические индексы */
        const MAGIC_REF_INDEXES = [
            /* Тема письма */ 4,
            /* Имя отправителя */ 0,
            /* Адрес отправителя (email) */ 1,
            /* Имя получателя */ 2,
            /* текстовая версия письма */ 5,
            /* Адрес получателя (email) */ 3
        ]

        let requestObject = {
            "action" : "issue.send.test",
            "letter" : {
                "subject" : this.refInputs[MAGIC_REF_INDEXES[0]].current.value,
                "from.name" : this.refInputs[MAGIC_REF_INDEXES[1]].current.value,
                "from.email" : this.refInputs[MAGIC_REF_INDEXES[2]].current.value,
                "to.name" : this.refInputs[MAGIC_REF_INDEXES[3]].current.value,
                "message": { "text" : this.refInputs[MAGIC_REF_INDEXES[4]].current.value },
                "attaches": this.props.attachedFiles
            },
            "sendwhen": "test",
            "mca": [
                this.refInputs[MAGIC_REF_INDEXES[5]].current.value,
            ]
        }

        console.log("Submitted data: ", requestObject )
    }

    render(){
        const inputs = INPUTS_CONFIG.map( (cfg, index) => <Textinput {...cfg}
                                                                     value={this.state.inputValues[index]}
                                                                     refInput={this.refInputs[index]}
                                                                     key={ uniqueId() } />)
        const lastRefIndex = this.refInputs.length - 1

        return  <DragAndDrop handleDrop={this.handleLoadFile}>
                {inputs}

                <Label label="Сообщение"/>
                <textarea className="App-textArea"
                          defaultValue={ this.state.textValue }
                          ref={ this.refInputs[lastRefIndex] }
                         />

                <FileInput attachedFiles={ this.props.attachedFiles }
                           handleLoadFile={ this.handleLoadFile } />

                <input type="button" value="Отправить" className="App-submitBtn" onClick={this.handleSubmit}/>
        </DragAndDrop>
    }
}

const mapStateToProps = (state) => ({ attachedFiles: state.attachedFiles })
const mapDispatchToProps = (dispatch) => ({
    addAttachment:  (fileCfg) => dispatch(addAttach(fileCfg)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Formbox)