'use client'
import Link from "next/link";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})


export default function Page() {
    const btn =`text-2xl flex flex-row justify-evenly gap-5 mx-auto w-6/12 lg:w-4/12 border-2 rounded-2xl shadow-2xl dark:shadow-xl
    transition duration-300 ease-out hover:scale-105 p-3 bg-[--primary] border-[--primary] `

    return (
        <main className={`${roboto.className} lg:flex-row flex-col justify-between  `}>
            <h1 className="lg:text-6xl text-5xl py-6 my-auto mx-auto font-medium lg:text-left text-center dark:text-sky-50 text-blue-950 ">
                <span className=" font-bold text-sky-500 gradient-blue">K</span>nowledge <span
                className="  font-bold text-sky-500 gradient-blue">M</span>anagement<span className="font-bold lg:text-8xl text:3xl text-sky-500 gradient-blue"> AI</span></h1>
            <div className="flex flex-col-reverse justify-center gap-20 h-full w-full rounded-xl shadow-2xl bg-[--background-contrast]  ">
                
                <Link className={btn} href="documents">
                    <button>
                         <i className=" text-[--text-button] my-10 fa-solid fa-database fa-2xl"></i>
                    </button>
                </Link>


                <Link className={btn} href="chat">
                    <button >
                         <i className=" text-[--text-button] my-10 fa-solid fa-comments fa-2xl"></i>

                    </button>
                </Link>

            </div>

        </main>
    )
}