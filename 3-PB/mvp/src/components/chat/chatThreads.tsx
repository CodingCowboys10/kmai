import * as React from "react";

import { Pencil2Icon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
//import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useEffect,useState} from "react";
import { Label } from "@/components/ui/label";


/*export function ChatThreads() {
    const [title, setTitle] = useState<string>("");
    useEffect(() => {
            const fetchTitles = async () => {
                const res = await fetch("/api/chatThreads", {
                    method: "GET"
                });
                setTitle(await res.json());
            };
        },
        [title]);


  return (
    <div className={"flex flex-col  relative max-h-[90%] px-1"}>
      <div className={"flex flex-row items-center justify-between p-2"}>
        <Label className={"text-lg"}>Nuova Chat</Label>
        <Button variant={"ghost"} size={"icon"}>
          <Pencil2Icon className={"w-6 h-6"} />
        </Button>
      </div>
      <ScrollArea className="h-full max-h-[80%] rounded-md p-2">
        {title.map((title: string) => (
          <React.Fragment key={tag}>
            <div
              onClick={() => alert("ciao")}
              className="flex flex-row items-center justify-between text-sm transition-colors  hover:bg-background/50 rounded-md p-2 my-1"
            >
              {tag}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} size={"icon"} className={"w-7 h-7"}>
                    <DotsHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Elimina chat</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </React.Fragment>
        ))}
      </ScrollArea>
    </div>
  );
}*/
export function ChatThreads() {
    const [isLoading, setIsLoading] = useState(true);


    const [titles, setTitles] = useState([]);

    useEffect(() => {

        const fetchTitles = async () => {

            const res = await fetch("/api/chatThreads", {
                method: "GET"

            });

            const data = await res.json(); // fa crashare tutto
            console.log("risposta api: ",data);
            
            setTitles(data);
            if (data.length > 0) {
                console.log('We have some results');
            }
            else {
                console.log('pazzesco non abbiamo risultati ');
            }
        };
        fetchTitles().then(() => setIsLoading(false));
    }, []);



    return (
        <div className={"flex flex-col  relative max-h-[90%] px-1"}>
            <div className={"flex flex-row items-center justify-between p-2"}>
                <Label className={"text-lg"}>Nuova Chat</Label>
                <Button variant={"ghost"} size={"icon"}>
                    <Pencil2Icon className={"w-6 h-6"} />
                </Button>
            </div>
            <ScrollArea className="h-full max-h-[80%] rounded-md p-2">
                {titles.map((title : string) => (
                    <React.Fragment key={title}>
                        <div
                            onClick={() => alert("ciao")}
                            className="flex flex-row items-center justify-between text-sm transition-colors  hover:bg-background/50 rounded-md p-2 my-1"
                        >
                            {title}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={"ghost"} size={"icon"} className={"w-7 h-7"}>
                                        <DotsHorizontalIcon />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Elimina chat</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </React.Fragment>
                ))}
            </ScrollArea>
        </div>
    );
}
