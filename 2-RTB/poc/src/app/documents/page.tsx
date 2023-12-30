"use client"
import ListDoc from "./components/listDoc";
import DocMenu from "./components/docMenu";
import React, {useState} from "react";
import LlmBody from "@/app/chat/components/llmBody";

export default function Page(){
    const [model_name,setModel_name] = useState("openAi")

    const updateModel = (newModelName: string) => {
        setModel_name(newModelName);
    }

    return (
            <main id='root' className=" overflow-hidden relative flex flex-row  h-full gap-2 ">
                <DocMenu/>
                <div className="flex flex-col relative w-full gap-1 px-2  ">
                   <LlmBody
                       classProp="flex flex-row w-fit gap-2 bg-[--background-contrast] p-2 rounded-xl"
                       updateModel={updateModel}
                   />
                    <ListDoc/>
                </div>

            </main>
    )
}