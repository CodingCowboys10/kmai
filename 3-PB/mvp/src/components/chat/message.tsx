import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getDocumentContentController } from "@/lib/config/container";

type MessageInfoInterface = {
  messageText: string;
  time: string;
} & (
  | {
      isGenerated: true;
      documentLink: string;
      pageNumber: string;
    }
  | { isGenerated: false }
);

function Message(props: MessageInfoInterface) {
  const handleShowDoc = async (name: string) => {
    const res = await getDocumentContentController.handle(name, "Ollama");
    const url = await res.json();
    window.open(url.url, "_blank");
  };
  return (
    <div
      className={`text-white chat ${props.isGenerated ? "chat-start" : "chat-end"}`}
    >
      {props.isGenerated && (
        <div className={"h-full flex items-end"}>
          <Avatar>
            <AvatarImage className={"dark:invert"} src="/ollama.svg" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </div>
      )}
      <div
        className={`whitespace-pre-line break-words chat-bubble w-fit max-w-[60%] ${props.isGenerated ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-content"} `}
      >
        {props.messageText}
        {props.isGenerated && (
          <Alert className={"mt-5"}>
            <AlertTitle>Fonte della Risposta</AlertTitle>
            <AlertDescription>
              <div
                className={
                  "flex justify-between text-sm h-full items-center px-2 "
                }
              >
                <p>Pag. {props.pageNumber}</p>
                <Button
                  className={"text-accent-foreground"}
                  variant={"link"}
                  size={"icon"}
                  asChild
                  onClick={() => handleShowDoc(props.documentLink)}
                >
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
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <p className={"w-full text-right text-sm  opacity-50"}>{props.time}</p>
      </div>
      {!props.isGenerated && (
        <div className={"h-full flex items-end"}>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className={"text-foreground font-medium"}>
              TU
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
}

export default Message;
