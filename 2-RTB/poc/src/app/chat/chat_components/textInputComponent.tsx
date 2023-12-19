import { FormEvent } from "react";
//import { useState } from 'react';

interface InsertProps{
    //Request: (text: string) => void;
    input: string;
    handleInputChange: (e: any) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
function TextInputComponent({ input, handleInputChange, handleSubmit }: InsertProps){

    // const [newQuestion, setNewQuestion] = useState('');
    // function handleClick(){
    //     if(!(newQuestion === '')) {
    //         Request(newQuestion);
    //         setNewQuestion('');
    //     }
    // }

    return(
        // <div className="insert relative m-2 " >
        //     <textarea
        //         id="questionArea"
        //         className="w-full rounded-2xl p-2 shadow-xl pr-28 resize-none"
        //         rows={3}
        //         placeholder="Inserisci una domanda ..."
        //         value={newQuestion}
        //         onChange={(e) => setNewQuestion(e.target.value)}
        //         onKeyDown={(e) => {if (e.key === 'Enter'){
        //             e.preventDefault();
        //             handleClick();
        //         }}}
        //     ></textarea>
        //     <button className="button absolute right-4 top-5" onClick={handleClick}>Send</button>
        // </div>
        <div className="insert relative m-2 " >
            <form onSubmit={handleSubmit} >
                <textarea
                    id="questionArea"
                    className="w-full rounded-2xl p-2 shadow-xl pr-28 resize-none"
                    rows={3}
                    placeholder="Inserisci una domanda ..."
                    value={input}
                    onChange={handleInputChange}
                    // onKeyDown={(e) => {if (e.key === 'Enter'){
                    //     e.preventDefault();
                    //     handleSubmit();
                    // }}}
                ></textarea>
                <button className="button absolute right-4 top-5" type="submit">Send</button>
            </form>
        </div>
    );
}

export default TextInputComponent;