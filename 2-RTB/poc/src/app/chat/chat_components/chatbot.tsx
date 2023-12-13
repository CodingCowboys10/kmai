"use client"
import Chat from "./chat"

function Chatbot (){

    return(
        <div className="flex flex-row h-max ">

            <div className="flex flex-col w-max">

                <div className="relative">
                    <Chat></Chat>
                </div>


            </div>

        </div>
    );
}

export default Chatbot;
