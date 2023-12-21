"use client"
import Link from "next/link";
import React, {useState} from "react";
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

          <div className="flex flex-row w-full h-full justify-around">

              <div className="w-3/12">
                  <Link className="" href="/documents">
                      <button className="w-fit h-fit bg-[--primary] m-0  font-medium rounded-xl p-3
          hover:scale-105 hover:shadow-2xl animation duration-300 ease-out  text-[--text-button]">
                          Archivio
                      </button>
                  </Link>
              </div>

              <div className="flex flex-col w-6/12">
                  <ChatBody list={listElementChat} clearChat={clearChat}></ChatBody>
                  <ChatInput Request={Request}/>
              </div>
              <div className=" w-3/12 h-full">
                  {listElementChat.length!=0 && (<button className="text-xl p-2 " onClick={clearChat}>
                      <i className="py-2 rounded-2xl w-10/12 text-center bg-[--background-contrast] fa-solid fa-broom"></i>
                  </button>)}
              </div>
          </div>
      </main>
  )
}