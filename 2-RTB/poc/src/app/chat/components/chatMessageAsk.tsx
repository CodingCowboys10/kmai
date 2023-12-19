import Image from "next/image";
import profilePic from './ico/utente.png'
interface chatAskProps{
    text:string
}


function ChatMessageAsk({text}:chatAskProps){
    return (
        <div className="p-1.5 ml-5 flex flex-row-reverse">
            <Image
                className="h-12 w-12"
                src={profilePic}
                alt=""
                width={50}
                height={50}
            />
            <div className="p-3 ml-auto bg-sky-400 rounded-2xl">
                {text}
            </div>
        </div>
    );
}

export default ChatMessageAsk;