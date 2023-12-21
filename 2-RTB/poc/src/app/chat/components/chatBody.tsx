import React , {useRef, useEffect} from "react";
import ChatMessage from "@/app/chat/components/chatMessage";

interface chatMessage{
    id : number,    // 0 == ask / 1 == answer
    text : any
}

interface ChatProps {
    list: chatMessage[];
    clearChat : () => void;
}
function ChatBody({list,clearChat}:ChatProps) {


    const chatboxRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        chatboxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [list]);

    return (
        <>

            <div className={`${list.length == 0 ? "justify-around" : "" } overflow-scroll h-full rounded-2xl p-2 mb-5 text-center flex flex-col`}>

                {list.length ==0 && (<div className="text-[--text] opacity-70 font-medium text-2xl mt-32 transition duration-300 ease-in">Ancora nessun Messaggio</div>)}

                <div className="flex flex-col ">
                    {list.map((value, index) => (
                    <React.Fragment key={index}>
                        {value.id === 0 && (<ChatMessage isGenerated={false} text={value.text}/>)}
                        {value.id === 1 && (<ChatMessage isGenerated={true} text={value.text}/>)}
                    </React.Fragment>
                ))}</div>

                {list.length!=0 && (<button className="text-xl p-2 " onClick={clearChat}>
                    <i className="py-2 rounded-2xl w-10/12 text-center bg-[--background-contrast] fa-solid fa-broom"></i>
                </button>)}
                <div ref={chatboxRef}></div>
            </div>

        </>
    );
}

export default ChatBody;
