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

const FormSchema = z.object({
  message: z.string().trim().min(1, {
    message: "Il messaggio non puo' essere vuoto.",
  }),
});

interface ChatFormValueInterface {
  handleSubmit: any;
  input: string;
  handleInputChange: any;
}

function ChatForm({
  handleSubmit,
  input,
  handleInputChange,
}: ChatFormValueInterface) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="mt-auto w-7/12 relative">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Chatta con KMAI...."
                  className="resize-none pr-14"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
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
        </Button>
      </form>
    </Form>
  );
}

export default ChatForm;
