import Link from "next/link";


export default function Page() {
    return (
        <main id="root">
            <div className="grid gap-80 grid-cols-2 h-full">
                <Link href="/documentazione">
                    <button className="w-full border-white border-2 rounded-2xl border-opacity-20 p-7 cursor-pointer">
                        <i className="fa-solid fa-database fa-2xl"></i>
                        <p className="text-2xl mt-5">Archivio Documenti</p>
                    </button>
                </Link>


                <Link href="/chat">
                    <button className=" w-full border-white border-2 rounded-2xl border-opacity-20 p-7 cursor-pointer">
                        <i className="fa-solid fa-comments fa-2xl"></i>
                        <p className="text-2xl mt-5">Chat</p>
                    </button>
                </Link>


            </div>

        </main>
    )
}