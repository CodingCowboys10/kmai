import Link from "next/link";


export default function Page() {
    return (
        <main id="root">
            <div className="grid gap-20 grid-cols-2">
                <Link href="/documentazione">
                    <div className="border-white border-2 rounded-2xl border-opacity-20 p-5 ">
                        <h1 className="text-4xl text-white">Doc</h1>
                    </div>
                </Link>


                <Link href="/chat">
                    <div className="border-white border-2 rounded-2xl border-opacity-20 p-5 ">
                        <h1 className="text-4xl text-white">Chat</h1>
                    </div>
                </Link>




            </div>

        </main>
    )
}