import {green} from "next/dist/lib/picocolors";

interface chatAskProps{
    text:string
}


function ChatMessageAsk({text}:chatAskProps){
    return (
        <>
            <div style={{backgroundColor : "#87CEFA"}}>
                ChatMessageAsk : {text}
            </div>
        </>
    );
}

export default ChatMessageAsk;