import Link from "next/link";
import Chatbot from "@/app/chat/components/chatbot";

export default function Page() {
  return (
      <main className="w-full">
          <Link className="w-fit bg-blue-500 text-lg rounded-lg p-3 text-black
          hover:scale-105 hover:shadow-2xl animation duration-300 ease-out hover:ease-in " href="/documents">
              <button className="text-left">
                  Archivio
              </button>
          </Link>

          <Chatbot/>
      </main>
  )
}