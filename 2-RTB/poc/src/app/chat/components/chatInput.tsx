import { useState } from 'react';

interface InsertProps{
    Request: (text: string) => void;
}
function ChatInput({Request}: InsertProps){


    const [newQuestion, setNewQuestion] = useState('');

    function handleClick(){
        if(!(newQuestion === '')) {
            Request(newQuestion);
            setNewQuestion('');
        }
    }

    return (
        <div className="w-full h-1/12 relative">
            <textarea
                id="questionArea"
                className="rounded-2xl p-3 pt-4 shadow-xl pr-16 resize-none w-full outline-none text-[--text]"
                rows={3}
                placeholder="Inserisci una domanda ..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleClick();
                    }
                }}
            >
            </textarea>
            <button
                className="absolute right-0 top-1 p-2 m-3 bg-[--primary] dark:bg-[--background] text-[--text-button] rounded-md shadow-xl w-10 h-fit border-white border-2 border-opacity-5
                hover:border-opacity-30 transition duration-300 ease-in-out hover:scale-110 hover:shadow-2xl"
                onClick={handleClick}>
                <i className=" dark:text-[--primary] fa-solid fa-arrow-right"></i>
            </button>


        </div>

    );
}

export default ChatInput;