"use client"
import Link from "next/link";
import Chatbot from "./chat_components/chatbot";

export default function Page() {

    const [model_name,setModel_name] = useState("openAi")
    const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        headers: {
            "Content-type": "text/html"
        },
        body: {
            model_name: model_name
        }
    });
   
    const clearChat = () => {
        setMessages([]);
    }

    async function sendMessage(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (!messages.length) {
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        if (isLoading) {
            return;
        }
        handleSubmit(e);
    }
  return (
      <main id="root">
        <button className="absolute top-0 left-0 ms-1 mt-1">
          <Link href="/documents">Documents</Link>
        </button>
        <Chatbot/>
      </main>
  )
}