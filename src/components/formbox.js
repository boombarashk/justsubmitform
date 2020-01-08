import React from 'react';
import Fileinput from "./fileinput";
import Textinput from "./textinput";
import Label from "./label";
import {connect} from 'react-redux'

class Formbox extends React.Component {
    constructor(props) {
        super(props);

        // fixme move to constants
        this.inputsData = [{
                label: "От кого",
                placeholder: "Имя",
                type: 'text',
                half: true
            }, {
                label: null,
                placeholder: "Email",
                type: 'email',
                half: true
            },
            {
                label: "Кому",
                placeholder: "Имя",
                type: 'text',
                half: true
            }, {
                label: null,
                placeholder: "Email",
                type: 'email',
                half: true
            }, {
                label: "Тема письма",
                type: 'text',
                half: false
            }];
        this.refInputs = this.inputsData.map(() => React.createRef());
        // ref for textarea
        this.refInputs.push( React.createRef() );

        this.state = {
            inputValues: this.inputsData.map(() => ''),
            textValue: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
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

        // fixme generate uniqKey
        const inputs = this.inputsData.map( (cfg, index) => <Textinput {...cfg}
                                                                       value={this.state.inputValues[index]}
                                                                       refInput={this.refInputs[index]}
        />)
        const lastRefIndex = this.refInputs.length - 1

        return  <>
                {inputs}

                <Label label="Сообщение"/>
                <textarea className="App-textArea"
                          defaultValue={ this.state.textValue }
                          ref={ this.refInputs[lastRefIndex] }
                         />

                <Fileinput attachedFiles={ this.props.attachedFiles }/>

                <input type="button" value="Отправить" onClick={this.handleSubmit}/>
        </>
    }
}

const mapStateToProps = (state) => ({ attachedFiles: state.attachedFiles })

export default connect(mapStateToProps)(Formbox)