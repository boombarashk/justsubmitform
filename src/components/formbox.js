import React from 'react';
import Textinput from "./textinput";
import Label from "./label";

export default class Formbox extends React.Component {

    render(){
        let inputsData = [{
            label: "От кого",
            placeholder: "Имя",
            type: 'text',
            half: true
        },
            {
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
        },
            {
            label: null,
            placeholder: "Email",
            type: 'email',
            half: true
        },
            {
            label: "Тема письма",
            type: 'text',
            half: false
        }]

        const inputs = inputsData.map(cfg => <Textinput {...cfg}/>)

        return  <>
            {inputs}

            <Label label="Сообщение"/>
            <textarea className="App-textArea"/>
        </>
    }
}