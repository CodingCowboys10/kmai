import Link from "next/link";
import UploadDoc from "./components/uploadDoc";
import ListDoc from "./components/listDoc";

export default function Page(){
    return (
        <main id='root'>
            <button className="absolute top-0 left-0 ms-1 mt-1">
                <Link href="/chat">Chatbot</Link>
            </button>
            <UploadDoc />
            <ListDoc />
        </main>
    )
}