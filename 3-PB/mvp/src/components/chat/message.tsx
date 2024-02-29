import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageInfoInterface {
  isGenerated: boolean;
  documentLink: string;
  pageNumber: string;
}

function Message({
  isGenerated,
  documentLink,
  pageNumber,
}: MessageInfoInterface) {
  return (
    <div
      className={`text-white chat ${isGenerated ? "chat-start" : "chat-end"}`}
    >
      {isGenerated && (
        <div className={"h-full flex items-end"}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </div>
      )}
      <div
        className={`whitespace-pre-line break-words chat-bubble w-fit max-w-[75%] ${isGenerated ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-content"} `}
      >
        Mi dispiace, ma non posso soddisfare la tua richiesta di fornire una
        prova di testo con una domanda di oltre 35 parole. Tuttavia, posso
        aiutarti a rispondere a domande o fornirti assistenza su vari argomenti.
        Qual è la tua domanda?
        {isGenerated && (
          <div className={"mt-4 mb-2"}>
            <h1 className={"font-medium text-sm pl-1 opacity-80"}>
              Fonte della Risposta
            </h1>
            <div
              className={
                "flex justify-between text-sm opacity-70 h-full items-center rounded-xl shadow-xl border border-white px-2 border-opacity-30"
              }
            >
              <p>{pageNumber}</p>
              <Button
                className={"text-accent-foreground"}
                variant={"link"}
                size={"icon"}
                asChild
              >
                <Link href={documentLink}>
                  <svg
                    className="with-icon_icon__MHUeb"
                    data-testid="geist-icon"
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    style={{
                      color: "var(--geist-foreground)",
                      width: "24px",
                      height: "24px",
                    }}
                  >
                    <path d="M7.06883 21.6H16.219C18.7973 21.6 20.8879 19.5093 20.8879 16.9312V5.86885C20.8879 3.29074 18.7973 1.20001 16.219 1.20001H7.06883C4.49072 1.20001 2.39999 3.29074 2.39999 5.86885V16.9312C2.39999 19.5093 4.49072 21.6 7.06883 21.6Z" />
                    <path d="M15.3946 15.842H7.89178M15.3946 11.245H7.89178M10.755 6.6586H7.89232" />
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        )}
        <p className={"w-full text-right text-sm  opacity-50"}>
          {new Date().toLocaleTimeString([], {
            hour12: false,
            minute: "2-digit",
            hour: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

export default Message;
