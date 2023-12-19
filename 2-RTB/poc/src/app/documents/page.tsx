import Link from "next/link";
import UploadDoc from "./components/uploadDoc";
import ListDoc from "./components/listDoc";

export default function Page(){
    return (
        <main id='root' className="flex flex-col gap-5">
            <div className="flex flex-row justify-between ">
            <Link className="w-fit h-fit bg-blue-500 font-medium rounded-xl p-3
          hover:scale-105 hover:shadow-2xl animation duration-300 ease-out " href="/chat">
                <button className="text-[--text-button]">
                    Chat
                </button>
            </Link>
            <UploadDoc/>
            </div>
            <ListDoc />
        </main>
    )
}