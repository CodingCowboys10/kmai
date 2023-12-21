import Image from "next/image";
import profilePic from './ico/chat-bot.png'
interface chatAnswerProps{
    isGenerated:boolean,
    text:string,
}

function ChatMessage({ isGenerated, text }: chatAnswerProps){
    return (
        <div className={`w-full flex ${isGenerated ? 'justify-start' : 'justify-end' } `}>
            <div className={`break-all w-fit p-3 rounded-xl shadow-lg border-none ${isGenerated ? 'bg-[--message-Q] text-left' : 'bg-[--message-A] text-right'}`}>
               {text}
            </div>
        </div>
    );
}

export default ChatMessage;