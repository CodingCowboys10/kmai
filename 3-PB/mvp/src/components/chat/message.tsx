import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useModel } from "@/providers/model-provider";
import { getDocumentContent } from "@/serverActions/document/getDocumentContent";
import { toast } from "sonner";

type MessageInfoInterface = {
  messageText: string;
  time: Date;
} & (
  | {
      isGenerated: true;
      documentLink: string;
      pageNumber: string;
    }
  | { isGenerated: false }
);

function Message(props: MessageInfoInterface) {
  const { model } = useModel();

  const handleShowDoc = async (name: string, page: string) => {
    try {
      const url = await getDocumentContent(name, model!);
      console.log(url);
      window.open(url + `#page=${page}`, "_blank");
    } catch (e) {
      // @ts-ignore
      toast.error(e.message);
    }
  };
  return (
    <div
      className={`text-white chat ${props.isGenerated ? "chat-start" : "chat-end"}`}
    >
      {props.isGenerated && (
        <div className={"h-full flex items-end"}>
          <Avatar>
            <AvatarImage className={"dark:invert"} src="" />
            <AvatarFallback
              className={"text-foreground bg-primary/40 font-medium"}
            >
              AI
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      <div
        className={`whitespace-pre-line break-words chat-bubble w-fit max-w-[60%] ${props.isGenerated ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-content"} `}
      >
        {props.messageText}
        {props.isGenerated && props.pageNumber && (
          <Alert className={"mt-5 bg-background/35"}>
            <AlertTitle>Fonte della Risposta</AlertTitle>
            <AlertDescription>
              <div
                className={
                  "flex justify-between text-sm h-full items-center px-2 "
                }
              >
                <p>Pag. {props.pageNumber}</p>
                <Button
                  className={"cursor-pointer"}
                  variant={"ghost"}
                  size={"icon"}
                  asChild
                  onClick={() =>
                    handleShowDoc(props.documentLink, props.pageNumber)
                  }
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

        <p className={"w-full text-right text-sm  opacity-50"}>
          {props.time.toLocaleString("it-IT", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
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
