"use client"

import { Heading } from "@/components/heading";
import { Bug } from "lucide-react";
import { useForm } from "react-hook-form";

import axios from "axios";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";

const PentestPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

const form = useForm<z.infer <typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        prompt: ""
    }
})

const isLoading = form.formState.isSubmitting;

  }
const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
        const userMessage: ChatCompletionRequestMessage = {
            role: "user",
            content: values.prompt,
        };
        const newMessages = [...messages, userMessage];
        const response = await axios.post("/api/pentest", {
            messages: newMessages,
        });
        setMessages((current) => [...current, userMessage, response.data]);
        form.reset();

    } catch ( error: any) {
        // TODO: Open pro Modal
        console.log(error);
    } finally {
        router.refresh();
    }
}

    return(
      <div>
        <Heading
            title="Pentest"
            description="Our most advance penetration testing report model"
            icon={Bug}
            iconColor="text-violet-500"
            bgColor="text-violet-500/10"
        />
        <div className="px-4 lg:px-8">
            <div>
                <Form {...form}>
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="
                    rounded-lg
                    border
                    w-full
                    p-4
                    px-3
                    md:px-6
                    focus-within:shadow-sm
                    grid
                    grid-cols-12
                    gap-2"
                    >
                        <FormField 
                            name="propmt"
                            render={({ field }) => (
                                <FormItem className="col-span-12
                                lg:col-span-10">
                                    <FormControl
                                    className="m-0 p-0">
                                        <Input
                                            className="
                                            border-0 outline-none
                                            focus-visible: ring-0
                                            focus-visible: ring-transparent"
                                            disabled={isLoading}
                                            placeholder="How do i write a penetration testing report?"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full"
                        disabled={isLoading}>
                            Generate
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4">
            <div className="flex flex-col-reverse gap-y-4">
                {messages.map((message) => (
                    <div key={message.content}>
                        {message.content}
                    </div>
                ))}
            </div>
            </div>
        </div>
      </div>

    );
                

  
  export default PentestPage;

  {
    "name": "forensic-ai",
    "version": "0.1.0",
    "private": true,
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    "dependencies": {
      "@clerk/nextjs": "^4.29.7",
      "@hookform/resolvers": "^3.3.4",
      "@radix-ui/react-avatar": "^1.0.4",
      "@radix-ui/react-dialog": "^1.0.5",
      "@radix-ui/react-label": "^2.0.2",
      "@radix-ui/react-slot": "^1.0.2",
      "axios": "^1.6.8",
      "class-variance-authority": "^0.7.0",
      "clsx": "^2.1.0",
      "lucide-react": "^0.341.0",
      "next": "14.1.0",
      "openai": "^3.3.0",
      "react": "^18",
      "react-dom": "^18",
      "react-hook-form": "^7.50.1",
      "tailwind-merge": "^2.2.1",
      "tailwindcss-animate": "^1.0.7",
      "zod": "^3.22.4"
    },
    "devDependencies": {
      "@types/node": "^20",
      "@types/react": "^18",
      "@types/react-dom": "^18",
      "autoprefixer": "^10.0.1",
      "eslint": "^8",
      "eslint-config-next": "14.1.0",
      "postcss": "^8",
      "tailwindcss": "^3.3.0",
      "typescript": "^5"
    }
  }

  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

  /* route.ts */

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { Configuration, OpenAIApi } from "openai";

//import { checkSubscription } from "@/lib/subscription";
//import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }


    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages
    });

  
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
