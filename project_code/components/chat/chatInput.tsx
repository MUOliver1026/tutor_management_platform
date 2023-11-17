"use client"
import {FC} from "react";
import * as z from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useMutation } from "@apollo/client";
import { NewMessage } from "@/graphql/mutations";
import { useParams } from "next/navigation";

interface chatInputProps {
    className: string,
    apiUrl: string,
    query: Record<string, any>
}

const FormSchema = z.object({
    content: z.string().min(1),
});

const ChatInput:FC<chatInputProps> = ({
    className,
    apiUrl,
    query
}) => {
    const params = useParams();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            content: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const [sendMsg, {data, loading, error}] = useMutation(NewMessage);
    const onSubmit = async (value: z.infer<typeof FormSchema>) => {
        try {
            await sendMsg({
                variables:{
                    conversationId: params?.conversationID,
                    userId: params?.userID,
                    content: value.content
                }
            });
            form.reset({ content: "" });
        } catch (error) {
            console.log(error);
        }
    }

    // noinspection TypeScriptValidateTypes
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <div className="grid grid-cols-8 gap-6 place-items-center">
                                    <Input className="col-span-7" disabled={isLoading} placeholder={"Message"} {...field}/>
                                    <button type="submit"
                                            className="col-span-1 flex flex-row justify-center gap-3 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-md px-6 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                    >
                                        <Send/> <span>Send</span>
                                    </button>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default ChatInput;