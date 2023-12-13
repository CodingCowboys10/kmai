import { useState } from 'react';
import {Properties} from "csstype";

interface InsertProps{
    Request: (text: string) => void;
}
function Insert ({Request}: InsertProps){

    const [newQuestion, setNewQuestion] = useState('');

    function handleClick(){
        if(!(newQuestion === '')) {
            Request(newQuestion);
            setNewQuestion('');
            // if (questionAreaRef.current) {
            //     questionAreaRef.current.value = '';
            // }
        }
    }

    const containerStyle : Properties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minWidth: '60em',
        maxWidth: '60em',
    };

    const buttonStyle: Properties ={
        marginTop: '1em',
        marginBottom: '1em',
        marginLeft: '1em',
        fontSize:'1.15em',
    };
    const textAreaStyle: Properties = {
        minWidth : '46.35em',
        resize: "none",
        marginTop: "1em",
        marginBottom: "1em",
        padding : "0.5em",
        borderRadius:  "8px",
        fontSize:"1.15em",
    };

    return (
        <div className="insert" style={containerStyle}>
            <textarea
                id="questionArea"
                rows={3}
                style={textAreaStyle}
                placeholder="Inserisci una domanda ..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                onKeyDown={(e) => {if (e.key === 'Enter'){
                    e.preventDefault();
                    handleClick();
                }}}
            ></textarea>
            <button className="button" onClick={handleClick} style={buttonStyle}>Send</button>
        </div>
    );
}

export default Insert;