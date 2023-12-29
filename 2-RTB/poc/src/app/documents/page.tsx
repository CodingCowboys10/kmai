import Link from "next/link";
import UploadDoc from "./components/uploadDoc";
import ListDoc from "./components/listDoc";
import DocMenu from "./components/docMenu";
import React from "react";

export default function Page(){
    return (
            <main id='root' className=" overflow-hidden relative flex flex-row bg-[--background-contrast]  h-full gap-2 ">
                <DocMenu/>
                <div className="flex flex-col relative w-full gap-1 ">
                    <div className='flex flex-row w-full justify-between text-center p-1 gap-2 rounded-xl'>
                        <div className='grid grid-cols-5 gap-5 ' >
                            <button type='button'
                                    className="w-full border-2 border-[--background-contrast] rounded-xl hover:border-2 hover:border-[white]">Modello
                                1
                            </button>
                            <button type='button'
                                    className="w-full border-2 border-[--background-contrast] rounded-xl hover:border-2 hover:border-[white]">Modello
                                2
                            </button>
                            <button type='button'
                                    className="w-full border-2 border-[--background-contrast] rounded-xl hover:border-2 hover:border-[white]">Modello
                                3
                            </button>
                            <button type='button'
                                    className="w-full border-2 border-[--background-contrast] rounded-xl hover:border-2 hover:border-[white]">Modello
                                4
                            </button>
                            <button type='button'
                                    className="w-full border-2 border-[--background-contrast] rounded-xl hover:border-2 hover:border-[white]">Modello
                                5
                            </button>
                        </div>
                    </div>

                    <ListDoc/>
                </div>

            </main>
    )
}