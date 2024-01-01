import React, { useState } from 'react';
interface chatAnswerProps{
    isGenerated:boolean,
    text:string,
    model: string ,
}

function ChatMessage({ isGenerated, text , model }: chatAnswerProps){
    const [currentModel] = useState(model);

    return (

        <div className={`relative w-full flex ${isGenerated ? 'justify-start' : 'justify-end' } `}>
            <div className={`whitespace-pre-line flex flex-col break-all w-fit p-3 py-4 rounded-xl shadow-lg border-none ${isGenerated ? 'bg-[--message-Q] text-left  ' : 'bg-[--message-A] text-right '}`}>
                {text}
                {isGenerated && (<p className="italic h-fit w-full text-right opacity-40">{currentModel}</p>)}</div>
        </div>
    );
}

export default ChatMessage;