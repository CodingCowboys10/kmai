interface MessageInfoInterface {
  isGenerated: boolean;
}

function Message({ isGenerated }: MessageInfoInterface) {
  return (
    <div className={`chat ${isGenerated ? "chat-start" : "chat-end"}`}>
      <div
        className={`whitespace-pre-line break-all chat-bubble w-fit max-w-[75%] ${isGenerated ? "bg-blue-800" : "bg-secondary"} `}
      >
        Mi dispiace, ma non posso soddisfare la tua richiesta di fornire una
        prova di testo con una domanda di oltre 35 parole. Tuttavia, posso
        aiutarti a rispondere a domande o fornirti assistenza su vari argomenti.
        Qual è la tua domanda?
      </div>
    </div>
  );
}

export default Message;
