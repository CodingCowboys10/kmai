import Link from "next/link";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})


export default function Page() {
    const btn =`text-2xl flex flex-row justify-evenly gap-5 p-10 py-8 mx-auto w-4/12 h-full border-2 rounded-2xl
    transition duration-300 ease-out hover:scale-105 shadow-2xl p-3 text-[--text-button] bg-[--primary] border-[--primary] `

    return (
        <main className={`${roboto.className} flex-row justify-between  `}>
            <h1 className="text-6xl my-auto mx-auto font-medium text-left dark:text-sky-50 text-blue-950 ">
                <span className="font-bold text-sky-500 gradient-blue">K</span>nowledge <span
                className="font-bold text-sky-500 gradient-blue">M</span>anagement<span className="font-bold text-8xl text-sky-500 gradient-blue"> AI</span></h1>
            <div className="flex flex-col-reverse justify-center gap-10 h-full w-full rounded-2xl shadow-2xl bg-[--background-contrast]  ">
                
                <Link href="/documents">
                    <button className={btn}>
                         <i className=" my-10 fa-solid fa-database fa-2xl"></i>
                    </button>
                </Link>


                <Link href="/chat">
                    <button className={btn}>
                         <i className=" my-10 fa-solid fa-comments fa-2xl"></i>

                    </button>
                </Link>

            </div>

        </main>
    )
}