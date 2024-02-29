import ChatForm from "@/components/chat/chatForm";
import ChatMessages from "@/components/chat/chatMessages";

function ChatBody() {
  return (
    <div
      className={"flex flex-col min-h-screen w-full p-2 gap-0.5 items-center"}
    >
      <ChatMessages></ChatMessages>
      <ChatForm></ChatForm>
    </div>
  );
}
export default ChatBody;
