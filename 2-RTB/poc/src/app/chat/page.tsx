"use client"
import Link from "next/link";
import {useState} from "react";
import ChatBody from "@/app/chat/components/chatBody";
import ChatInput from "@/app/chat/components/chatInput";

interface chatMessage{
    id : number,    // 0 == ask / 1 == answer
    text : any
}
export default function Page() {

    const [listElementChat,setListElementChat] = useState<chatMessage[]>([])
    const [Stop, setStop] = useState(false);

    function createQuestion(text : string){
        let element : chatMessage  = {
            id: 0,
            text : text
        };
        return element;
    }

    function createAnswer(text : any){
        let element : chatMessage  = {
            id: 1,
            text : text
        };
        return element;
    }

    const clearChat = () => {
        setListElementChat([]);
    }

    const Request = (text: string) => {
        if(!Stop) {
            setStop(true);

            const question = createQuestion(text);
            setListElementChat([...listElementChat,question]);



            const answer = createAnswer(<div>risposta : {text}</div>)
            setListElementChat([...listElementChat,question,answer]);
            setStop(false);
        }
    }
  return (
      <main className="w-full">
          <Link className="w-fit bg-blue-500 text-lg rounded-lg p-3 text-black
          hover:scale-105 hover:shadow-2xl animation duration-300 ease-out hover:ease-in " href="/documents">
              <button className="text-left">
                  Archivio
              </button>
          </Link>
          <div className="flex flex-row w-full h-full justify-around">

              <div className="flex flex-col w-6/12">
                  <ChatBody list={listElementChat} clearChat={clearChat}></ChatBody>
                  <ChatInput Request={Request}/>
              </div>
          </div>
      </main>
  )
}