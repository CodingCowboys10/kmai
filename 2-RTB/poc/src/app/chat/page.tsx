import Link from "next/link";
import Chatbot from "./chat_components/chatbot";

export default function Page() {
  return (
      <main id="root">
        <button className="absolute top-0 left-0 ms-1 mt-1">
          <Link href="/documents">Documents</Link>
        </button>
        <Chatbot/>
      </main>
  )
}