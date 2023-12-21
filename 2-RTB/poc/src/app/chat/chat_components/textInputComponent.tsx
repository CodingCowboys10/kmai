import {FormEvent, useState} from "react";

interface InsertProps{
    input: string;
    handleInputChange: (e: any) => void;
    sendMessage: (e: FormEvent<HTMLFormElement>) => void;
}
function TextInputComponent({ input, handleInputChange, sendMessage }: InsertProps){

    return(
        <div className="insert relative m-2 " >
            <form onSubmit={sendMessage} >
                <textarea
                    id="questionArea"
                    className="w-full rounded-2xl p-2 shadow-xl pr-28 resize-none"
                    rows={3}
                    placeholder="Inserisci una domanda ..."
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {if (e.key === 'Enter'){
                        e.preventDefault();
                        sendMessage(e);
                    }}}
                ></textarea>
                <button className="button absolute right-4 top-5" type="submit">Send</button>
            </form>
        </div>
    );
}

export default TextInputComponent;