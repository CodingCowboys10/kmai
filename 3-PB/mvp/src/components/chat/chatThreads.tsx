import * as React from "react";

import { Pencil2Icon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Message } from "ai";
import { toast } from "sonner";

function ChatThreads() {
  /*Lascio un commento e alcune riflessioni su cose che secondo me puzzano.
   * - Serve un modo per aggiornare il numero di chats aperte. Quello che c'e' al momento non copre alcuni aspetti.
   * - - Nel caso di delete cosa si fa?
   * 1) Si aggiorna la vista, se si allora il session id deve cambiare.
   * 2) Dove posizioniamo il session id attuale/
   *
   * Ci sono un paio di soluzioni a cui ho pensato
   * 1) avere uno state sessionNumber che tiene il conto di quante sessioni abbiamo e quando aumentano o diminuiscono questo aggiorna la vista
   * - Problema quando aggiorniamo o facciamo un fetch il numero diventa 0 si deve avere un modo per impostarlo. Esempio con una chiamata
   * all'api.
   * 2) C'e' della ridondanza e va chiarita.
   *
   * Questo componente e' piu lungo del monte everest va smembrato in piccoli documenti
   * Va capito perche la pool non puo' stare fuori dal API e vanno anche sistemato tutte le api
   *
   * Insomma per ora che vada e' solo um miracolo
   *
   *  */

  const [chatSessionId, setChatSessionId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [titles, setTitles] = useState<Record<any, any>[]>();

  const handleCreateChat = async () => {
    try {
      const res = await fetch("/api/chats/addChat", {
        method: "POST",
      });
      setChatSessionId((await res.json()).id);
      if (!res.ok) {
        toast.error((await res.json()).message);
      } else {
        toast.success((await res.json()).message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteChat = async (id: number) => {
    try {
      const res = await fetch("/api/chats/deleteChat", {
        method: "POST",
        body: JSON.stringify({ id: id }),
      });
      if (!res.ok) {
        toast.error((await res.json()).message);
      } else {
        toast.success((await res.json()).message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchTitles = async () => {
      const res = await fetch("/api/chatThreads", {
        method: "GET", //sempre post da cambiare
      });
      const resData = await res.json(); //array
      setTitles(resData);
      setIsLoading(false);
      console.log(chatSessionId);
    };
    fetchTitles().then(() => setIsLoading(false));
  }, [chatSessionId]);

  return (
    <div className={"flex flex-col relative min-h-[90%] px-1"}>
      <div className={"flex flex-row items-center justify-between p-2"}>
        <Label className={"text-lg"}>Nuova Chat</Label>
        <Button variant={"ghost"} size={"icon"} onClick={handleCreateChat}>
          <Pencil2Icon className={"w-6 h-6"} />
        </Button>
      </div>
      <ScrollArea className="h-full max-h-[80%] rounded-md p-2 ">
        {isLoading && (
          <div className={"space-y-2"}>
            <Skeleton className={"h-8 bg-background/60"} />{" "}
            <Skeleton className={"h-8 bg-background/45"} />{" "}
            <Skeleton className={"h-8 bg-background/30"} />{" "}
            <Skeleton className={"h-8 bg-background/15"} />{" "}
          </div>
        )}
        {!isLoading &&
          titles!.map((value, index) => (
            <React.Fragment key={index}>
              <div
                onClick={() => alert("ciao")}
                className={`flex flex-row items-center justify-between text-sm transition-colors hover:bg-background/50 rounded-md p-2 my-1 mr-2 
                ${chatSessionId === value.id ? "bg-background/70" : ""}`}
              >
                {value.title}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className={"w-7 h-7"}
                    >
                      <DotsHorizontalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleDeleteChat(value.id)}
                    >
                      Elimina chat
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </React.Fragment>
          ))}
      </ScrollArea>
    </div>
  );
}
export default ChatThreads;
