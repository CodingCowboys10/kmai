"use client"
import Chat from "./chat"
import Insert from "./insert";
import Menu from "./menu";
import { useState } from 'react';

function Chatbot (){

	const [Stop, setStop] = useState(false);
    const [Model, setModel] = useState(0);
    const [PointList,setPointList] = useState<{request: string; answer: string;}[]>([]);

    const addPointList = (request: string, answer: string) =>{
        let point = {
            request : request,
            answer : answer
        }
        setPointList([...PointList,point]);
    }

    const Request = async (text: string) => {
        if(!Stop) {
            setStop(true);
            const tempList = PointList;
            let answer = "...";
            addPointList(text, answer);
             answer =  await fetch("/api", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    question: text,
                    model: Model
                }),
            }).then((res) => res.json()).then((data) => data.answer).catch((e) => console.log(e));

            //let answer = `risposta domanda : ${text}`  //inserire risposta chatbot (creare components back-end per interagire)

            setPointList(tempList);
            addPointList(text,  answer);
            setStop(false);
        }
    }

    function handleClickClearChat() {
        setPointList([]);
    }

    function handleClickMenu(num: number){
        setModel(num);
    }

    return(
        <div className="flex flex-row h-max ">

            <div className="flex flex-col w-max">

                <div className="relative">
                    <Chat list={PointList}></Chat>
                    <button className="clear absolute top-5 right-10" style={{fontSize:"1.15em"}} onClick={handleClickClearChat}>Clear chat</button>
                </div>


                <div className="flex flex-row-reverse">
                    <Insert Request = {Request}></Insert>
                </div>



            </div>

            <Menu model={Model} handleClickMenu={handleClickMenu}></Menu>

        </div>
    );
}

export default Chatbot;
