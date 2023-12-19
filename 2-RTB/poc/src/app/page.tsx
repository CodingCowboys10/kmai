import Link from "next/link";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})


export default function Page() {
    return (
        <main className={`${roboto.className} justify-around `}>
            <h1 className="text-6xl mx-auto font-medium "><span className="font-bold text-sky-500 gradient-blue">K</span>nowledge <span
                className="font-bold text-sky-500 gradient-blue">M</span>anagement <span
                className="font-bold text-sky-500 gradient-blue">AI</span></h1>
            <div className="grid grid-cols-2 gap-20 px-12">
                
                <Link href="/documents">
                    <button className="text-2xl flex flex-col justify-evenly gap-5 h-full w-full border-white border-2 rounded-2xl border-opacity-20
                    transition duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:border-cyan-600 p-3">
                        <span className="gradient-blue h-20"> <i className="mt-10 fa-solid fa-database fa-2xl"></i></span>
                        <p className="text-2xl mt-3 ">Archivio Documenti</p>
                    </button>
                </Link>


                <Link href="/chat">
                    <button className="text-2xl flex flex-col justify-evenly gap-5 w-full h-full border-white border-2 rounded-2xl border-opacity-20
                    transition duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:border-cyan-600 p-3">
                        <span className="gradient-blue h-20"> <i className=" mt-10 fa-solid fa-comments fa-2xl"></i></span>
                        <p className="text-2xl my-3"><span>Chat</span></p>
                    </button>
                </Link>


            </div>

        </main>
    )
}