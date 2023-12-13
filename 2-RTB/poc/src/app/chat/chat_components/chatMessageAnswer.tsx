
interface chatAnswerProps{
    text:string
}

function ChatMessageAnswer({text}:chatAnswerProps){
    return (
        <>
            <div style={{backgroundColor: "#90EE90"}}>
                ChatMessageAnswer : {text}
            </div>
        </>
    );
}

export default ChatMessageAnswer;