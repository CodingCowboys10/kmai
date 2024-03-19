import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import React from "react";
import { useChatsData } from "@/providers/chats-provider";
import { getChats } from "@/serverActions/chats/getChats";
import { addChat } from "@/serverActions/chats/addChat";
import { useMessagesData } from "@/providers/messages-provider";
import { vModelSelect } from "@vue/runtime-dom";

const FormSchema = z.object({
  message: z.string().trim().min(1, {
    message: "Il messaggio non puo' essere vuoto.",
  }),
});

function ChatForm() {
  const { handleInputChange, handleSubmit, input, isLoading } =
    useMessagesData();
  const { chatSessionId, setChatSessionId, setIsUpdate } = useChatsData();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (isLoading) return;
    const isValid = await form.trigger();
    if (isValid) {
      if (!chatSessionId) {
        try {
          const res = await addChat(input.substring(0, 22));
          setIsUpdate(true);
          setChatSessionId(res);
        } catch (e) {
          // @ts-ignore
          toast.error(e.message);
        }
      }
      handleSubmit(event);
    } else {
      toast.error(
        form.formState.errors.message?.message || "Errore Generico Nel Form",
      );
    }
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="mt-auto w-7/12 relative">
        <FormField
          control={form.control}
          name="message"
          defaultValue={input}
          render={({ field }) => (
            <FormItem onChange={handleInputChange}>
              <FormControl>
                <Textarea
                  placeholder="Chatta con KMAI...."
                  className="resize-none pr-14"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Previeni il comportamento predefinito di invio
                      onSubmit(e);
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription className={"text-xs text-center"}>
                Le risposte fornite possono contenere dati errati, verificare
                sempre le risposte.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button
          className={"absolute right-0 top-0 m-3"}
          size={"icon"}
          variant={"secondary"}
          type="submit"
        >
          {isLoading ? (
            <svg
              className="animate-spin-slow with-icon_icon__MHUeb"
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
              <path d="M12 2v4" />
              <path d="M12 18v4" />
              <path d="M4.93 4.93l2.83 2.83" />
              <path d="M16.24 16.24l2.83 2.83" />
              <path d="M2 12h4" />
              <path d="M18 12h4" />
              <path d="M4.93 19.07l2.83-2.83" />
              <path d="M16.24 7.76l2.83-2.83" />
            </svg>
          ) : (
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
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default ChatForm;
