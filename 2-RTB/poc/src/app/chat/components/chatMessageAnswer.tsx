import Image from "next/image";
import profilePic from './ico/chat-bot.png'
interface chatAnswerProps{
    text:string
}

function ChatMessageAnswer({text}:chatAnswerProps){
    return (
        <div className="p-1.5 mr-5 flex">
            <Image
                className="h-10 w-10"
                src={profilePic}
                alt=""
                width={50}
                height={50}
            />
            <div className="flex-row mr-auto p-3 bg-green-400 rounded-2xl">
               {text}
            </div>
        </div>
    );
}

export default ChatMessageAnswer;